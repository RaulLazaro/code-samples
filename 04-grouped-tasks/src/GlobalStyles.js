import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const GlobalStyles = createGlobalStyle`
  ${normalize}

  :root {
    --white: #ffffff;
    --black: #000000;
    --grey: #cccccc;
    --grey-300: #dddddd;
    --grey-500: #999999;
    --grey-900: #333333;
    --success: #00b797;
    --success-dark: #00a084;
    --success-light: #f2fbfa;
  }
`

export default GlobalStyles
