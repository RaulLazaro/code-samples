import { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import TasksContext from './TasksContext'
import Group from './Group'
import Progress from './Progress'

const GroupedTaskStyles = styled.div`
  & {
    width: 80%;
    margin: auto;
    background: var(--white);
    border: 1px solid var(--grey);
    border-radius: 8px;
    padding: 1rem;

    .header {
      padding: 1rem 1.5rem;

      .tittle {
        font-weight: bold;
        font-size: 1.375rem;
        line-height: 1.5rem;
        margin: 1rem 0;
        color: var(--grey-900);
      }
    }

    .content {
      border: 1px solid var(--grey);
      border-radius: 0.5rem;
      overflow: hidden;
    }
  }
`

export default function GroupedTask(props) {
  const { data } = props
  const [sumVt, setSumVt] = useState(0)
  const [progress, setProgress] = useState(0)
  const [expandedGroup, setExpandedGroup] = useState()
  const [groups, setGroups] = useState({})
  const [tasks, setTasks] = useState({})

  useEffect(() => {
    let sumVt = 0
    let sumCompleted = 0

    const groups = {}
    let tasks = {}
    data.forEach((group, index) => {
      const groupTasks = {}
      const tasksIds = []
      group.tasks.forEach((task, index) => {
        sumVt += task.value
        if (task.checked === true) sumCompleted += task.value
        const id = `task${index + Object.keys(tasks).length}`
        groupTasks[id] = { ...task, id }
        tasksIds.push(id)
      })
      const id = `group${index}`
      const newGroup = { ...group }
      delete newGroup.tasks
      groups[id] = { ...newGroup, id, tasksIds }
      tasks = { ...tasks, ...groupTasks }
    })

    setGroups(groups)
    setTasks(tasks)
    setSumVt(sumVt)
    setProgress(calcNormalized(sumCompleted, sumVt))
  }, [data])

  const calcNormalized = (value, total) => {
    return (value * 100) / total
  }

  const updateTask = (taskId) => {
    const newTasks = { ...tasks }
    newTasks[taskId].checked = !newTasks[taskId].checked
    setTasks(newTasks)

    const norValue = calcNormalized(newTasks[taskId].value, sumVt)
    newTasks[taskId].checked
      ? setProgress(progress + norValue)
      : setProgress(progress - norValue)
  }

  const handleExpandGroup = useCallback(
    (id) => {
      id === expandedGroup ? setExpandedGroup() : setExpandedGroup(id)
    },
    [expandedGroup]
  )

  const groupIds = useMemo(() => Object.keys(groups), [groups])
  const context = useMemo(
    () => ({ groups, tasks, updateTask }),
    [groups, tasks]
  )

  return (
    <GroupedTaskStyles>
      <TasksContext.Provider value={context}>
        <div className="header">
          <h3 className="tittle">Grouped Tasks</h3>
          <Progress value={Math.round(progress)} />
        </div>
        <div className="content">
          {groupIds?.map((id) => (
            <Group
              key={id}
              group={groups[id]}
              completed={groups[id].tasksIds.every(
                (id) => tasks[id].checked === true
              )}
              expanded={id === expandedGroup}
              onExpand={handleExpandGroup}
            />
          ))}
        </div>
      </TasksContext.Provider>
    </GroupedTaskStyles>
  )
}
