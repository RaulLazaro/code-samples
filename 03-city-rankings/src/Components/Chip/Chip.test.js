import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Chip from './Chip'

describe('Chip', () => {
  it('Should render', () => {
    render(<Chip value={5} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('Should render target', () => {
    render(<Chip value={5} />)
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('5').className).toContain('target')
  })

  it('Should render good', () => {
    render(<Chip value={11} />)
    expect(screen.getByText('11')).toBeInTheDocument()
    expect(screen.getByText('11').className).toContain('good')
  })

  it('Should render moderate', () => {
    render(<Chip value={20} />)
    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getByText('20').className).toContain('moderate')
  })

  it('Should render unhealthySensitive', () => {
    render(<Chip value={40} />)
    expect(screen.getByText('40')).toBeInTheDocument()
    expect(screen.getByText('40').className).toContain('unhealthySensitive')
  })

  it('Should render unhealthy', () => {
    render(<Chip value={100} />)
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('100').className).toContain('unhealthy')
  })

  it('Should render veryUnhealthy', () => {
    render(<Chip value={200} />)
    expect(screen.getByText('200')).toBeInTheDocument()
    expect(screen.getByText('200').className).toContain('veryUnhealthy')
  })

  it('Should render hazardous', () => {
    render(<Chip value={300} />)
    expect(screen.getByText('300')).toBeInTheDocument()
    expect(screen.getByText('300').className).toContain('hazardous')
  })
})
