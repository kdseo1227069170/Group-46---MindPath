import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import React from "react";
import CrisisSupport from './CrisisSupport';
import RegistrationForm from './RegistrationForm';

// Import Admin Dashboard
import AdminDashboard from './components/AdminDashboard';

// Importing the Loading Spinner
import LoadingSpinner from './components/LoadingSpinner';

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
