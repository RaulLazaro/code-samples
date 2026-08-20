import React from 'react'
import ReactDOM from 'react-dom'
import CitiesPage from './Pages/CitiesPage/CitiesPage'
import CityPage from './Pages/CityPage/CityPage'
import { HashRouter, Routes, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { Normalize } from 'styled-normalize'
import GlobalStyles from './GlobalStyles'

// The in-browser mock backend lives in a service worker. On the first visit the
// page isn't controlled by it yet, so wait until it's active and reload once if
// needed before mounting — otherwise the SSE stream would hit the network.
const SW_KEY = 'sw-primed:' + location.pathname.replace(/\/index\.html$/, '/')

const ensureServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) return

  try {
    await navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`)
    await navigator.serviceWorker.ready

    if (
      !navigator.serviceWorker.controller &&
      !sessionStorage.getItem(SW_KEY)
    ) {
      sessionStorage.setItem(SW_KEY, '1')
      window.location.reload()
    }
  } catch (error) {
    console.error('SW registration failed', error)
  }
}

const mount = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Normalize />
      <GlobalStyles />
      <HashRouter>
        <Routes>
          <Route path="/" element={<CitiesPage />} />
          <Route path=":city" element={<CityPage />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

ensureServiceWorker().then(mount)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
