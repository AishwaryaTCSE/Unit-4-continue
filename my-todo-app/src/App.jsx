import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, toggleTodo, deleteTodo } from './store/todoSlice'
import { nanoid } from 'nanoid'

function App() {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')

  const handleAdd = () => {
    if (title.trim() === '') return
    dispatch(addTodo({ id: nanoid(), title, status: false }))
    setTitle('')
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold mb-6 text-center">Redux Todo List</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-grow border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add a new todo"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <ul>
        {todos.length === 0 && (
          <li className="text-center text-gray-500">No todos yet</li>
        )}

        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex justify-between items-center mb-3 p-3 border rounded hover:shadow"
          >
            <div
              onClick={() => dispatch(toggleTodo(todo.id))}
              className={`cursor-pointer flex-grow select-none ${
                todo.status ? 'line-through text-gray-400' : ''
              }`}
            >
              {todo.title}
            </div>
            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              className="text-red-600 hover:text-red-800 ml-4 font-bold"
              aria-label="Delete todo"
            >
              &#10006;
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
