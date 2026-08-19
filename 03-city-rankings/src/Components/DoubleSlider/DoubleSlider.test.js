import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DoubleSlider from './DoubleSlider'

describe('DoubleSlider', () => {
  it('Should render', () => {
    render(<DoubleSlider label="label" min={0} max={10} onChange={null} />)
    expect(screen.getByText('label: 0 - 10')).toBeInTheDocument()
    expect(screen.getAllByRole('slider')).toHaveLength(2)
  })

  it('Should change', () => {
    const change = jest.fn()
    render(<DoubleSlider label="label" min={0} max={10} onChange={change} />)
    const [slider1, slider2] = screen.getAllByRole('slider')

    fireEvent.change(slider1, { target: { value: 5 } })

    expect(change).toHaveBeenCalledWith(5, 10)

    fireEvent.change(slider2, { target: { value: 7 } })

    expect(change).toHaveBeenCalledWith(5, 7)

    fireEvent.change(slider2, { target: { value: 2 } })

    expect(change).toHaveBeenCalledWith(2, 5)
  })
})
