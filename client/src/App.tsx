import { useEffect, useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DisplayOdds from './components/DisplayOdds';
import { fetchRacingEvents } from './utils/apiService';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

export default function App(): JSX.Element {
  const [user, setUser] = useState<string[]>([]);
  const [eventList, setEventList] = useState<{ eventLink: string; eventName: string, eventTime : string}[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pageURL = 'https://sports.bwin.com/en/sports/horse-racing-29/today';

  console.log(eventList)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  console.log(isAuthenticated);

  useEffect(() => {
    const storedData = localStorage.getItem('racingEventData');

    if (storedData) {
      setEventList(JSON.parse(storedData));
    } else {
      fetchRacingEvents(pageURL).then((data) => {
        if (data) {
          setEventList(data);
          localStorage.setItem('racingEventData', JSON.stringify(data));
        }
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                path='/dashboard'
                element={<Dashboard eventList={eventList} handleLogout={handleLogout} />}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
