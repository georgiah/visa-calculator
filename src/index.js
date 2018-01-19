import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Banner from './Banner'
import InputTable from './InputTable'
import TravelAdvice from './TravelAdvice'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      countries: require('./countries.json'),
      entries: [{
        entry: '',
        exit: '',
        country: '',
        days: 0,
        zone: ''
      }],
      schengen: require('./countries.json').filter(o =>
        o.zone === 'Schengen').map(o => {
          return o.name
        }),
      stays: []
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
      entries[row].zone = obj.zone
    }

    this.setState({
      entries: entries
    })

    this.calculateStays()
  }

  calculateStays () {
    var stays = []
    const entries = this.state.entries

    for (let entry of entries) {
      if (this.isFull(entry)) {
        const zone = this.state.schengen.includes(entry.country) ?
          'Schengen' : entry.country
        const existingStay = stays.filter(function (stay) {
          return stay.zone === zone
        })[0]

        if (existingStay) {
          existingStay.entry.push(entry.entry)
          existingStay.exit.push(entry.exit)
        } else {
          stays.push({
            zone: zone,
            entry: [entry.entry],
            exit: [entry.exit]
          })
        }
      }
    }

    for (let stay of stays) {
      this.checkOverlap(stay)
    }

    this.setState({
      stays: stays
    })
  }

  isFull (entry) {
    return (entry.entry && entry.exit && entry.country)
  }

  checkOverlap (stay) {
    var entry = stay.entry
    var exit = stay.exit

    for (let i = 0; i < entry.length; i++) {
      for (let j = 0; j < exit.length; j++) {
        if (entry[i] === exit[j]) {
          entry.splice(i, 1)
          exit[j] = exit[i]
          exit.splice(i, 1)
        }
      }
    }
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

    this.calculateStays()
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
        <TravelAdvice
          countries={this.state.countries}
          stays={this.state.stays} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
