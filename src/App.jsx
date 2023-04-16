import React, { Suspense, memo } from 'react'
import { useRoutes } from 'react-router-dom'
import AppFooter from './components/app-footer'
import routes from './router'
import { useScrollToTop } from './hooks'

const App = memo(() => {
  useScrollToTop()
  
  return (
    <div className='app'>
      <h2>哈哈哈哈</h2>
      {/* <AppHeader/> */}
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