import { Observable } from 'rxjs'

export default class CitiesService {
  constructor() {
    this.cities$ = new Observable((subscriber) => {
      this.subscriber = subscriber
    })
  }

  getObservableCities() {
    return this.cities$
  }

  getCities(options) {
    if (this.events) this.events.close()
    const url = new URL('cities', window.location.href)

    Object.entries(options).forEach((entry) => {
      const [key, value] = entry
      url.searchParams.append(key, value)
    })

    this.events = new EventSource(url.toString())

    this.events.onmessage = (event) => {
      const cities = JSON.parse(event.data)
      this.subscriber.next(cities)
    }

    // Fallback: if the SW isn't intercepting (e.g. custom domain without
    // CNAME), the EventSource will fail. Load data.json directly and push
    // the initial snapshot so the demo still renders.
    this.events.onerror = () => {
      this.events.close()
      fetch('data.json')
        .then(r => r.json())
        .then(data => {
          this.subscriber.next(data)
        })
    }
  }
}
}
