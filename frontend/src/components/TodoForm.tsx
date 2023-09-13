import React, { useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/authContext";

const TodoForm: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const authContext = AuthContext();

  const token = authContext.getToken();

  const handleCreateTodo = async () => {
    await axios
      .post(
        "http://localhost:5000/api/v1/createTodo",
        {
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ) 
      .then((response) => {
        console.log("Todo created successfully:", response.data);
        setDescription("");
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
      });
  };

  return (
    <div className="todo-form">
      <h2>Create New Todo</h2>
      <input
        type="text"
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleCreateTodo}>Create</button>
    </div>
  );
};

export default TodoForm;
