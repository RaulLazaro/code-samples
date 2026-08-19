import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Table from './Table'

describe('Table', () => {
  const handleOnSort = jest.fn()
  const columns = [
    {
      key: 'rank',
      label: 'Rank',
      text: 'center',
      width: '10%',
      onSort: handleOnSort
    },
    { key: 'name', label: 'City', width: '30%', onSort: handleOnSort },
    { key: 'country', label: 'Country', width: '30%', onSort: handleOnSort },
    {
      key: 'pm',
      label: 'PM2.5',
      text: 'center',
      width: '10%',
      type: 'chip',
      onSort: handleOnSort
    },
    { key: 'pop', label: 'Population', width: '20%', onSort: handleOnSort }
  ]

  const cities = [
    { rank: 1, name: 'Valladolid', country: 'Spain', pm: 10, pop: 100000 }
  ]

  it('Should render', () => {
    render(
      <Table
        itemKey={'name'}
        length={cities.length}
        page={1}
        perPage={10}
        data={cities}
        columns={columns}
        onClickItem={null}
        sortOrder={'asc'}
        sortKey={'rank'}
        onChangePage={null}
      />
    )
    expect(screen.getByText('Valladolid')).toBeInTheDocument()
  })

  it('Should goTo item', () => {
    const goto = jest.fn()
    render(
      <Table
        itemKey={'name'}
        length={cities.length}
        page={1}
        perPage={10}
        data={cities}
        columns={columns}
        onClickItem={goto}
        sortOrder={'asc'}
        sortKey={'rank'}
        onChangePage={null}
      />
    )
    const item = screen.getByText('Valladolid')
    fireEvent.click(item)
    expect(goto).toHaveBeenCalledWith('Valladolid')
  })

  it('Should change pagination', () => {
    const changePage = jest.fn()
    render(
      <Table
        itemKey={'name'}
        length={20}
        page={2}
        perPage={10}
        data={cities}
        columns={columns}
        onClickItem={null}
        sortOrder={'asc'}
        sortKey={'rank'}
        onChangePage={changePage}
      />
    )

    const prev = screen.getByText('◀')
    fireEvent.click(prev)
    expect(changePage).toHaveBeenCalledWith(1)

    const next = screen.getByText('▶')
    fireEvent.click(next)
    expect(changePage).toHaveBeenCalledWith(3)
  })
})
