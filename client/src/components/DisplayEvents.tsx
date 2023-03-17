import React from 'react';
import { fetchEventOdds } from '../utils/apiService';
import { useState } from 'react';
import DisplayOdds from './DisplayOdds';

export interface DisplayEventProps {
  event: {
    eventLink: string;
    eventInfo: string;
  };
}

interface EventDetails {
  eventInfo: string;
  eventOdds: {
    horseName: string;
    horseOdds: string;
  }[];
}

const baseURL: string = 'https://sports.bwin.com';

export default function DisplayEvents({ event }: DisplayEventProps) {
  const [eventDetails, setEventDetails] = useState<EventDetails>({ eventInfo: '', eventOdds: [] });
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { eventLink, eventInfo } = event;
  const { eventOdds } = eventDetails;

  const handleDisplayOdds = async () => {
    if (!isClicked && !eventOdds.length) {
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

  const handleRefreshOdds = async () => {
    setIsRefreshing(true);
    try {
      const updatedOdds = await fetchEventOdds(`${baseURL}${eventLink}`);
      setEventDetails({ eventInfo, eventOdds: updatedOdds });
      setIsRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='event-card'>
        <h2 onClick={handleDisplayOdds}>{eventInfo}</h2>
        {isLoading ? (
          <div className='loading-spinner'></div>
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
