import React from 'react';
import DisplayEvents from './DisplayEvents';

export interface EventListProps {
  eventList: {
    eventLink: string;
    eventInfo: string;
  }[];
  handleLogout: () => void 
}

export default function Dashboard({ eventList, handleLogout }: EventListProps) {

  return (
    <div className='header'>
      <h1>UPCOMING RACES</h1>
      <div>
        <div className='logout-button'>
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
        {eventList && eventList.map((event, index) => (
          <DisplayEvents key={index} event={event} />
        ))}
      </div>
    </div>
  );
}
