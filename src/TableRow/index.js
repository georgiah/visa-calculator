import React from 'react'
import './index.css'

export default class TableRow extends React.Component {
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

  fullEntry (entry) {
    return (entry.entry && entry.exit && entry.country)
  }

  numDays (day1, day2) {
    const d1 = new Date(day1)
    const d2 = new Date(day2)

    const timeDiff = Math.abs(d2.getTime() - d1.getTime())
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1
  }

  render () {
    const index = this.props.index
    const entry = this.props.entry

    const entryName = `entry-${index}`
    const exitName = `exit-${index}`
    const countryName = `country-${index}`
    return (
      <tr>
        <td>
          <input type="date" name={entryName}
            value={entry.entry}
            onChange={this.props.onChange} />
        </td>
        <td>
          <input type="date" name={exitName}
            value={entry.exit}
            onChange={this.props.onChange} />
        </td>
        <td>
          <select name={countryName}
            value={entry.country ?
              entry.country : 'Europe'}
            onChange={this.props.onChange}>
            <option value="Europe" disabled>Europe</option>
            {this.state.countries.map(country => {
              return (
                <option value={country} key={country}>
                  {country}
                </option>
              )
            })}
          </select>
        </td>
        <td>
          {this.fullEntry(entry) ?
            `${this.numDays(entry.entry, entry.exit)} of XX` : ''}
        </td>
        <td></td>
      </tr>
    )
  }
}
