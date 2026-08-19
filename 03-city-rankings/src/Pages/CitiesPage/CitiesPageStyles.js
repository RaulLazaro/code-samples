import styled from 'styled-components'

const CitiesPageStyles = styled.div`
  & {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    .hero {
      width: 100%;
      background-color: SeaGreen;
      padding-top: 1rem;
      padding-bottom: 4rem;
      color: white;

      h1 {
        margin-top: 0;
        font-size: 3rem;
      }

      p {
        margin: 1rem 0 2rem 0;
      }
    }
    .container {
      width: 80%;
      margin: auto;
    }

    .table {
      margin-top: calc(-3rem - 3px);
      margin-bottom: 2rem;
    }
  }
`

export default CitiesPageStyles
