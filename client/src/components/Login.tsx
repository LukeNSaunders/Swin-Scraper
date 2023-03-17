import React from 'react';
import { loginUser } from '../utils/apiService';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setIsAuthenticated }: LoginProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginData = { email, password };
      const response = await loginUser(loginData);
      if (response.status === 401 || response.status === 400) {
        alert(`Invalid credentials`);
      }
      if (response && response.token) {
        console.log(response.token);
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className='babble-island'>
      <section className='login'>
        <h1 className='title'>SCRAPER</h1>

        <br></br>

        <h2>Login</h2>
        <form className='form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Email'
            name='email'
            value={email}
            onChange={handleEmail}
          />
          <br></br>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={handlePassword}
          />
          <br></br>
          <button className='form-submit' type='submit'>
            &nbsp;Login&nbsp;
          </button>
        </form>
        <p>Don't have an account? Register here</p>
        <button className='form-submit' onClick={navigateToRegister}>
          Register
        </button>
      </section>
    </div>
  );
}
