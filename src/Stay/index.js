import React from 'react'

export default class Stay extends React.Component {
  // calculateDaysRemaining (entryDate, days, daysRemaining) {
  //   const entryDateMinus180 = new Date(entryDate)
  //   entryDateMinus180.setDate(entryDateMinus180.getDate() - 180)
  //
  //   entries.map(function(entry, index) {
  //     const entryDate = new Date(entry)
  //     if (entryDate > entryDateMinus180) {
  //       daysRemaining -= days[index]
  //     //  console.log(daysRemaining)
  //     }
  //   })
  //
  //   return daysRemaining
  // }

  render () {
//    console.log(this.props.entry)
    const reEntryDate = new Date(this.props.exit)
    reEntryDate.setDate(reEntryDate.getDate() + 1)
    const newExitDate = new Date(this.props.exit)
    newExitDate.setDate(newExitDate.getDate() + this.props.maxDays)

    return (
      <p>
        If you re-enter on {reEntryDate.toDateString()}, you can stay until {newExitDate.toDateString()}
      </p>
    )
  }
}
