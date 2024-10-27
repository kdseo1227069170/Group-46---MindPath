import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

// Import the new components
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

// Importing Load Spinner:
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetch that has a timeout (2000sec)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
      <div>
        <h1>Welcome to MindPath</h1>
        <p>Navigate through the MindPath platform to find mental health services that suit your needs.</p>
      </div>
  );
};

function App() {
  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>

            {/* Navigation Bar */}
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </nav>
          </header>

          {/* Routes for page navigation */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
