import React from 'react'
import './index.css'
import TableRow from '../TableRow'

export default class InputTable extends React.Component {
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
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {this.props.entries.map((entry, index) => {
              const rowName = `row-${index}`

              return (
                <TableRow key={rowName}
                  onChange={this.props.onChange}
                  onClick={this.props.onRemovalClick}
                  entry={entry}
                  index={index} />
              )
            })}
          </tbody>
        </table>
        <div>
          <button onClick={this.props.onAdditionClick}>Add new row</button>
        </div>
      </section>
    )
  }
}
