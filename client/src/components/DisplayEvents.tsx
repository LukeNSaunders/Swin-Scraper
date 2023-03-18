import React from 'react';
import { fetchEventOdds } from '../utils/apiService';
import { useState } from 'react';
import DisplayOdds from './DisplayOdds';

export interface DisplayEventProps {
  event: {
    eventUrl: string;
    eventName: string;
    eventTime: string
  };
}

interface EventDetails {
  eventName: string;
  eventTime: string
  eventOdds: {
    horseName: string;
    horseOdds: string;
  }[];
}

const baseURL: string = 'https://sports.bwin.com';

export default function DisplayEvents({ event }: DisplayEventProps) {
  const [eventDetails, setEventDetails] = useState<EventDetails>({ eventName: '', eventOdds: [], eventTime: '' });
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { eventUrl, eventName, eventTime} = event;
  const { eventOdds } = eventDetails;


  const handleDisplayOdds = async () => {
    if (!isClicked && !eventOdds.length) {
      setIsLoading(true);
      try {
        const odds = await fetchEventOdds(`${baseURL}${eventUrl}`);
        if(odds.length) {
          setEventDetails({ eventName, eventTime, eventOdds: odds});
          setIsClicked(!isClicked);
          setIsLoading(false);
        } else {
          setIsLoading(false)
          handleDisplayOdds()
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsClicked(!isClicked);
    }
  };

  const handleRefreshOdds = async () => {
    setIsRefreshing(true);
    try {
      const updatedOdds = await fetchEventOdds(`${baseURL}${eventUrl}`);
      setEventDetails({ eventName, eventTime, eventOdds: updatedOdds });
      setIsRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={`event-card${isClicked? ' expanded' : ''}`}>
        <span><h2 onClick={handleDisplayOdds}>{eventName}</h2></span>
        <span><p>{eventTime}</p></span>
        {isLoading ? (
          <div className='loading-spinner'><p>Loading latest odds...</p></div>
        ) : (
          isClicked && (
            <div>
              {!isRefreshing ? (
                <button className='refresh-button' onClick={handleRefreshOdds}>
                  Refresh Odds
                </button>
              ) : (
                <div className='loading-spinner'></div>
              )}
              <DisplayOdds eventOdds={eventDetails.eventOdds} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
