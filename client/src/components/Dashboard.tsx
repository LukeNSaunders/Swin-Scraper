import React, { useEffect, useState } from 'react';
import DisplayEvents from './DisplayEvents';
import { EventListProps } from '../types/event';
import './Dashboard.css';

export default function Dashboard({ eventList, handleLogout }: EventListProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (eventList.length > 0) {
      setIsLoading(false);
    }
  }, [eventList]);

  return (
    <div className='page-container'>
      <div className='header'>
        <h1>UPCOMING RACES</h1>
        <div className='logout-button'>
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
      </div>
      {isLoading ? (
        <div className='loading-spinner'>
          <h2>Loading Next Races...</h2>
        </div>
      ) : (
        <div className='event-card-container'>
          {eventList &&
            eventList.map((event, index) => {
              return <DisplayEvents key={index} event={event} />;
            })}
        </div>
      )}
    </div>
  );
}
