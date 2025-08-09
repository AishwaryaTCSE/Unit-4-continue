import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [currentTodos, setCurrentTodos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 10;
  const currentPageRef = useRef(1);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      setTodos(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    const start = (currentPageRef.current - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentTodos(todos.slice(start, end));
  }, [todos]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    currentPageRef.current = page;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentTodos(todos.slice(start, end));
  };

  const goNext = () => goToPage(currentPageRef.current + 1);
  const goPrevious = () => goToPage(currentPageRef.current - 1);

  return (
    <div className="container">
      <h2>Todo Pagination</h2>

      <ul className="todo-list">
        {currentTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            {todo.title}
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={goPrevious} disabled={currentPageRef.current === 1}>
          Previous
        </button>

        {[...Array(totalPages).keys()].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              style={{
                backgroundColor: currentPageRef.current === page ? '#007BFF' : '#f0f0f0',
                color: currentPageRef.current === page ? '#fff' : '#000',
              }}
            >
              {page}
            </button>
          );
        })}

        <button onClick={goNext} disabled={currentPageRef.current === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
