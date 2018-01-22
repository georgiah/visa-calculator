import React from 'react'
import './index.css'

export default class TableRow extends React.Component {
// Returns true if all three of entry, exit, and country have been entered
  isFull (visit) {
    return (visit.entry && visit.exit && visit.country)
  }

// Calculates the difference in days between two dates
  diffDays (day1, day2) {
    const d1 = new Date(day1)
    const d2 = new Date(day2)

    const timeDiff = Math.abs(d2.getTime() - d1.getTime())
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1
  }

  render () {
    const index = this.props.index
    const visit = this.props.visit
    const countries = this.props.countries

    const entryName = `entry-${index}`
    const exitName = `exit-${index}`
    const countryName = `country-${index}`
    const buttonName = `delete-${index}`

    return (
      <tr>
        <td>
          <input type="date"
            name={entryName}
            value={visit.entry}
            onChange={this.props.onChange} />
        </td>
        <td>
          <input type="date"
            name={exitName}
            value={visit.exit}
            onChange={this.props.onChange} />
        </td>
        <td>
          <select
            name={countryName}
            value={visit.country ? visit.country : 'Europe'}
            onChange={this.props.onChange}>

            <option value="Europe" disabled>
              Europe
            </option>

            {countries.map(country => {
              return (
                <option
                  value={country}
                  key={country}>

                  {country}
                </option>
              )
            })}
          </select>
        </td>
        <td>
          {this.isFull(visit) ?
            `${this.diffDays(visit.entry, visit.exit)} of ${visit.maxDays}`
            : ''}
        </td>
        <td>
          {index ?
            <button className="delete"
              name={buttonName}
              onClick={this.props.onClick}>
              X
            </button> : ''}
        </td>
      </tr>
    )
  }
}
