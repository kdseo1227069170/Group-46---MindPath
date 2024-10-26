import './App.css';
import React from "react";
import CrisisSupport from './CrisisSupport';
import RegistrationForm from './RegistrationForm';

function App() {
    return (
        // Calls CrisisSupport component
        <div className="App">
                <CrisisSupport/>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to MindPath Registration</h1>
        <RegistrationForm /> {}
      </header>
    </div>
  );

}
// Exporting the App component
export default App;
