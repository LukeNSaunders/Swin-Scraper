import { fetchEventOdds } from '../utils/apiService';
import { useState } from 'react';
import DisplayOdds from './DisplayOdds';
import { DisplayEventProps, EventDetails } from '../types/event';
import './DisplayEvents.css'

export default function DisplayEvents({ event }: DisplayEventProps) {
  const [eventDetails, setEventDetails] = useState<EventDetails>({ eventName: '', eventOdds: [], eventTime: '' });
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { eventUrl, eventName, eventTime} = event;
  const { eventOdds } = eventDetails;
  
  const baseURL: string = 'https://sports.bwin.com';

  // function will keep fetching until response from server is sent back. 
  const handleDisplayOdds = async () => {
    if (!isClicked && !eventOdds.length && !isLoading) {
      setIsLoading(true);
      let odds = []
    while(!odds.length) {
      try {
        odds = await fetchEventOdds(`${baseURL}${eventUrl}`);
        if (odds.length) {
          setEventDetails({ eventName, eventTime, eventOdds: odds });
          setIsClicked(true);
          setIsLoading(false);
        } else {
          console.log('Failed to fetch data, trying again!')
        }
      } catch (error) {
        console.log(error);
      }
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
      <div className='event-card'>
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
