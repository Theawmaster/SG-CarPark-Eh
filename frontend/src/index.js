import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot from react-dom/client
import './index.css';
import App from './App';

/**
 * Entry point for the SG CarPark Eh React application.
 *
 * @file
 * @description
 * - Initializes the React application and renders the `App` component into the root DOM element.
 * - Uses `React.StrictMode` to highlight potential problems in the application during development.
 * - Applies global styles from `index.css`.
 *
 * @module index
 */

const root = ReactDOM.createRoot(document.getElementById('root')); // Create the root

/**
 * Renders the main `App` component wrapped in `React.StrictMode`.
 */

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
