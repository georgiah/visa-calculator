import React from 'react'
import Stay from '../Stay'
import Error from '../Error'
import './index.css'

export default class App extends React.Component {
  render () {
    const stays = this.props.stays
    const countries = this.props.countries

    return (
      <div className="advice">
        {stays.map((stay) => {
          var maxDays = countries.filter(function (country) {
            return (country.name === stay.zone)
          })
          maxDays = maxDays.length ? maxDays[0].length : 90

          var trip = {}
          var enterDay = null
          var exitDay = null
          const entries = stay.entries
          for (let i = 0; i < entries.length; i++) {
            if (((i + 1) < entries.length) &&
                  (entries[i].exit === entries[i+1].entry)) {
              if (enterDay) {
                continue
              } else {
                enterDay = entries[i].entry
                continue
              }
            }

            if ((i + 1) !== entries.length) {
              enterDay = null
              continue
            }

            if (enterDay === null) {
              enterDay = entries[i].entry
            }
            exitDay = entries[i].exit

            trip = {
              zone: stay.zone,
              entry: enterDay,
              exit: exitDay,
              maxDays: maxDays
            }
          }

          const entryMinus180 = new Date(trip.entry)
          entryMinus180.setDate(entryMinus180.getDate() - 2*maxDays)
          console.log('entryMinus180, ', entryMinus180)

          for (let visit of entries) {
            if ((new Date(visit.entry) > entryMinus180) && (visit.entry < trip.entry)) {
              const d1 = new Date(visit.entry)
              const d2 = new Date(visit.exit)
              const timeDiff = Math.abs(d2.getTime() - d1.getTime())
              trip.maxDays -= (Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1)
            }
          }

          const entryDate = new Date(trip.entry)
          const exitDate = new Date(trip.exit)
          const timeDiff = Math.abs(exitDate.getTime() - entryDate.getTime())
          trip.maxDays -= (Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1)


          console.log(trip)

          return (
            <div key={stay.zone}>
              <h3>{stay.zone}</h3>
              {trip.maxDays > 0 ? <Stay
                key={trip.entry}
                exit={trip.exit}
                maxDays={trip.maxDays} /> : null}
              {trip.maxDays < 0 ? <Error /> : null}
            </div>
          )
        })}
      </div>
    )
  }
}

// {stay.entry.map((enterDate, index) =>
//   <Stay
//     key={enterDate}
//     entry={stay.entry}
//     exit={stay.exit}
//     days={stay.days}
//     maxDays={days}
//     index={index} />
// )}
