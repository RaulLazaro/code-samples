import styled from 'styled-components'

const FiltersStyles = styled.div`
  & {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    label {
      display: flex;
      flex-direction: column;
      margin: 1rem 0.5rem;

      input,
      select {
        margin-top: 1rem;
        border-radius: 1rem;
        height: 1.5rem;
        padding: 0;
        border: none;
        padding-left: 1rem;
      }
    }
  }
`

export default FiltersStyles
