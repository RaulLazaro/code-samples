import { render, screen } from '@testing-library/react'
import { Route, MemoryRouter, Routes } from 'react-router-dom'
import CityPage from './CityPage'
import CityService from '../../Services/City'
import { of } from 'rxjs'

describe('CityPage', () => {
  const city = {
    name: 'Valladolid',
    rank: 1,
    pop: 100000,
    pm: 20,
    country: 'Spain'
  }

  jest.spyOn(CityService.prototype, 'getCity')

  it('Should render', () => {
    jest
      .spyOn(CityService.prototype, 'getObservableCity')
      .mockReturnValue(of(city))

    render(
      <MemoryRouter initialEntries={['/Valladolid']}>
        <Routes>
          <Route path="/:city" element={<CityPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Valladolid')).toBeInTheDocument()
  })
})
