import styled from 'styled-components'

const CityPageStyles = styled.div`
  & {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    .container {
      width: 80%;
      margin: 2rem auto;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;

      iframe {
        flex-grow: 2;
        aspect-ratio: 1/1;
        border-radius: 0.5rem;
        border: none;
      }

      .city-details {
        flex-grow: 1;
        font-size: 1.5rem;

        h2 {
          font-size: 2rem;
          margin-top: 0;
        }

        .pm {
          width: fit-content;
          margin: auto;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
        }
      }
    }
  }
`

export default CityPageStyles
