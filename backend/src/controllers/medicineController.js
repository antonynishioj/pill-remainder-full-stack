const Medicine = require('../models/Medicine');

exports.addMedicine = async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    console.error('Add medicine error:', error);
    res.status(400).json({ message: 'Error adding medicine', error: error.message });
  }
};

exports.getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.findAll();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching medicines', 
      error: error.message 
    });
  }
};