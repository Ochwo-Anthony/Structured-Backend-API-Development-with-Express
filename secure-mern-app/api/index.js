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

// Add a secure input endpoint
app.post('/submit', (req, res) => { 
    const { name, message } = req.body; 

    if (!name || !message) { 
        return res.status(400).json({ error: 'All fields required' }); 
    } 

    if (name.length > 50) { 
        return res.status(400).json({ error: 'Name too long' }); 
    } 

    if (typeof message !== 'string') { 
        return res.status(400).json({ error: 'Invalid message' }); 
    } 
    
    res.status(200).json({ 
        message: 'Data received', 
        data: { name, message } 
    }); 
}); 

//Start the server
app.listen(PORT, () => { 
  console.log(`Running on port ${PORT}`); 
}); 