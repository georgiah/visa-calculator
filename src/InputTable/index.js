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
          <tr>
            <td>
              <button>X</button>
            </td>
            <td>
              <input type="date" name="entry-0"
                onChange={this.props.onChange}
              />
            </td>
            <td>
              <input type="date" name="exit-0"
                onChange={this.props.onChange}
              />
            </td>
            <td>
              <select name="country-0"
                defaultValue="Europe"
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
            <td>{this.props.entries[0].days} of XX</td>
          </tr>
        </tbody>
      </table>
    )
  }
}
