const express = require('express');
const userRoutes = require('./routes/userRoutes');
const requisitionRoutes = require('./routes/requisitionRoutes');
require('dotenv').config(); // To load environment variables from a .env file
// Import database connection
require('./config/db'); // 

const app = express();

// Middleware for Swagger
const setupSwagger = require('./config/swagger');
setupSwagger(app); // Set up Swagger

// Middleware to parse JSON
app.use(express.json());


// Register the user routes
app.use('/api', userRoutes);

// Register the requisition routes
app.use('/api', requisitionRoutes);

// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.send('Welcome to the Procurement System API');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
