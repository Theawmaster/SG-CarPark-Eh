import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Introductory from './pages/Introductory';
import Home from './pages/Home';
import Search from './pages/Search';
import Details from './pages/Details';
import AllListed from './pages/AllListed';
import Find from './pages/Find';
import './styles/Global.css';

/**
 * Main application component for the SG CarPark Eh application.
 *
 * @component
 * @returns {JSX.Element} The application structure with navigation, routes, and dark mode support.
 *
 * @description
 * - Provides navigation between different pages: Introductory, Home, Search, Details, AllListed, and Find.
 * - Includes a dark mode toggle feature that applies global styling changes.
 * - Displays a logo and application title that navigate to the Home page when clicked.
 * - Utilizes routes for managing different pages within the app.
 */

function App() {
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const navigate = useNavigate();

  /**
   * Toggles the dark mode state and updates the global `body` class.
   */

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('dark-mode', !darkMode); // Add or remove class on body
  };

  /**
   * Navigates to the Home page when the logo or title is clicked.
   */

  const handleHomeClick = () => {
    navigate('/Home');
  };

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      {/* Permanent Logo */}
      <header
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px',
          backgroundColor: 'var(--bg-color)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <img
          onClick={handleHomeClick}
          src="/logo.png"
          alt="Logo"
          style={{
            height: '80px',
            marginBottom: '10px',
            alignSelf: 'center',
            cursor: 'pointer',
          }}
        />
        <h1
          onClick={handleHomeClick}
          className="title"
          style={{
            margin: '0',
            textAlign: 'center',
            color: 'var(--text-color)',
            cursor: 'pointer',
          }}
        >
          SG CarPark Eh
        </h1>

        {/* Dark Mode Toggle (Slide Switch) */}
        <div className="dark-mode-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider"></span>
          </label>
          <span style={{ color: 'var(--text-color)', marginTop: '5px' }}>
            {darkMode ? ' 🌙 Dark Mode' : ' 🔅 Light Mode'}
          </span>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Introductory />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Details" element={<Details />} />
        <Route path="/AllListed" element={<AllListed />} />
        <Route path="/Find" element={<Find />} />
      </Routes>
      <p
        className="credits"
        style={{ color: 'var(--text-color)' }}
      >
        Credits: Singapore URA Dataset
      </p>
    </div>
  );
}


/**
 * Application wrapper component to include React Router.
 *
 * @component
 * @returns {JSX.Element} The application wrapped in a `Router`.
 *
 * @description
 * This wrapper component ensures that routing is enabled throughout the application by wrapping the main `App` component inside a `Router`.
 */

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
