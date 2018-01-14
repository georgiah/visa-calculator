import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Banner from './Banner'
import InputTable from './InputTable'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      entries: [],
      newEntry: {
        entry: '',
        exit: '',
        country: '',
        days: 0
      }
    }
  }

  handleChange (e) {
    var entries = this.state.entries
    var newEntry = this.state.newEntry
    const name = e.target.name
    const row = parseInt(name.substring(name.indexOf('-') + 1), 10)
    const parameter = name.substring(0, name.indexOf('-'))

    if (row > entries.length) {
      entries[row][parameter] = e.target.value
    } else {
      newEntry[parameter] = e.target.value
      if (newEntry.entry && newEntry.exit
        && newEntry.country) {
          const d1 = new Date(newEntry.entry)
          const d2 = new Date(newEntry.exit)
          const days = Math.floor((Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate()) -
            Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate())) / (1000*60*60*24)) + 1
          newEntry.days = days

          entries.push(newEntry)
          newEntry = {
            entry: '',
            exit: '',
            country: '',
            days: 0
          }
        }
    }

    this.setState({
      entries: entries,
      newEntry: newEntry
    })
  }

  render () {
    return (
      <div className="app">
        <Banner />
        <InputTable
          onChange={(e) => this.handleChange(e)}
          entries={this.state.entries}
          newEntry={this.state.newEntry}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
