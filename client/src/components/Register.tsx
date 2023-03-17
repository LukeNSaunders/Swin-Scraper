import { useState, ChangeEvent, FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/apiService";
import "./Register.css";

const initialState = {
  username: "",
  email: "",
  password: "",
};

export interface UserProps {
  username: string; 
  email: string; 
  password: string; 
} 

const Register = ({setUser} : any )=> {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [exists, setExists] = useState(false);

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password, email } = state;
    const user = { username, password, email };
    try {
      const res = await registerUser(user);
      if(res.status === 409) {
        alert(`${res.message}`)
      } else {
        setUser(res)
        navigate('/dashboard')
      }
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  };

  const loginHandle = () => {
    navigate("/");
  };

  const validateForm = () => {
    return !state.username || !state.password || !state.email;
  };

  return (
    <div className="register-container">
      <section className="register">
        <h1 className="title">SWIN BET</h1>

        <br></br>

        <h2>Register</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          <br></br>

          <input
            type="text"
            placeholder="username"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
          <br></br>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />

          <br></br>
          <button
            className="form-submit"
            type="submit"
            disabled={validateForm()}
          >
            Register
          </button>
        </form>
        {exists ? <p> User already exists. Please login</p> : "Already a user?"}
        <br></br>
        <button onClick={loginHandle} className="form-submit">
          Login
        </button>
      </section>
    </div>
  );
};

export default Register;
