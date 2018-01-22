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
      visits: [{
        entry: '',
        exit: '',
        country: '',
        maxDays: 0,
        zone: ''
      }]
    }
  }

// Handles a change in input fields
  handleChange (e) {
    var visits = this.state.visits
    const name = e.target.name
// Strip out the table row and parameter from the input name
    const row = parseInt(name.substring(name.indexOf('-') + 1), 10)
    const parameter = name.substring(0, name.indexOf('-'))

    visits[row][parameter] = e.target.value

// When the country is updated, find the country's zone and maximum stay
    if (parameter === 'country') {
      const obj = this.state.countries.find((o) => {
        if (o.name === e.target.value) {
          return true
        }
        return false
      })

      visits[row].maxDays = obj.length
      visits[row].zone = obj.zone
    }

    this.setState({
      visits: visits
    })
  }

// Handler to add a new row. Add a new blank entry to the visits array
  handleAdditionClick (e) {
    var visits = this.state.visits

    visits.push({
      entry: '',
      exit: '',
      country: '',
      days: 0,
      zone: ''
    })

    this.setState({
      visits: visits
    })
  }

// Handler to remove a row. Removes the relevant entry from the visits array
  handleRemovalClick (e) {
    const name = e.target.name
    const row = parseInt(name.substring(name.indexOf('-') + 1), 10)
    var visits = this.state.visits

    visits.splice(row, 1)

    this.setState({
      visits: visits
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
          visits={this.state.visits}
          countries={this.state.countries.map(e => e.name)}
        />
        <TravelAdvice
          countries={this.state.countries}
          visits={this.state.visits} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
