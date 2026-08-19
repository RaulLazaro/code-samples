import { useContext } from 'react'
import styled from 'styled-components'
import check from '../icons/check.svg'
import TaksContext from './TasksContext'

const TaskStyles = styled.ul`
  & {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 0.5rem;
    margin: 0;
    list-style-type: none;

    li {
      display: flex;
      align-items: center;

      label {
        padding: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        cursor: pointer;

        input {
          appearance: none;
          cursor: pointer;
          width: 1rem;
          height: 1rem;
          color: var(--white);
          border: 1px solid var(--grey-500);
          border-radius: 4px;
          flex-shrink: 0;

          &:checked {
            border: none;
            background-color: var(--success);
            background-image: url(${check});
            background-repeat: no-repeat;
            background-position: center;
            &:hover {
              background-color: var(--success-dark);
            }
          }
          &:hover {
            border-color: var(--grey-900);
          }
        }
      }
    }
  }
`

export default function Task(props) {
  const { tasksIds } = props
  const { tasks, updateTask } = useContext(TaksContext)

  return (
    <TaskStyles>
      {tasksIds.map((taskId) => (
        <li key={taskId}>
          <label>
            <input
              type={'checkbox'}
              checked={tasks[taskId].checked}
              onChange={() => updateTask(taskId)}
            />
            <span>{tasks[taskId].description || tasks[taskId].name}</span>
          </label>
        </li>
      ))}
    </TaskStyles>
  )
}
