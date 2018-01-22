import React from 'react'

export default function NextDayAdvice (props) {
  const exit = props.exit
  const maxDays = props.maxDays

  const reEntryDate = new Date(exit)
  reEntryDate.setDate(reEntryDate.getDate() + 1)

  const newExitDate = new Date(exit)
  newExitDate.setDate(newExitDate.getDate() + maxDays)

  return (
    <p>
      If you re-enter on {reEntryDate.toDateString()}, you can stay
      until {newExitDate.toDateString()}.
    </p>
  )
}
