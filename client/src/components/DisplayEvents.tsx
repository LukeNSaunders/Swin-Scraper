import React from 'react';
import { fetchEventOdds } from '../utils/apiService';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayOdds from './DisplayOdds';

export interface DisplayEventProps {
  event: {
    eventLink: string;
    eventInfo: string;
  };
}
const baseURL = "https://sports.bwin.com"

export default function DisplayEvents({ event }: DisplayEventProps) {
  
  const [eventOdds, setEventOdds] = useState<any>([])
  const { eventLink, eventInfo } = event;
  
  const navigate = useNavigate()

  console.log(event);
  console.log(eventInfo)

  const handleClick = async () => {
    console.log(eventLink)
    const odds = await fetchEventOdds(`${baseURL}${eventLink}`)
    setEventOdds(odds)
    navigate('/event-odds')
  }

  console.log(eventOdds)

  return (
    <div>
      <div className='event-card' onClick={handleClick}>
        <a href={eventLink}>{eventInfo}</a>
        <DisplayOdds eventOdds= {eventOdds}/>
      </div>
    </div>
  );
}
