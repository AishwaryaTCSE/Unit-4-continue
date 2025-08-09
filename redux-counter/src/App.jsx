import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/counterSlice';

function App() {
  const counter = useSelector((state) => state.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Redux Counter App</h1>
      <p>Counter Value  {JSON.stringify(counter)}</p>
      <button onClick={() => dispatch(decrement())} style={{ marginRight: '10px' }}>
        Decrement
      </button>
      <button onClick={() => dispatch(increment())}>
        Increment
      </button>
    </div>
  );
}

export default App;
