// backend/src/routes/medicineRoutes.js
const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const { Op } = require('sequelize');
const medicineController = require('../controllers/medicineController');

router.post('/', medicineController.addMedicine);

// Existing routes (add this alongside existing routes)
router.get('/by-date', async (req, res) => {
  try {

    console.log('coming to');
    
    
    const { date } = req.query;

    console.log(date,'data coing');
    
    
    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }

    const medicines = await Medicine.findAll({
      where: {
        startDate: date
      },
      raw: true
    });



    // Group medicines by time of day
   const groupedMedicines = {
      morning: medicines.filter(med => med.frequency && JSON.parse(med.frequency).Morning),
      afternoon: medicines.filter(med => med.frequency && JSON.parse(med.frequency).Afternoon),
      evening: medicines.filter(med => med.frequency && JSON.parse(med.frequency).Evening),
      night: medicines.filter(med => med.frequency && JSON.parse(med.frequency).Night)
    };
    

    res.status(200).json(groupedMedicines);
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ 
      message: 'Error fetching medicines', 
      error: error.message 
    });
  }
});


module.exports = router;