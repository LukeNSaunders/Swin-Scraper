import React from 'react';
import { useState, useEffect } from 'react';
import { OddsInfo, DisplayOddsProps } from '../types/event';

export default function DisplayOdds({eventOdds}: DisplayOddsProps): JSX.Element {
  const [odds, setOdds] = useState<OddsInfo[]>(eventOdds)

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