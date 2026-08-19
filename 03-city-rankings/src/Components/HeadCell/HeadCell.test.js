import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import HeadCell from './HeadCell'

describe('HeadCell', () => {
  it('Should render', () => {
    const head = {
      label: 'label',
      key: 'key'
    }
    render(
      <table>
        <thead>
          <tr>
            <HeadCell head={head} />
          </tr>
        </thead>
      </table>
    )
    expect(screen.getByText('label')).toBeInTheDocument()
    const button = screen.getByRole('columnheader')
    fireEvent.click(button)
  })

  it('Should render desc', () => {
    const head = {
      label: 'label',
      key: 'key'
    }
    render(
      <table>
        <thead>
          <tr>
            <HeadCell head={head} sortDirection={'desc'} />
          </tr>
        </thead>
      </table>
    )
    expect(screen.getByText('▼')).toBeInTheDocument()
  })

  it('Should sort', () => {
    const head = {
      label: 'label',
      key: 'key',
      onSort: jest.fn()
    }
    render(
      <table>
        <thead>
          <tr>
            <HeadCell head={head} sortDirection={'asc'} />
          </tr>
        </thead>
      </table>
    )
    const button = screen.getByRole('columnheader')
    expect(screen.getByText('▲')).toBeInTheDocument()
    fireEvent.click(button)

    expect(head.onSort).toHaveBeenCalledWith('key')
  })

  it('Should render center text', () => {
    const head = {
      label: 'label',
      key: 'key',
      text: 'center'
    }
    render(
      <table>
        <thead>
          <tr>
            <HeadCell head={head} sortDirection={'asc'} />
          </tr>
        </thead>
      </table>
    )
    const button = screen.getByRole('columnheader')
    expect(button.className).toBe('center')
  })
})
