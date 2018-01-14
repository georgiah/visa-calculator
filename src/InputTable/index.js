import React from 'react'
import './index.css'

export default class InputTable extends React.Component {
  constructor (props) {
    super(props)

    // List of countries obtained from
    // https://simple.wikipedia.org/wiki/List_of_European_countries
    this.state = {
      countries: [
        'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan',
        'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria',
        'Croatia', 'Cyprus', 'Czech Republic',
        'Denmark',
        'Estonia',
        'Finland', 'France',
        'Georgia', 'Germany', 'Greece',
        'Hungary',
        'Iceland', 'Ireland', 'Italy',
        'Kosovo',
        'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg',
        'Macedonia', 'Malta', 'Moldova', 'Monaco', 'Montenegro',
        'Netherlands', 'Norway',
        'Poland', 'Portugal',
        'Romania', 'Russia',
        'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain',
        'Sweden', 'Switzerland',
        'Turkey',
        'Ukraine', 'United Kingdom',
        'Vatican City'
      ]
    }
  }

  isFull = (entries) => {
    const numEntries = entries.length
    const lastEntry = entries[numEntries - 1]

    if (numEntries === 0) {
      return true
    } else if (lastEntry.entry && lastEntry.exit && lastEntry.country) {
      return true
    }

    return false
  }

  render () {
    const numEntries = this.props.entries.length
    const lastRowEntry = `entry-${numEntries}`
    const lastRowExit = `exit-${numEntries}`
    const lastRowCountry = `country-${numEntries}`

    return (
      <table>
        <thead>
          <tr>
            <th>Remove</th>
            <th>Entry Date</th>
            <th>Exit Date</th>
            <th>Country</th>
            <th># Days</th>
          </tr>
        </thead>
        <tbody>
          {this.props.entries.map((entry, index) => {
            const entryName = `entry-${index}`
            const exitName = `exit-${index}`
            const countryName = `country-${index}`
            const rowId = `row-${index}`

            return (
              <tr key={rowId}>
                <td>
                  <button>X</button>
                </td>
                <td>
                  <input type="date" name={entryName}
                    value={entry.entry}
                    onChange={this.props.onChange}
                  />
                </td>
                <td>
                  <input type="date" name={exitName}
                    value={entry.exit}
                    onChange={this.props.onChange}
                  />
                </td>
                <td>
                  <select name={countryName}
                    value={entry.country}
                    onChange={this.props.onChange}>
                    {this.state.countries.map(country => {
                      return (
                        <option value={country} key={country}>
                          {country}
                        </option>)
                    })}
                  </select>
                </td>
                <td>{entry.days} of XX</td>
              </tr>
            )
          })}
          {this.isFull(this.props.entries) ? (
            <tr>
              <td>
                <button>X</button>
              </td>
              <td>
                <input type="date" name={lastRowEntry}
                  value={this.props.newEntry.entry}
                  onChange={this.props.onChange}
                />
              </td>
              <td>
                <input type="date" name={lastRowExit}
                  value={this.props.newEntry.exit}
                  onChange={this.props.onChange}
                />
              </td>
              <td>
                <select name={lastRowCountry}
                  value={this.props.newEntry.country ?
                    this.props.newEntry.country : "Europe"}
                  onChange={this.props.onChange}
                >
                  <option value="Europe" disabled>Europe</option>
                  {this.state.countries.map(country => {
                    return (
                      <option value={country} key={country}>
                        {country}
                      </option>)
                  })}
                </select>
              </td>
              <td></td>
            </tr>) : null}
        </tbody>
      </table>
    )
  }
}
