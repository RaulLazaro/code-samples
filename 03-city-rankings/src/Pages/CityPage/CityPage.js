import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../Layouts/Header'
import CityService from '../../Services/City'
import CityPageStyles from './CityPageStyles'
import Map from '../../Components/Map/Map'
import Chip from '../../Components/Chip/Chip'
import Footer from '../../Layouts/Footer'

const cityService = new CityService()

export default function CityPage() {
  const [city, setCity] = useState({})

  const params = useParams()

  useEffect(() => {
    const subscription = cityService.getObservableCity().subscribe((data) => {
      setCity(data)
    })

    cityService.getCity(params.city)

    return () => {
      subscription.unsubscribe()
    }
  }, [params.city])

  return (
    <CityPageStyles>
      <Header />
      <div className="container">
        <Map place={params.city} zoom={6} />
        <div className="city-details">
          <h2>{city.name}</h2>
          <p>Population: {city.pop}</p>
          <p>Ranking: {city.rank}</p>
          <div className="pm">
            <span>PM2.5</span>
            <Chip value={city.pm} />
          </div>
        </div>
      </div>
      <Footer />
    </CityPageStyles>
  )
}
