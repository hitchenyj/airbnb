import React, { Suspense, memo } from 'react'
import { useRoutes } from 'react-router-dom'
import AppFooter from './components/app-footer'
import routes from './router'
import { useScrollToTop } from './hooks'
import AppHeader from './components/app-header'

const App = memo(() => {
  useScrollToTop()
  
  return (
    <div className='app'>
      <AppHeader/>
      <Suspense fallback="loading">
        <div className='page'>
          {useRoutes(routes)}
        </div>
      </Suspense>
      <AppFooter/>
    </div>
  )
})

export default App