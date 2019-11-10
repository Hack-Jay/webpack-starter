import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import defaultImg from './assets/img/default.png'
import './index.css'
import './index.less'

const App = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => setCount((preCount) => preCount + 1), 3000)
  }, [])

  return (
    <div className="app-container">
      <h1 className="header-h1 less-h1">
        Hello React and Webpack (HMR)...
        {count}
      </h1>
      <img src={defaultImg} alt="img" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('Cannot apply HMR update.', err)
    }
  })
}
