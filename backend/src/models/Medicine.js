const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Medicine = sequelize.define('Medicine', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  form: {
    type: DataTypes.STRING,
    allowNull: false
  },
  strength: {
    type: DataTypes.STRING,
    allowNull: false
  },
  strengthUnit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dosage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  qualifier: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  frequency: {
    type: DataTypes.JSONB,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('frequency');
      return rawValue ? JSON.parse(rawValue) : null;
    },
    set(value) {
      this.setDataValue('frequency', JSON.stringify(value));
    }
  },
  inventoryCount: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  inventoryReminder: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  refillReminder: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Medicine;