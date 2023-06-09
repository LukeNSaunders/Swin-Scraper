import { useEffect, useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { UserProps } from './types/user';
import { fetchRacingEvents } from './utils/apiService';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

export default function App(): JSX.Element {
  const [user, setUser] = useState<UserProps | null>(null);
  const [eventList, setEventList] = useState<
    { eventUrl: string; eventName: string; eventTime: string }[]
  >([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pageURL : string = 'https://sports.bwin.com/en/sports/horse-racing-29/today';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchRacingEvents(pageURL).then((data) => {
      if (data) {
        setEventList(data);
      }
    });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/register' element={<Register setUser={setUser} />} />
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
