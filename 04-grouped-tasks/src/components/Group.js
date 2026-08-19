import { Fragment } from 'react'
import styled from 'styled-components'
import { ReactComponent as Booking } from '../icons/booking.svg'
import { ReactComponent as BookingOk } from '../icons/booking-ok.svg'
import { ReactComponent as ArrowDown } from '../icons/arrow-down.svg'
import { ReactComponent as ArrowUp } from '../icons/arrow-up.svg'
import ListTasks from './ListTasks'

const GroupStyles = styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    button {
      width: 100%;
      padding: 1rem 1.5rem;
      display: flex;
      border: none;
      cursor: pointer;
      outline: none;
      background-color: inherit;
      align-items: center;

      .group-icon {
        flex-shrink: 0;
        fill: var(--grey-900);
        &__ok {
          flex-shrink: 0;
          fill: var(--success);
        }
      }

      .label {
        margin-left: 1rem;
        margin-right: 1rem;
        font-size: 1.125rem;
        color: var(--grey-900);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .complete {
        color: var(--success);
      }

      .visibility {
        margin-left: auto;
        margin-right: 0.563rem;
        font-size: 1rem;
        color: var(--grey-500);
      }
      .visibility-icon {
        flex-shrink: 0;
        fill: var(--grey-500);
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 1rem;
      gap: 0.5rem;
      margin: 0;
      list-style-type: none;
    }

    hr {
      margin: 0;
      width: 100%;
      height: 1px;
      border: none;
      background-color: var(--grey-300);
    }

    &:last-child {
      hr {
        display: none;
      }
    }
  }
`

export default function Group(props) {
  const { group, completed, expanded, onExpand } = props

  return (
    <GroupStyles>
      <button
        onClick={() => {
          onExpand(group.id)
        }}>
        {completed ? (
          <BookingOk className="group-icon__ok" />
        ) : (
          <Booking className="group-icon" />
        )}
        <span className={completed ? 'label complete' : 'label'}>
          {group.name}
        </span>
        {expanded ? (
          <Fragment>
            <span className="visibility">Hide</span>
            <ArrowDown className="visibility-icon" />
          </Fragment>
        ) : (
          <Fragment>
            <span className="visibility">Show</span>
            <ArrowUp className="visibility-icon" />
          </Fragment>
        )}
      </button>
      {expanded ? <ListTasks tasksIds={group.tasksIds} /> : null}
      <hr />
    </GroupStyles>
  )
}
