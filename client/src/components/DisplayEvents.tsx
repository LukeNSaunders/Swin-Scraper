import React from 'react';
import { fetchEventOdds } from '../utils/apiService';
import { useState, useEffect } from 'react';
import { useNavigate, NavigateOptions } from 'react-router-dom';
import DisplayOdds from './DisplayOdds';

export interface DisplayEventProps {
  event: {
    eventLink: string;
    eventInfo: string;
  };
}
const baseURL = 'https://sports.bwin.com';

export default function DisplayEvents({ event }: DisplayEventProps) {
  const [eventDetails, setEventDetails] = useState<any>({});
  const [eventOdds, setEventOdds] = useState<any>([]);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { eventLink, eventInfo } = event;

  console.log(event);
  console.log(eventInfo);

  const handleClick = async () => {
    if (!isClicked && !eventDetails.eventOdds) {
      setIsLoading(true);
      try {
        const odds = await fetchEventOdds(`${baseURL}${eventLink}`);
        setEventDetails({ eventInfo, eventOdds: odds });
        setIsClicked(!isClicked);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } 
    } else {
      setIsClicked(!isClicked);
    }
  };

  console.log(eventDetails);
  console.log(isClicked);

  console.log(eventOdds);

  return (
    <div>
    <div className='event-card' onClick={handleClick}>
      <p>{eventInfo}</p>
      {isLoading ? (
        <div className='loading-spinner'>Loading...</div>
      ) : (
        isClicked && <DisplayOdds eventOdds={eventDetails.eventOdds} />
      )}
    </div>
  </div>
  );
}
