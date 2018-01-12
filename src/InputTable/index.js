import React from 'react'
import './index.css'

export default class InputTable extends React.Component {
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
              <select name="country">
                <option value="Europe" defaultValue disabled>Europe</option>
                <option value="Germany">Germany</option>
                <option value="Italy">Italy</option>
              </select>
            </td>
            <td>XX of XX</td>
          </tr>
        </tbody>
      </table>
    )
  }
}
