import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'

/* CSS files */
//import "./css/bootstrap.min.css"
import './css/bevellier.css'
import './css/alpino.css'
import './css/main.css'
/* end of CSS files */

import { DarkThemeContextProvider } from './components/contexts/DarkTheme'
import { AnalyticsContextProvider } from './components/contexts/Analytics'
import { Web3ContextProvider } from './components/contexts/Web3'
import MainApp from './components/MainApp'

const App = () => {
  return (
    <Router basename='/'>
      <AnalyticsContextProvider>
        <DarkThemeContextProvider>
          <Web3ContextProvider>
            <MainApp />
          </Web3ContextProvider>
        </DarkThemeContextProvider>
      </AnalyticsContextProvider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
