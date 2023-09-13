import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/authContext";

interface Todo {
  _id: string;
  description: string;
  isCompleted: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const authContext = AuthContext();

  const token: string | null = authContext.getToken();

  useEffect(() => {
    axios
      .get("https://todo-app-three-rosy.vercel.app/api/v1/getTodos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTodos(response.data.todoList.todos);

      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, [todos]);

  const handleMarkCompleted = async (todoId: string) => {
    try {
      await axios.post(
        `https://todo-app-three-rosy.vercel.app/api/v1/markTodo`,
        {todoId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the todo's isCompleted status in the state
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === todoId
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        )
      );
    } catch (error) {
      console.error("Error marking todo as completed:", error);
    }
  };

  const handleDelete = async (todoId: string) => {
    try {
      await axios.delete(
        `https://todo-app-three-rosy.vercel.app/api/v1/delete`,
        {
          data: { todoId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Remove the todo from the state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      <div className="todo-list-item">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className={`todo-item ${
              todo.isCompleted ? "completed" : "incomplete"
            }`}
          >
            <p>{todo.description}</p>
            <button onClick={() => handleMarkCompleted(todo._id)}>
            {todo.isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
            </button>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
