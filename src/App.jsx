import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './features/counter/counterSlice';

function App() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.value);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🔢 Redux Counter</h1>
      <h2>{count}</h2>

      <button onClick={() => dispatch(increment())} style={{ marginRight: '10px' }}>
        Increment
      </button>
      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </div>
  );
}

export default App;
