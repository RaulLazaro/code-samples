import HeadCell from '../HeadCell/HeadCell'
import TableStyles from './TableStyles'
import Chip from '../Chip/Chip'

export default function Table(props) {
  const {
    itemKey,
    length,
    perPage,
    page,
    onChangePage,
    columns,
    data,
    onClickItem,
    sortOrder,
    sortKey
  } = props

  const thead = (
    <thead>
      <tr>
        {columns.map((col) => (
          <HeadCell
            key={col.key}
            head={col}
            sortDirection={sortKey === col.key ? sortOrder : null}
          />
        ))}
      </tr>
    </thead>
  )

  const tbody = (
    <tbody>
      {data.map((d) => {
        return (
          <tr key={d[itemKey]} onClick={() => onClickItem(d[itemKey])}>
            {columns.map((col) => (
              <td
                className={col.text ? col.text : 'left'}
                key={d[itemKey] + col.key}>
                {col.type === 'chip' ? <Chip value={d[col.key]} /> : d[col.key]}
              </td>
            ))}
          </tr>
        )
      })}
    </tbody>
  )

  const pagination = (
    <div className="pagination">
      <div>
        <button
          className={page === 1 ? 'hidden' : null}
          onClick={() => onChangePage(page - 1)}>
          ◀
        </button>
        <span>{page}</span>
        <button
          className={page * perPage > length ? 'hidden' : null}
          onClick={() => onChangePage(page + 1)}>
          ▶
        </button>
      </div>
    </div>
  )

  return (
    <TableStyles colums={columns}>
      <table>
        <colgroup>
          {columns.map((col) => (
            <col key={col.key} width={col.width} />
          ))}
        </colgroup>
        {thead}
        {tbody}
      </table>
      {pagination}
    </TableStyles>
  )
}
