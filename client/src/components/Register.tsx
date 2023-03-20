import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/apiService';
import { RegisterProps } from '../types/user';
import { sanitize } from '../utils/sanitizeForm';
import './Register.css';

export default function Register({ setUser }: RegisterProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { username, password, email };
    const sanitizedUser = sanitize(user);
    try {
      const res = await registerUser(sanitizedUser);
      if (res.status === 409) {
        alert(`${res.message}`);
      } else {
        setUser(res);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginHandle = () => {
    navigate('/');
  };

  const validateForm = () => {
    return !username || !password || !email;
  };

  return (
    <div className='register-container'>
      <section className='register'>
        <h1 className='title'>SWIN BET</h1>

        <br></br>

        <h2>Register</h2>
        <form className='form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Email'
            name='email'
            maxLength={25}
            value={email}
            onChange={handleEmail}
          />
          <br></br>

          <input
            type='text'
            placeholder='username'
            name='username'
            maxLength={10}
            value={username}
            onChange={handleUsername}
          />
          <br></br>
          <input
            type='password'
            placeholder='Password'
            name='password'
            maxLength={10}
            value={password}
            onChange={handlePassword}
          />

          <br></br>
          <button className='form-submit' type='submit' disabled={validateForm()}>
            Register
          </button>
        </form>
        <button onClick={loginHandle} className='form-submit'>
          Login
        </button>
      </section>
    </div>
  );
}
