import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask, toggleTask } from './features/tasks/taskSlice';

function App() {
  const [taskText, setTaskText] = useState('');
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📝 Task List App</h1>

      <input
        type="text"
        placeholder="Enter task..."
        value={taskText}
        onChange={e => setTaskText(e.target.value)}
      />
      <button onClick={handleAddTask} style={{ marginLeft: '10px' }}>
        Add Task
      </button>

      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            marginTop: '10px'
          }}>
            {task.text}
            <button
              onClick={() => dispatch(toggleTask(task.id))}
              style={{ marginLeft: '10px' }}
            >
              Toggle
            </button>
            <button
              onClick={() => dispatch(removeTask(task.id))}
              style={{ marginLeft: '10px' }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
