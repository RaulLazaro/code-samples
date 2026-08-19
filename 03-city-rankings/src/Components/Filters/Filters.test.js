import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Filters from './Filters'

describe('Filters', () => {
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
      options: ['1', '2']
    },
    {
      key: 'pop',
      type: 'range',
      label: 'Population',
      min: 0,
      max: 10
    }
  ]

  it('Should render', () => {
    render(<Filters filters={filters} onChange={null} />)
    expect(screen.getByText('City')).toBeInTheDocument()
    expect(screen.getByText('Country')).toBeInTheDocument()
    expect(screen.getByText('Population: 0 - 10')).toBeInTheDocument()
  })

  it('Should change', () => {
    const change = jest.fn()
    render(<Filters filters={filters} onChange={change} />)

    const text = screen.getByRole('textbox')

    fireEvent.change(text, { target: { value: 'a' } })

    expect(change).toHaveBeenCalledWith({ name: 'a' })

    const select = screen.getByRole('combobox')

    fireEvent.change(select, { target: { value: '1' } })
    expect(change).toHaveBeenCalledWith({ name: 'a', country: '1' })

    const [slider1] = screen.getAllByRole('slider')
    fireEvent.change(slider1, { target: { value: 5 } })

    expect(change).toHaveBeenCalledWith({
      name: 'a',
      country: '1',
      pop: {
        max: 10,
        min: 5
      }
    })
  })
})
