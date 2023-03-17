import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

interface DisplayOddsProps {
  eventOdds: any;
}

export default function DisplayOdds({eventOdds} : DisplayOddsProps): JSX.Element {

  console.log(eventOdds)

  if (!eventOdds || !eventOdds.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      WORKING!!!
      {eventOdds.map((odds:any) => (
        <p>{odds.horseName} {odds.horseOdds}</p>
      ))}
    </div>
  );
}