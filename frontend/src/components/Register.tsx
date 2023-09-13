import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Registration: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    if(!username || !email || !password){
      return window.alert("Enter all details")
    }

    try{
         await axios.post("https://todo-app-three-rosy.vercel.app/api/v1/register",{
          username, email, password
        })
        .then((response) => {
          console.log(response.data)
        })


        navigate("/login")
    }
    catch(err){
      console.log(err);
    }
   
  };

  return (
    <div className="container">
      <h2>Registration</h2>
      <form className="form">
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <button type="button" onClick={handleRegister}>
          Register
        </button>
        <p>Already Registered <Link to="/login"><span>Login</span></Link></p>
      </form>
    </div>
  );
};

export default Registration;
