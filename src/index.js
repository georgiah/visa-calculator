import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Banner from './Banner'
import InputTable from './InputTable'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      entries: [{
        entry: null,
        exit: null,
        country: null,
        days: 0
      }]
    }
  }

  handleChange (e) {
    var entries = this.state.entries
    const name = e.target.name
    const row = parseInt(name.substring(name.indexOf('-') + 1), 10)
    const parameter = name.substring(0, name.indexOf('-'))

    entries[row][parameter] = e.target.value

    if (entries[row]['entry'] && entries[row]['exit']
      && entries[row]['country']) {
      const d1 = new Date(entries[row].entry)
      const d2 = new Date(entries[row].exit)
      const days = Math.floor((Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate()) -
        Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate())) / (1000*60*60*24)) + 1
      entries[row]['days'] = days
    }

    this.setState({
      entries: entries
    })
  }

  render () {
    return (
      <div className="app">
        <Banner />
        <InputTable
          onChange={(e) => this.handleChange(e)}
          entries={this.state.entries}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
