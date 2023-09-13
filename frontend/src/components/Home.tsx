import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { AuthContext } from '../Context/authContext';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const authContext = AuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    authContext.Logout();
    navigate("/login");
  }
 
  return (
    <div>
      <nav className='navbar'>
        <h1>Todo Application</h1>
          <button onClick={handleLogout}>Logout</button>
      </nav>
      <TodoForm/>
      <div style={{ marginTop: '50px' }}>
        <TodoList />
      </div>
    </div>
  );
};

export default Home;
