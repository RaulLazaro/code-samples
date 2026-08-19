import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Map from './Map'

describe('Map', () => {
  it('Should render a lazy map iframe', () => {
    render(<Map place="valladolid" zoom={6} />)
    expect(screen.getByTitle('map')).toBeInTheDocument()
    expect(screen.getByTitle('map')).toHaveAttribute('loading', 'lazy')
  })
})
