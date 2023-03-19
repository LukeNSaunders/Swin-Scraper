import { loginUser } from '../utils/apiService';
import { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '../types';
import './Login.css';

export default function Login({ setIsAuthenticated }: LoginProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginData = { email, password };
      const response = await loginUser(loginData);
      if (response.status === 401 || response.status === 400 || response.status === 409) {
        alert(`${response.message}`);
      }
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
    setEmail('')
    setPassword('')
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
    <div className='login-container'>
      <section className='lOGIN'>
        <h1 className='title'>SWIN BET</h1>

        <br></br>

        <h2>Login</h2>
        <form className='form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Email'
            name='email'
            autoComplete='email'
            value={email}
            onChange={handleEmail}
          />
          <br></br>
          <input
            type='password'
            placeholder='Password'
            name='password'
            autoComplete='current-password'
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
