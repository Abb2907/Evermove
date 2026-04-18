import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <header>
        <h1>EverMove</h1>
        <p className="subtitle">The Adaptive Psychological Engine</p>
      </header>
      <main>
        <Dashboard />
      </main>
    </>
  );
}

export default App;
