import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as Logo } from '../resources/globe.svg'

const HeaderStyles = styled.header`
  & {
    background-color: SeaGreen;
    a {
      color: white;
      display: flex;
      padding: 1rem 2rem;
      align-items: center;
      text-decoration: none;

      :hover {
        opacity: 75%;
      }

      svg {
        width: 5rem;
        color: white;
      }

      h1 {
        margin: 0 1rem;
      }
    }
    display: flex;
  }
`

export default function Header() {
  return (
    <HeaderStyles>
      <Link to="/">
        <Logo />
        <h1>Live City Rankings</h1>
      </Link>
    </HeaderStyles>
  )
}
