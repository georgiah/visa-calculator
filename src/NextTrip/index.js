import React from 'react'

export default class NextTrip extends React.Component {
  render () {
    const reEntryDate = new Date(this.props.exit)
    reEntryDate.setDate(reEntryDate.getDate() + this.props.maxDays + 1)
    return (
      <p>
        If you re-enter on or after {reEntryDate.toDateString()}, you can stay a full {this.props.maxDays} days.
      </p>
    )
  }
}
