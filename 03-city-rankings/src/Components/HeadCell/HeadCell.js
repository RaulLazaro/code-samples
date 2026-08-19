export default function HeadCell(props) {
  const { head, sortDirection } = props

  const sortLabel = <span> {sortDirection === 'asc' ? '▲' : '▼'}</span>

  return (
    <th
      className={head.text ? head.text : 'left'}
      onClick={() => (head.onSort ? head.onSort(head.key) : null)}>
      <span>
        {head.label} {sortDirection ? sortLabel : null}
      </span>
    </th>
  )
}
