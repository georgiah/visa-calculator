import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Banner from './Banner'
import InputTable from './InputTable'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      countries: require('./countries.json'),
      entries: [{
        entry: '',
        exit: '',
        country: '',
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

    if (parameter === 'country') {
      const obj = this.state.countries.find((o) => {
        if (o.name === e.target.value) {
          return true
        }
        return false
      })

      entries[row].days = obj.length
    }

    this.setState({
      entries: entries
    })
  }

  handleAdditionClick (e) {
    var entries = this.state.entries

    entries.push({
      entry: '',
      exit: '',
      country: '',
      days: 0
    })

    this.setState({
      entries: entries
    })
  }

  handleRemovalClick (e) {
    const name = e.target.name
    const row = parseInt(name.substring(name.indexOf('-') + 1), 10)
    var entries = this.state.entries

    entries.splice(row, 1)

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
          onAdditionClick={(e) => this.handleAdditionClick(e)}
          onRemovalClick={(e) => this.handleRemovalClick(e)}
          entries={this.state.entries}
          countries={this.state.countries.map(e => e.name)}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
