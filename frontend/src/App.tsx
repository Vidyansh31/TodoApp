import React from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from './AuthContext'; // Import AuthProvider and useAuth
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import Home from "./components/Home";
import PrivateRoute from "./routes/PrivateRoute";
import "./App.css"

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
