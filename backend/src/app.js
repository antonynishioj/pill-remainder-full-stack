const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const medicineRoutes = require('./routes/medicineRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', medicineRoutes);
app.use(errorHandler);

// Routes
app.use('/api/medicines', medicineRoutes);  // Ensure this matches the frontend service URL
app.use(errorHandler);

// Database Connection
sequelize.sync({ 
    force: false,  
    alter: true    
  })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = app;