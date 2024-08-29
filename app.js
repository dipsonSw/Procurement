const express = require('express');
const userRoutes = require('./routes/userRoutes');
const requisitionRoutes = require('./routes/requisitionRoutes');
const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes');
require('dotenv').config(); // To load environment variables from a .env file
// Import database connection
const connectDB = require('./config/db'); // 
connectDB()

const app = express();

// Middleware for Swagger
const setupSwagger = require('./config/swagger');
setupSwagger(app); // Set up Swagger

// Middleware to parse JSON
app.use(express.json());

//for Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // or specify a specific domain
    next();
  });
  const cors = require('cors');
  app.use(cors())
  app.use(cors({
    origin: 'http://10.11.0.141:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
// 

// user routes
app.use('/api/users', userRoutes);

// requisition routes
app.use('/api/requisitions', requisitionRoutes);

// procurement 
app.use('/api/purchaseorder', purchaseOrderRoutes);

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
