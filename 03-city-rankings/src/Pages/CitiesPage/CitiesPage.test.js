import { fireEvent, render, screen } from '@testing-library/react'
import { Route, MemoryRouter, Routes } from 'react-router-dom'
import CitiesPage from './CitiesPage'
import CitiesService from '../../Services/Cities'
import { of } from 'rxjs'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))

describe('CitiesPage', () => {
  const cities = [
    {
      name: 'Moscow',
      country: 'Russia',
      pm: 10,
      pop: 10381222
    },
    {
      name: 'London',
      country: 'United Kingdom',
      pm: 10,
      pop: 7556900
    },
    {
      name: 'Saint Petersburg',
      country: 'Russia',
      pm: 10,
      pop: 5028000
    },
    {
      name: 'Berlin',
      country: 'Germany',
      pm: 10,
      pop: 3426354
    }
  ]

  jest.spyOn(CitiesService.prototype, 'getCities')

  it('Should render', () => {
    jest
      .spyOn(CitiesService.prototype, 'getObservableCities')
      .mockReturnValue(of({ cities: cities, length: cities.length }))

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CitiesPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Berlin')).toBeInTheDocument()
  })

  it('Should navigate', () => {
    jest
      .spyOn(CitiesService.prototype, 'getObservableCities')
      .mockReturnValue(of({ cities: cities, length: cities.length }))
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CitiesPage />} />
        </Routes>
      </MemoryRouter>
    )
    const item = screen.getByText('Berlin')
    fireEvent.click(item)
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/Berlin')
  })

  it('Should sort', () => {
    jest
      .spyOn(CitiesService.prototype, 'getObservableCities')
      .mockReturnValue(of({ cities: cities, length: cities.length }))
    const getCities = jest.spyOn(CitiesService.prototype, 'getCities')
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CitiesPage />} />
        </Routes>
      </MemoryRouter>
    )

    const rank = screen.getByText('Rank')
    expect(getCities).toHaveBeenCalledWith({
      order: 'asc',
      orderBy: 'rank',
      page: 1,
      perPage: 10
    })
    fireEvent.click(rank)
    expect(getCities).toHaveBeenCalledWith({
      order: 'desc',
      orderBy: 'rank',
      page: 1,
      perPage: 10
    })
    const pm = screen.getByText('PM2.5')
    fireEvent.click(pm)
    expect(getCities).toHaveBeenCalledWith({
      order: 'asc',
      orderBy: 'pm',
      page: 1,
      perPage: 10
    })
  })

  it('Should filter', () => {
    jest
      .spyOn(CitiesService.prototype, 'getObservableCities')
      .mockReturnValue(of({ cities: cities, length: cities.length }))
    const getCities = jest.spyOn(CitiesService.prototype, 'getCities')
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CitiesPage />} />
        </Routes>
      </MemoryRouter>
    )

    const text = screen.getByRole('textbox')

    fireEvent.change(text, { target: { value: 'a' } })

    expect(getCities).toHaveBeenCalledWith({
      name: 'a',
      order: 'asc',
      orderBy: 'rank',
      page: 1,
      perPage: 10
    })

    const select = screen.getByRole('combobox')

    fireEvent.change(select, { target: { value: 'Spain' } })
    expect(getCities).toHaveBeenCalledWith({
      name: 'a',
      country: 'Spain',
      order: 'asc',
      orderBy: 'rank',
      page: 1,
      perPage: 10
    })

    const [slider1, slider2] = screen.getAllByRole('slider')
    fireEvent.change(slider1, { target: { value: 110000 } })
    fireEvent.change(slider2, { target: { value: 120000 } })

    expect(getCities).toHaveBeenCalledWith({
      name: 'a',
      country: 'Spain',
      minPop: 110000,
      maxPop: 120000,
      order: 'asc',
      orderBy: 'rank',
      page: 1,
      perPage: 10
    })
  })

  it('Should change page', () => {
    jest
      .spyOn(CitiesService.prototype, 'getObservableCities')
      .mockReturnValue(of({ cities: cities, length: cities.length }))
    const getCities = jest.spyOn(CitiesService.prototype, 'getCities')
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CitiesPage />} />
        </Routes>
      </MemoryRouter>
    )

    const next = screen.getByText('▶')

    fireEvent.click(next)

    expect(getCities).toHaveBeenCalledWith({
      order: 'asc',
      orderBy: 'rank',
      page: 2,
      perPage: 10
    })
  })
})
