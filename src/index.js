import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Banner from './Banner'

class App extends React.Component {
  render () {
    return <Banner />
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
