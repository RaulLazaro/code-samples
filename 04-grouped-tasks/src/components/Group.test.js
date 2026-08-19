import { fireEvent, render, screen } from '@testing-library/react'
import Group from './Group'

const group = {
  id: 'group0',
  name: 'General Infos',
  tasksIds: ['task0', 'task1', 'task2']
}

test('renders', () => {
  render(
    <Group group={group} completed={false} expanded={false} onExpand={null} />
  )
  const element = screen.getByText(/General Infos/i)
  expect(element).toBeInTheDocument()
})

test('expand group', () => {
  const expandGroup = jest.fn()
  render(
    <Group
      group={group}
      completed={false}
      expanded={false}
      onExpand={expandGroup}
    />
  )
  const element = screen.getByText(/General Infos/i)
  fireEvent.click(element)
  expect(expandGroup).toHaveBeenCalledWith('group0')
})

test('completed group', () => {
  render(
    <Group group={group} completed={true} expanded={false} onExpand={null} />
  )
  const element = screen.getByRole('button').firstChild
  expect(element).toHaveStyle(`fill: var(--success)`)
})
