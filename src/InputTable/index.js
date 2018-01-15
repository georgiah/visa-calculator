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

  render () {
    return (
      <section>
        <table>
          <thead>
            <tr>
              <th>Entry Date</th>
              <th>Exit Date</th>
              <th>Country</th>
              <th># Days</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.entries.map((entry, index) => {
              const rowName = `row-${index}`
              const entryName = `entry-${index}`
              const exitName = `exit-${index}`
              const countryName = `country-${index}`

              return (
                <tr key={rowName}>
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
                  <td></td>
                  <td></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div>
          <button onClick={this.props.onClick}>Add new row</button>
        </div>
      </section>
    )
  }
}
