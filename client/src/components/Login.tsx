import React from 'react'
import { loginUser } from '../utils/apiService'
import { useState } from 'react'
import { ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = {email, password}
    const response = await loginUser(loginData)
    if (response) {
      console.log(response)
      console.log('hello')
      localStorage.setItem('token', response.token)
      navigate('/dashboard')
    }
  }

  const handleEmail= (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const moveToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="babble-island">
      <section className="login">
        <h1 className="title">SCRAPER</h1>

        <br></br>

        <h2>Login</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
          <br></br>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value ={password}
            onChange={handlePassword}
          />
          <br></br>
          <button
            className="form-submit"
            type="submit"
          >
            &nbsp;Login&nbsp;
          </button>
        </form>
        <p>Don't have an account? Register here</p>
        <button className="form-submit" onClick={moveToRegister}>
          Register
        </button>
      </section>
    </div>
  )
}
