import logo from './logo.svg';
import './App.css';
import React from 'react';
import RegistrationForm from './RegistrationForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to MindPath Registration</h1>
        <RegistrationForm /> {}
      </header>
    </div>
  );
}

export default App;
