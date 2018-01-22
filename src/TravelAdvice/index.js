import React from 'react'
import './index.css'
import Stay from '../NextDayAdvice'
import Error from '../ErrorAdvice'
import NextTrip from '../NextTripAdvice'

export default class App extends React.Component {
// Calculates the difference in days between two dates
  diffDays (day1, day2) {
    const d1 = new Date(day1)
    const d2 = new Date(day2)

    const timeDiff = Math.abs(d2.getTime() - d1.getTime())
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1
  }

// Returns true if all three of entry, exit, and country have been entered
  isFull (entry) {
    return (entry.entry && entry.exit && entry.country)
  }

// Re-models the list of visits as a list of zones, each containing the entry
// and exit dates for that zone.
  calculateZones (visits) {
    var zones = []

    for (let visit of visits) {
      if (this.isFull(visit)) {
        const country = this.props.countries.filter(function (country) {
          return country.name === visit.country
        })
        const visitZone = country[0].zone ? country[0].zone : country[0].name
        const existingStay = zones.filter(function (zone) {
          return zone.zone === visitZone
        })[0]

// If there's already an existing entry for this zone, append a new entry and
// exit date to it.
        if (existingStay) {
          existingStay.entries.push({
            entry: visit.entry,
            exit: visit.exit
          })
        } else {
          zones.push({
            zone: visitZone,
            entries: [{
              entry: visit.entry,
              exit: visit.exit
            }]
          })
        }
      }
    }

    for (let zone of zones) {
      this.calculateDays(zone)
    }

    return this.sortStays(zones)
  }

// Calculate the number of days stayed for each visit
  calculateDays (zone) {
    for (let entry of zone.entries) {
      entry.days = this.diffDays(entry.entry, entry.exit)
    }
  }

// Sort the stays into ascending order
  sortStays (stays) {
    stays.map(function (stay) {
      stay.entries.sort(function (a, b) {
        if (a.entry < b.entry) {
          return -1
        }
        if (a.entry > b.entry) {
          return 1
        }
        return 0
      })
      return stay
    })

    return stays
  }

  render () {
    const visits = this.props.visits
    const zones = this.calculateZones(visits)
    const countries = this.props.countries

    return (
      <div className="advice">
        {zones.map((zone) => {
          const entries = zone.entries

// Find the maximum days that can be stayed in this zone
          var maxDays = countries.filter(function (country) {
            return (country.name === zone.zone)
          })
          maxDays = maxDays.length ? maxDays[0].length : 90

// Map over entries and reduce consecutive stays into a single entry.
// This stops double-counting the day of exit/entry into the same zone.
          var trip = {}
          var enterDay = null
          var exitDay = null
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
              zone: zone.zone,
              entry: enterDay,
              exit: exitDay,
              maxDays: maxDays
            }
          }

// Calculate date when visa period began
          const entryMinus2MaxStays = new Date(trip.entry)
          entryMinus2MaxStays.setDate(entryMinus2MaxStays.getDate() - 2*maxDays)

// For each visit to this zone, if it was within this visa period, subtract the
// length of the visit from the maximum number of days left remaining to stay
          for (let visit of entries) {
            if ((new Date(visit.entry) > entryMinus2MaxStays) &&
                  (visit.entry < trip.entry)) {
              trip.maxDays -= this.diffDays(visit.entry, visit.exit)
            }
          }

          trip.length = this.diffDays(trip.entry, trip.exit)
          trip.maxDays -= trip.length

          return (
            <div key={zone.zone}>
              <h3>
                {zone.zone}
              </h3>

              {trip.maxDays > 0 ?
                <Stay
                  exit={trip.exit}
                  maxDays={trip.maxDays} />
                : null}

              {trip.maxDays < 0 ? <Error /> : null}

              {trip.maxDays >=0 ?
                <NextTrip
                  exit={trip.exit}
                  maxDays={maxDays}/>
                  : null}
            </div>
          )
        })}
      </div>
    )
  }
}
