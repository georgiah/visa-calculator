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
        entry: '',
        exit: '',
        country: ''
      }]
    }
  }

  handleChange (e) {
    var entries = this.state.entries
    const name = e.target.name
    const row = parseInt(name.substring(name.indexOf('-') + 1), 10)
    const parameter = name.substring(0, name.indexOf('-'))

    entries[row][parameter] = e.target.value

    this.setState({
      entries: entries
    })
  }

  handleAdditionClick (e) {
    var entries = this.state.entries

    entries.push({
      entry: '',
      exit: '',
      country: ''
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
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
