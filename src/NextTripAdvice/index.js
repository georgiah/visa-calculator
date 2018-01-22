import React from 'react'

export default function NextTripAdvice (props) {
  const exit = props.exit
  const maxDays = props.maxDays

  const reEntryDate = new Date(exit)
  reEntryDate.setDate(reEntryDate.getDate() + maxDays + 1)

  return (
    <p>
      If you re-enter on or after {reEntryDate.toDateString()}, you can stay
      a full {maxDays} days.
    </p>
  )
}
