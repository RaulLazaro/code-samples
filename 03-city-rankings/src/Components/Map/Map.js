import { useEffect, useState } from 'react'

const GEOCODE_URL = 'https://nominatim.openstreetmap.org/search'
const EMBED_URL = 'https://www.openstreetmap.org/export/embed.html'

// City can be null until the geocoding response arrives; the embed iframe is
// only rendered once coordinates are known.
export default function Map({ place, zoom = 6 }) {
  const [coords, setCoords] = useState(null)

  useEffect(() => {
    let cancelled = false
    setCoords(null)

    fetch(`${GEOCODE_URL}?q=${encodeURIComponent(place)}&format=json&limit=1`)
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data[0]) {
          setCoords({
            lat: Number(data[0].lat),
            lon: Number(data[0].lon)
          })
        }
      })
      .catch(() => {
        // Leave the map empty if geocoding fails.
      })

    return () => {
      cancelled = true
    }
  }, [place])

  const span = Math.max(0.1, 360 / Math.pow(2, zoom + 2))

  let src = ''
  if (coords) {
    const params = new URLSearchParams({
      bbox: [
        coords.lon - span / 2,
        coords.lat - span / 2,
        coords.lon + span / 2,
        coords.lat + span / 2
      ].join(','),
      layer: 'mapnik',
      marker: `${coords.lat},${coords.lon}`
    })
    src = `${EMBED_URL}?${params.toString()}`
  }

  return <iframe className="map" title="map" src={src} loading="lazy" />
}
