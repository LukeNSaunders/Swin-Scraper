import React from 'react';
import { useState, useEffect } from 'react';



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

  return (
    <div>
      {odds && odds.map((odds, index) => (
        <p key={index}>{odds.horseName} <span className='win-odds'>{odds.horseOdds}</span></p>
      ))}
      </div>
  );
}