import React from 'react'
import Stay from '../Stay'
import './index.css'

export default class App extends React.Component {
  render () {
    const stays = this.props.stays
    const countries = this.props.countries

    return (
      <div className="advice">
        {stays.map((stay) => {
          var days = countries.filter(function (country) {
            return (country.name === stay.zone)
          })
          days = days.length ? days[0].length : 90

          return (
            <div key={stay.zone}>
              <h3>{stay.zone}</h3>
              {stay.entry.map((enterDate, index) =>
                <Stay
                  key={enterDate}
                  enterDate={enterDate}
                  exitDate={stay.exit[index]}
                  days={days} />
              )}
            </div>
          )
        })}
      </div>
    )
  }
}
