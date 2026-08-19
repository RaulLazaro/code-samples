import { useState, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import CitiesPageStyles from './CitiesPageStyles'
import Table from '../../Components/Table/Table'
import CitiesService from '../../Services/Cities'
import Filters from '../../Components/Filters/Filters'
import Countries from '../../resources/Countries.json'
import Header from '../../Layouts/Header'
import Footer from '../../Layouts/Footer'

const citiesService = new CitiesService()
const perPage = 10

export default function CitiesPage() {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('rank')
  const [page, setPage] = useState(1)
  const [length, setlength] = useState(0)
  const [cities, setCities] = useState([])
  const [actFilters, setActFilters] = useState({})

  useEffect(() => {
    const subscription = citiesService
      .getObservableCities()
      .subscribe((data) => {
        setlength(data.length)
        setCities(data.cities)
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    citiesService.getCities({
      perPage: perPage,
      page: page,
      order: order,
      orderBy: orderBy,
      ...actFilters
    })
  }, [order, orderBy, actFilters, page])

  const navigate = useNavigate()
  const gotoCity = (city) => {
    navigate(`/${city}`)
  }

  const handleOnSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'
    setOrder(newOrder)
    setOrderBy(property)
  }

  const handleOnFilters = (fil) => {
    const { pop, ...newFilters } = fil
    if (pop) {
      newFilters.minPop = pop.min
      newFilters.maxPop = pop.max
    }
    setPage(1)
    setActFilters(newFilters)
  }

  const columns = [
    {
      key: 'rank',
      label: 'Rank',
      text: 'center',
      width: '10%',
      onSort: handleOnSort
    },
    { key: 'name', label: 'City', width: '30%', onSort: handleOnSort },
    { key: 'country', label: 'Country', width: '30%', onSort: handleOnSort },
    {
      key: 'pm',
      label: 'PM2.5',
      text: 'center',
      width: '10%',
      type: 'chip',
      onSort: handleOnSort
    },
    { key: 'pop', label: 'Population', width: '20%', onSort: handleOnSort }
  ]

  const filters = [
    {
      type: 'text',
      key: 'name',
      label: 'City'
    },
    {
      type: 'select',
      key: 'country',
      label: 'Country',
      options: Countries
    },
    {
      key: 'pop',
      type: 'range',
      label: 'Population',
      min: 100_000,
      max: 11_000_000
    }
  ]

  return (
    <CitiesPageStyles>
      <Header />
      <div className="hero">
        <div className="container">
          <h1>Top cities polluted in Europe</h1>
          <p>The most polluted cities updated in real time</p>
          <Filters filters={filters} onChange={handleOnFilters} />
        </div>
      </div>
      <div className="container table">
        <Table
          itemKey={'name'}
          length={length}
          page={page}
          perPage={perPage}
          data={cities}
          columns={columns}
          onClickItem={gotoCity}
          sortOrder={order}
          sortKey={orderBy}
          onChangePage={(newPage) => setPage(newPage)}
        />
      </div>
      <Outlet />
      <Footer />
    </CitiesPageStyles>
  )
}
