import { Observable } from 'rxjs'

export default class CityService {
  constructor() {
    this.city$ = new Observable((subscriber) => {
      this.subscriber = subscriber
    })
  }

  getObservableCity() {
    return this.city$
  }

  getCity(city) {
    if (this.events) this.events.close()
    const url = new URL(`cities/${city}`, window.location.href)

    this.events = new EventSource(url.toString())

    this.events.onmessage = (event) => {
      this.subscriber.next(JSON.parse(event.data))
    }
  }
}
