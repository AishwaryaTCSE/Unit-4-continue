import React, { useRef, useState } from 'react';
import './App.css';

const App = () => {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.backgroundColor = '#e0f7fa'; 
      setFocused(true);
    }
  };

  return (
    <div className="container">
      <h2>Focus Input with useRef</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to focus me"
        className="input-box"
      />
      <br />

      <button onClick={handleFocus}>Focus Input</button>

      {focused && <p className="message">Focused!</p>}
    </div>
  );
};

export default App;
