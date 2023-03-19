import { UserProps } from "../types";

const baseURL : string = 'http://localhost:8000';

// LOGIN 

export const loginUser = async (userData: UserProps) => {
  try {
    const response = await fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return error 
  }
};

// REGISTER 

export const registerUser = async (userData: UserProps) => {
  try {
    const response = await fetch(`${baseURL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return error 
  }
};

// FETCH HORSE RACING EVENTS 

export const fetchRacingEvents = async (pageUrl:string) => {
  try {
    const response = await fetch(`${baseURL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({pageUrl: pageUrl}),
    
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return error 
  }
};

export const fetchEventOdds = async (eventUrl:any) => {
  const token = localStorage.getItem('token');

  if(!token) return; 

  try {
    const response = await fetch(`${baseURL}/odds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({eventUrl: eventUrl}),
    
    });
    const data = await response.json()
    return data 
  } catch (error) {
    console.log(error);
    return error 
  }
};