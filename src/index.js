import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class App extends React.Component {
  render () {
    return <Banner />
  }
}

class Banner extends React.Component {
  render () {
    return (
      <header>
        <h1>Visa Calculator for Australians visiting Europe</h1>
      </header>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
