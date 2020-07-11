import React, { useState } from 'react';
import Login from './Login';
import HomePage from './HomePage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <div className="App">
      {
        !isAuthenticated
          ?
          <Login handleSuccess={() => setIsAuthenticated(true)} />
          :
          <HomePage/>
      }

    </div>
  );
}

export default App;
