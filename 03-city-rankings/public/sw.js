// In-browser mock backend (Server-Sent Events).
// Replicates the previous Express + rxjs service: serves the cities dataset as
// a text/event-stream, re-ranking every second as it did. Fully static, no server.

const DATA_URL = 'data.json'
const UPDATE_INTERVAL = 1000
const MIN_PM = 10
const MAX_PM = 20
const PM_VAR = 1
// Safe upper bound so the random walk never drifts far outside a realistic
// PM2.5 range — the only departure from the original code (which had no cap).
const PM_CEILING = 150

let cities = []
let dataLoaded = false

const encoder = new TextEncoder()

const roundNumber = (number) =>
  Number(Math.round(number + 'e2') + 'e-2')

const getRnd = (min, max) => roundNumber(Math.random() * (max - min) + min)

const sortCities = (list, orderBy, order) => {
  const sorted = [...list].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return -1
    if (a[orderBy] > b[orderBy]) return 1
    if (a.rank > b.rank) return 1
    return -1
  })
  return order === 'desc' ? sorted.reverse() : sorted
}

const filterCities = (list, key, value, type) => {
  switch (type) {
    case 'range':
      return list.filter(
        (city) => city[key] >= value.min && city[key] <= value.max
      )
    case 'includes':
      return list.filter((city) =>
        city[key].toLowerCase().includes(value.toLowerCase())
      )
    default:
      return list.filter((city) => city[key] === value)
  }
}

const rankCities = (list) => {
  const ranked = sortCities(list, 'pm', 'desc')
  return ranked.map((city, index) => ({ ...city, rank: index + 1 }))
}

const sortFilterCities = (list, options) => {
  let filtered = list
  if (options.orderBy && options.order) {
    filtered = sortCities(filtered, options.orderBy, options.order)
  }
  if (options.country && options.country !== 'All') {
    filtered = filterCities(filtered, 'country', options.country)
  }
  if (options.minPop && options.maxPop) {
    filtered = filterCities(
      filtered,
      'pop',
      { min: Number(options.minPop), max: Number(options.maxPop) },
      'range'
    )
  }
  if (options.name) {
    filtered = filterCities(filtered, 'name', options.name, 'includes')
  }
  return sortCities(filtered, options.orderBy, options.order)
}

const paginationCities = (list, page, perPage) => {
  if (perPage < list.length && page && perPage) {
    const initIndex = (page - 1) * perPage
    const endIndex = page * perPage
    return list.slice(initIndex, endIndex)
  }
  return list
}

const sseEvent = (data) => `data: ${JSON.stringify(data)}\n\n`

// Active SSE connections (so every tick can re-broadcast each client's view).
const connections = []

function broadcastTick() {
  if (!dataLoaded) return
  const updated = cities.map((city) => {
    const nextPm = roundNumber(city.pm + getRnd(-PM_VAR, PM_VAR))
    return { ...city, pm: Math.min(PM_CEILING, Math.max(MIN_PM, nextPm)) }
  })
  cities = rankCities(updated)

  connections.forEach((client) => {
    const { query, write } = client
    if (query.type === 'city') {
      const city = cities.find((c) => c.name === query.name)
      if (city) write(city)
    } else {
      const { page, perPage } = query
      let sendCities = sortFilterCities(cities, query)
      const totalLength = sendCities.length
      sendCities = paginationCities(sendCities, Number(page), Number(perPage))
      write({ length: totalLength, cities: sendCities })
    }
  })
}

const buildStream = (initialMessage, onClose) => {
  let controller = null
  let alive = true
  const stream = new ReadableStream({
    start(c) {
      controller = c
      c.enqueue(encoder.encode(sseEvent(initialMessage)))
    },
    cancel() {
      alive = false
      controller = null
      if (onClose) onClose()
    },
  })
  const write = (data) => {
    if (alive && controller) {
      try {
        controller.enqueue(encoder.encode(sseEvent(data)))
      } catch {
        // Stream closed underneath us; let the next cancel() clean up.
      }
    }
  }
  return { stream, write }
}

// Reset support: reseed the 500-city dataset with fresh random metrics and
// drop any connected streams, so the demo returns to its initial state.
async function resetData() {
  const response = await fetch(DATA_URL)
  const data = await response.json()
  cities = rankCities(data.map((city) => ({ ...city, pm: getRnd(MIN_PM, MAX_PM) })))
  dataLoaded = true
  connections.splice(0)
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    fetch(DATA_URL)
      .then((r) => r.json())
      .then((data) => {
        cities = rankCities(
          data.map((city) => ({ ...city, pm: getRnd(MIN_PM, MAX_PM) }))
        )
        dataLoaded = true
        setInterval(broadcastTick, UPDATE_INTERVAL)
      })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLAIM') {
    self.clients.claim()
    event.source?.postMessage({ type: 'CLAIM_DONE' })
  }
  if (event.data && event.data.type === 'RESET') {
    resetData().then(() => {
      event.source?.postMessage({ type: 'RESET_DONE' })
    })
  }
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  if (event.request.method !== 'GET') return
  if (url.pathname.endsWith('/data.json')) return

  const citiesMatch = url.pathname.match(/\/cities\/?$/)
  const cityMatch = url.pathname.match(/\/cities\/([^/]+)\/?$/)

  if (!citiesMatch && !cityMatch) return

  const query = Object.fromEntries(url.searchParams.entries())

  let initialMessage
  let clientType
  if (cityMatch) {
    clientType = 'city'
    const name = decodeURIComponent(cityMatch[1])
    query.name = name
    query.type = 'city'
    const city = cities.find((c) => c.name === name)
    initialMessage = city
  } else {
    clientType = 'list'
    query.type = 'list'
    const { page, perPage } = query
    let sendCities = sortFilterCities(cities, query)
    const totalLength = sendCities.length
    sendCities = paginationCities(sendCities, Number(page), Number(perPage))
    initialMessage = { length: totalLength, cities: sendCities }
  }

  const client = { type: clientType, query }
  const removeClient = () => {
    const idx = connections.indexOf(client)
    if (idx !== -1) connections.splice(idx, 1)
  }
  const { stream, write } = buildStream(initialMessage, removeClient)
  client.write = write
  connections.push(client)

  event.respondWith(
    new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  )
})
