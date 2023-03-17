import { useEffect, useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DisplayOdds from './components/DisplayOdds';
import { fetchRacingEvents } from './utils/apiService';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';


export default function App() : JSX.Element {
  const [user, setUser] = useState<string[]>([]);
  const [eventList, setEventList] =  useState<{ eventLink: string; eventInfo: string }[]>([])

  const pageURL = "https://sports.bwin.com/en/sports/horse-racing-29/today"

  useEffect(() => {
    fetchRacingEvents(pageURL).then((data) => {
      if (data) setEventList(data)
    })
  },[])

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element = { <Login />}/>
          <Route path="/dashboard" element={<Dashboard eventList={eventList}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
