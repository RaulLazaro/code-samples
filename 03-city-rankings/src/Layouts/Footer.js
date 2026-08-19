import styled from 'styled-components'

const FooterStyles = styled.footer`
  & {
    display: flex;
    background-color: grey;
    padding: 3rem 0;
    width: 100%;
    margin-top: auto;
    span {
      width: fit-content;
      color: white;
      font-weight: bold;
      margin: auto;
    }
  }
`

export default function Footer() {
  return (
    <FooterStyles>
      <span>Made with React by Raul Lazaro</span>
    </FooterStyles>
  )
}
