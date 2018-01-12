import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Banner from './Banner'
import InputTable from './InputTable'

class App extends React.Component {
  render () {
    return (
      <container class="app">
        <Banner />
        <InputTable />
      </container>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
