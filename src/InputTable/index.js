import React from 'react'

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
          <td>X</td>
          <td>XX/XX/XXXX</td>
          <td>XX/XX/XXXX</td>
          <td>XXXXXX</td>
          <td>XX of XX</td>
        </tr>
      </table>
    )
  }
}
