import { fireEvent, render, screen } from '@testing-library/react'
import GroupedTaks from './GroupedTaks'

const data = [
  {
    name: 'General Infos',
    tasks: [
      {
        description: 'Add name and surname',
        value: 10,
        checked: false
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
  },
  {
    name: 'Accomiplishment',
    tasks: [
      {
        description: 'Wrote a small poem about the birthdate',
        value: 23,
        checked: false
      },
      {
        description: 'Jump three time with one leg',
        value: 32,
        checked: true
      },
      {
        name: 'Avoid the annoying neighbor',
        value: 2,
        checked: false
      },
      {
        name: 'Say hello to a random person',
        value: 21,
        checked: false
      },
      {
        name: 'Fill the description in at least 3 places',
        value: 12,
        checked: true
      }
    ]
  }
]

test('renders', () => {
  render(<GroupedTaks data={data} />)
  const element = screen.getByText(/General Infos/i)
  expect(element).toBeInTheDocument()
})

test('expand group and check task', () => {
  render(<GroupedTaks data={data} />)
  const group0 = screen.getByText(/General Infos/i)
  fireEvent.click(group0)
  const element = screen.getByText(/Add name and surname/i)
  expect(element).toBeInTheDocument()

  const checkbox = screen.getAllByRole('checkbox')[0]
  expect(element).toBeInTheDocument()
  fireEvent.click(checkbox)
  expect(checkbox).toBeChecked()
  fireEvent.click(checkbox)
  expect(checkbox).not.toBeChecked()

  fireEvent.click(group0)
  expect(element).not.toBeInTheDocument()
})
