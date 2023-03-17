import React, { useEffect, useState } from 'react';
import DisplayEvents from './DisplayEvents';

export interface EventListProps {
  eventList: {
    eventUrl: string;
    eventName: string;
    eventTime: string;
  }[];
  handleLogout: () => void;
}

export default function Dashboard({ eventList, handleLogout }: EventListProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
  if(eventList.length > 0) {
    setIsLoading(false)
  }
}, [eventList])

  console.log(eventList);

  return (
    <div className='container'>
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
        eventList && eventList.map((event, index) => <DisplayEvents key={index} event={event} />)
      )}
    </div>
  );
}
