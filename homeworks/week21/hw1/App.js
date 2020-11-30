/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-unresolved */
import './App.css';
import { useState, useEffect } from 'react';
import Todo from './Todo';

let id = 2;

export default function App() {
  const [inputValue, setInputValue] = useState('');

  const [todos, setTodos] = useState([
    {
      id: 1,
      content: '寫完 react 作業',
      isDone: false,
      display: true,
    },
  ]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    setTodos([{
      id,
      content: inputValue,
      isDone: false,
      display: true,
    }, ...todos]);

    setInputValue('');
    id++;
  };

  const handleToggleIsDone = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        isDone: !todo.isDone,
      };
    }));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => {
      if (todo.id !== id) return todo;
    }));
  };

  const handleListAll = () => {
    setTodos(todos.map(todo => ({
      ...todo,
      display: true,
    })));
  };

  const handleListDone = () => {
    setTodos(todos.map((todo) => {
      if (!todo.isDone) {
        return {
          ...todo,
          display: false,
        };
      }
      return {
        ...todo,
        display: true,
      };
    }));
  };

  const handleListUndone = () => {
    setTodos(todos.map((todo) => {
      if (todo.isDone) {
        return {
          ...todo,
          display: false,
        };
      }
      return {
        ...todo,
        display: true,
      };
    }));
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  useEffect(() => {
    document.title = 'React TodoList';
  }, []);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Todo
      todos={todos}
      inputValue={inputValue}
      handleInputChange={handleInputChange}
      handleAddTodo={handleAddTodo}
      handleToggleIsDone={handleToggleIsDone}
      handleDeleteTodo={handleDeleteTodo}
      handleListAll={handleListAll}
      handleListDone={handleListDone}
      handleListUndone={handleListUndone}
      handleDeleteAll={handleDeleteAll}
    />
  );
}
