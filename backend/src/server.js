const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Medicine = require('./models/Medicine');

const app = require('./app');  


app.use(cors());
app.use(express.json());

// Database connection and sync
sequelize.sync({ force: false }) // Set to true to drop and recreate tables
  .then(() => {
    console.log('Database connected and synchronized');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Routes
const medicineRoutes = require('./routes/medicineRoutes');
app.use('/api/medicines', medicineRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});