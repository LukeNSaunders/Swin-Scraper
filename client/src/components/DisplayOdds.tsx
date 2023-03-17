import React from 'react';
import { useState, useEffect } from 'react';
import { fetchEventOdds } from '../utils/apiService';
import { useLocation } from 'react-router-dom';


interface oddsInfo {
  horseName: string 
  horseOdds: string
} 

export interface DisplayOddsProps {
  eventOdds: oddsInfo[];
}

export default function DisplayOdds({eventOdds}: DisplayOddsProps): JSX.Element {
  const [odds, setOdds] = useState<oddsInfo[]>(eventOdds)

  useEffect(() => {
    setOdds(eventOdds)
  },[eventOdds])

  console.log(eventOdds)


  return (
    <div>
      {odds && odds.map((odds, index) => (
        <p key={index}>{odds.horseName} {odds.horseOdds}</p>
      ))}
      </div>
  );
}