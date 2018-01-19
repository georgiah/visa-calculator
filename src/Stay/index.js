import React from 'react'

export default class Stay extends React.Component {
  render () {
    const reEntryDate = new Date(this.props.exitDate)
    reEntryDate.setDate(reEntryDate.getDate() + 1)
    const newExitDate = new Date(this.props.enterDate)
    newExitDate.setDate(newExitDate.getDate() + this.props.days - 1)

    return (
      <p>
        If you re-enter on {reEntryDate.toDateString()}, you can stay until {newExitDate.toDateString()}
      </p>
    )
  }
}
