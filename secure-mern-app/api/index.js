// Load environment variables
require('dotenv').config(); 

// Import Express
const express = require('express'); 
const app = express(); 

//Use the environment variables
const PORT = process.env.PORT; 

// Enable JSON request handling
app.use(express.json()); 

// Add a root route
app.get('/', (req, res) => { 
  res.send(process.env.APP_NAME); 
}); 

//Add a health route
app.get('/health', (req, res) => { 
    res.json({ status: 'OK' }); 
}); 

// Add a POST route
app.post('/message', (req, res) => { 
    const { message } = req.body; 
    res.json({ received: message }); 
}); 

//Start the server
app.listen(PORT, () => { 
  console.log(`Running on port ${PORT}`); 
}); 