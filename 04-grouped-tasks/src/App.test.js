import { render } from '@testing-library/react'
import App from './App'

const data = [
  {
    name: 'General Infos',
    tasks: [
      {
        description: 'Add name and surname',
        value: 10,
        checked: true
      },
      {
        description: 'Add email',
        value: 15,
        checked: false
      },
      {
        description: 'Add linkedin profile',
        value: 8,
        checked: false
      },
      {
        description: 'Provide websites page url',
        value: 5,
        checked: true
      }
    ]
  }
]

test('renders', async () => {
  fetch.mockOnce(JSON.stringify(data))
  const { findByText } = render(<App />)
  const linkElement = await findByText(/Grouped Tasks/i)
  expect(linkElement).toBeInTheDocument()
})

test('error fetch', async () => {
  fetch.mockReject(new Error('foo'))
  render(<App />)
})
