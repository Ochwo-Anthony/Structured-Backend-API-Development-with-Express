// Load environment variables
require('dotenv').config();

// Import Express
const express = require('express');

// Import security and middleware packages
const cors = require('cors');
const helmet = require('helmet');

// Import HTTPS and file system modules
const https = require('https');
const fs = require('fs');
const path = require('path');

// Import movie routes and error handler
const movieRoutes = require('./routes/movieRoutes');
const errorHandler = require('./middleware/errorHandler');

// Create Express application
const app = express();

// Use environment variables
const PORT = process.env.PORT || 4000;
const USE_HTTPS = process.env.USE_HTTPS === 'true';

const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// Disable Express x-powered-by header
app.disable('x-powered-by');

// -----------------------------------------
// Security Headers - Helmet
// -----------------------------------------
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'", CLIENT_ORIGIN],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameAncestors: ["'none'"]
      }
    },
    crossOriginResourcePolicy: {
      policy: 'same-site'
    }
  })
);

// -----------------------------------------
// Controlled CORS Configuration
// -----------------------------------------
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// -----------------------------------------
// JSON Request Handling
// -----------------------------------------
app.use(express.json({ limit: '10kb' }));

// -----------------------------------------
// Root Route
// -----------------------------------------
app.get('/', (req, res) => {
  res.status(200).json({
    app: process.env.APP_NAME || 'SecureAPI',
    message: 'API is running securely'
  });
});

// -----------------------------------------
// Health Route
// -----------------------------------------
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    protocol: USE_HTTPS ? 'HTTPS' : 'HTTP'
  });
});

// -----------------------------------------
// Movie API Routes
// -----------------------------------------
app.use('/api/movies', movieRoutes);

// -----------------------------------------
// Handle Unknown Routes
// -----------------------------------------
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// -----------------------------------------
// Central Error Handler
// -----------------------------------------
app.use(errorHandler);

// -----------------------------------------
// Start Server
// -----------------------------------------
if (USE_HTTPS) {
  const keyPath =
    process.env.SSL_KEY_PATH ||
    path.join(__dirname, 'certs', 'localhost-key.pem');

  const certPath =
    process.env.SSL_CERT_PATH ||
    path.join(__dirname, 'certs', 'localhost-cert.pem');

  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  };

  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`HTTPS server running on port ${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`);
  });
}