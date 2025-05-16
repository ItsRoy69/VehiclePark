const { Sequelize } = require('sequelize');
const config = require('../config/db.config.js')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config);

const db = {
  sequelize,
  Sequelize,
  VehicleType: require('./vehicleType.model')(sequelize, Sequelize),
  Vehicle: require('./vehicle.model')(sequelize, Sequelize),
  Booking: require('./booking.model')(sequelize, Sequelize)
};

// Define relationships
db.VehicleType.hasMany(db.Vehicle, { foreignKey: 'typeId' });
db.Vehicle.belongsTo(db.VehicleType, { foreignKey: 'typeId' });

db.Vehicle.hasMany(db.Booking, { foreignKey: 'vehicleId' });
db.Booking.belongsTo(db.Vehicle, { foreignKey: 'vehicleId' });

module.exports = db;