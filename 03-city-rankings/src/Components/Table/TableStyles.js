import styled from 'styled-components'

const TableStyles = styled.div`
  & {
    @media (max-width: 600px) {
      overflow-y: scroll;
    }

    ::-webkit-scrollbar {
      display: none;
    }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      overflow: hidden;
      border-radius: 0.75rem;

      tbody {
        tr {
          cursor: pointer;
          &:hover {
            background-color: lightgrey;
          }
        }
      }

      td,
      th {
        border-bottom: 1px solid lightgrey;
        padding: 1rem 1.25rem;

        &.left {
          text-align: left;
        }

        &.center {
          text-align: center;
        }
      }

      thead {
        background-color: grey;
        color: white;
        th span {
          cursor: pointer;
          position: relative;

          :hover {
            opacity: 50%;
          }

          span {
            position: absolute;
            right: -1rem;
          }
        }
      }

      tr td:first-child {
        border-left: 1px solid lightgrey;
      }

      tr td:last-child {
        border-right: 1px solid lightgrey;
      }

      tr:first-child th:first-child {
        border-top-left-radius: 0.75rem;
      }

      tr:first-child th:last-child {
        border-top-right-radius: 0.75rem;
      }

      tr:last-child td:first-child {
        border-bottom-left-radius: 0.75rem;
      }

      tr:last-child td:last-child {
        border-bottom-right-radius: 0.75rem;
      }
    }

    .pagination {
      width: 100%;
      padding: 1rem;
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 10rem;
        margin: auto;
        .hidden {
          visibility: hidden;
        }

        button {
          cursor: pointer;
          padding: 0.1rem 0.5rem;
          background-color: grey;
          border-radius: 0.5rem;
          border: none;
          color: white;

          :hover {
            background-color: lightgrey;
          }
        }
      }
    }
  }
`

export default TableStyles
