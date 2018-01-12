import React from 'react'
import './index.css'

export default class InputTable extends React.Component {
  render () {
    return (
      <table>
        <tr>
          <th>Remove</th>
          <th>Entry Date</th>
          <th>Exit Date</th>
          <th>Country</th>
          <th># Days</th>
        </tr>
        <tr>
          <td>
            <button>X</button>
          </td>
          <td>
            <input type="date" />
          </td>
          <td>
            <input type="date" />
          </td>
          <td>
            <select name="country">
              <option value="Europe" selected disabled>Europe</option>
              <option value="Germany">Germany</option>
              <option value="Italy">Italy</option>
            </select>
          </td>
          <td>XX of XX</td>
        </tr>
      </table>
    )
  }
}
