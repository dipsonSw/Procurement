const express = require('express');
const requisitionRoutes = require('./routes/requisitionRoutes');
require('dotenv').config(); // To load environment variables from a .env file

//Using Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');


// Import database connection
require('./config/db'); // Assuming db.js is in the same directory level as app.js

const app = express();

//Middleware for Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Middleware to parse JSON
app.use(express.json());

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
