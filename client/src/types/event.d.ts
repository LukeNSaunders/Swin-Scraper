export interface EventListProps {
  eventList: {
    eventUrl: string;
    eventName: string;
    eventTime: string;
  }[];
  handleLogout: () => void;
}


export interface DisplayEventProps {
  event: {
    eventUrl: string;
    eventName: string;
    eventTime: string
  };
}

export interface EventDetails {
  eventName: string;
  eventTime: string
  eventOdds: {
    horseName: string;
    horseOdds: string;
  }[];
}

export interface OddsInfo {
  horseName: string 
  horseOdds: string
} 

export interface DisplayOddsProps {
  eventOdds: oddsInfo[];
}