import { fireEvent, render, screen } from '@testing-library/react'
import ListTasks from './ListTasks'
import TasksContext from './TasksContext'

const tasksIds = ['task0', 'task1', 'task2']

const tasks = {
  task0: {
    id: 'task0',
    description: 'Add name and surname',
    value: 10,
    checked: true
  },
  task1: {
    id: 'task1',
    description: 'Add email',
    value: 15,
    checked: false
  },
  task2: {
    id: 'task2',
    name: 'Add linkedin profile',
    value: 8,
    checked: false
  }
}

const updateTask = jest.fn()
const context = { tasks, updateTask }

test('renders', () => {
  render(
    <TasksContext.Provider value={context}>
      <ListTasks tasksIds={tasksIds} />
    </TasksContext.Provider>
  )
  const element = screen.getByText(/Add name and surname/i)
  expect(element).toBeInTheDocument()
})

test('check task', () => {
  render(
    <TasksContext.Provider value={context}>
      <ListTasks tasksIds={tasksIds} />
    </TasksContext.Provider>
  )
  const element = screen.getByText(/Add name and surname/i)
  fireEvent.click(element)
  expect(updateTask).toHaveBeenCalledWith('task0')
})
