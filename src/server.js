import app from './app.js';

const PORT = process.env.PORT || 4000;

/**
 * Starts the Express server.
 *
 * @description
 * This script initializes the Express application and starts the server on the specified port.
 * If no `PORT` environment variable is defined, it defaults to port `4000`.
 *
 * @module server
 * @example
 * // Run the server:
 * node server.js
 *
 * @listens {http://localhost:PORT} The server listens for incoming HTTP requests.
 */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
