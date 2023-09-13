import React, { useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authContext = AuthContext();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if(!email || !password) {
      return window.alert("Enter all details");
    }

    try{
      const {data } = await axios.post("http://localhost:5000/api/v1/login", {
        email, password,
        headers: {
          "Content-Type": "application/json"
        }
      })
      authContext.Login(data.token);
      navigate("/home")
    }
    catch(err){
      console.log("Login failed", err);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form className="form">
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <p>Does not have an account <Link to="/"><span>Register</span></Link></p>
      </form>
    </div>
  );
};

export default Login;
