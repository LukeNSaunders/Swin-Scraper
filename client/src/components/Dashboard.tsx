import React from 'react';
import DisplayEvents from './DisplayEvents';

export interface EventListProps {
  eventList: {
    eventLink: string;
    eventName: string;
    eventTime: string;
  }[];
  handleLogout: () => void;
}

export default function Dashboard({ eventList, handleLogout }: EventListProps) {
  console.log(eventList);

  return (
    <div className='container'>
      <div className='header'>
        <h1>UPCOMING RACES</h1>
        <div className='logout-button'>
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
      </div>
        {eventList && eventList.map((event, index) => <DisplayEvents key={index} event={event} />)}
    </div>
  );
}
