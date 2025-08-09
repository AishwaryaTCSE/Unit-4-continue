import React, { useReducer } from 'react';
import { themeReducer, initialState } from './themeReducer';

function App() {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const appStyles = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: state.theme === 'light' ? '#ffffff' : '#333333',
    color: state.theme === 'light' ? '#000000' : '#ffffff',
    transition: 'all 0.3s ease-in-out',
  };

  return (
    <div style={appStyles}>
      <h1>{state.theme.toUpperCase()} THEME</h1>
      <button
        onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: state.theme === 'light' ? '#000000' : '#ffffff',
          color: state.theme === 'light' ? '#ffffff' : '#000000',
          border: 'none',
          borderRadius: '8px',
          marginTop: '20px',
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
