
// Import Express
const express = require('express'); 
const app = express(); 

// Enable JSON request handling
app.use(express.json()); 

// Add a root route
app.get('/', (req, res) => { 
res.send('API is running'); 
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
app.listen(3000, () => { 
console.log('Server running on port 3000'); 
}); 