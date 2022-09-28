import React, { createContext, useState, useEffect, useContext } from 'react'

// Create two context:
// Web3InfoContext: to query the context state
// DarkThemeDispatchContext: to mutate the context state
const DarkThemeContext = createContext(undefined)
const DarkThemeDispatchContext = createContext(undefined)

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function DarkThemeContextProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false)

  const localStrorageName = 'esteroids_darkmode'

  useEffect(() => {
    const darkModeConf = JSON.parse(localStorage.getItem(localStrorageName))
    if (darkModeConf) {
      setDarkTheme(true)
    }
  }, [])

  useEffect(() => {
    if (darkTheme) document.body.setAttribute('data-theme', 'dark')
    else document.body.setAttribute('data-theme', '')
  }, [darkTheme])

  useEffect(() => {
    const darkModeConf = JSON.parse(localStorage.getItem(localStrorageName))
    if (darkModeConf !== darkTheme) {
      localStorage.setItem(localStrorageName, JSON.stringify(darkTheme))
    }
  }, [darkTheme])

  return (
    <DarkThemeContext.Provider value={darkTheme}>
      <DarkThemeDispatchContext.Provider value={setDarkTheme}>{children}</DarkThemeDispatchContext.Provider>
    </DarkThemeContext.Provider>
  )
}

const useDarkThemeContext = () => {
  return useContext(DarkThemeContext)
}
const useDarkThemeDispatchContext = () => {
  return useContext(DarkThemeDispatchContext)
}

export { DarkThemeContextProvider, useDarkThemeContext, useDarkThemeDispatchContext }
