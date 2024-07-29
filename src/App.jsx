import React from 'react';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import './App.css';
import './styles.css';

function App() {
  return (
    <div className="App">
      <div className="background">
        {Array.from({ length: 50 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>
      <div className="app">
        <h1>Inscription</h1>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default App;
