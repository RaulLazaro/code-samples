import { render, screen } from '@testing-library/react'
import Progress from './Progress'

test('renders', () => {
  render(<Progress value={50} />)
  const element = screen.getByText(/50/i)
  expect(element).toHaveStyle(`width: 50%`)
})
