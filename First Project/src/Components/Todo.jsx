import { useEffect, useRef, useState } from "react";
import "./CSS/Todo.css";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);

  // Load data from localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const savedCount = Number(localStorage.getItem("todos_count")) || 0;

    setTodos(savedTodos);
    setCount(savedCount);
  }, []);

  // Save todos whenever changed
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("todos_count", count);
  }, [todos, count]);

  const add = () => {
    const text = inputRef.current.value.trim();
    if (!text) return;

    const newTodo = {
      id: count + 1,
      text,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setCount(prev => prev + 1);

    inputRef.current.value = "";
  };

  return (
    <div className="todo">
      <div className="todo-header">To-Do List</div>

      <div className="todo-add">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your tasks"
          className="todo-input"
        />
        <div onClick={add} className="todo-add-btn">Add</div>
      </div>

      <div className="todo-count">
        Total Added Todos: {count}
      </div>

      <div className="todo-list">
        {todos.map(todo => (
          <TodoItems
            key={todo.id}
            todo={todo}
            setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
