import React from 'react'
import DisplayEvents from './DisplayEvents';

export interface EventListProps {
  eventList: {
    eventLink: string, 
    eventInfo: string
  } []
}


export default function Dashboard({eventList} : EventListProps) {


  return (
    <div>
      {eventList.map(event => (
        <DisplayEvents event={event}/>
      ))}
      </div>
  )
}
