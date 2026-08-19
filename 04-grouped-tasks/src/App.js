import { useEffect, useState } from 'react'
import styled from 'styled-components'
import GroupedTask from './components/GroupedTaks'

const AppStyles = styled.div`
  & {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`

const API_URL = `${process.env.PUBLIC_URL}/mock-data.json`

function App() {
  const [data, setData] = useState()

  useEffect(() => {
    fetch(API_URL)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        setData(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return <AppStyles>{data ? <GroupedTask data={data} /> : null}</AppStyles>
}

export default App
