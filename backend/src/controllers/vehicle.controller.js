const db = require('../models');
const VehicleType = db.VehicleType;
const Vehicle = db.Vehicle;

exports.getAllVehicleTypes = async (req, res) => {
  try {
    const wheels = req.query.wheels;
    let condition = {};
    
    if (wheels) {
      condition = { wheels: parseInt(wheels) };
    }
    
    const vehicleTypes = await VehicleType.findAll({ where: condition });
    res.json(vehicleTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVehiclesByType = async (req, res) => {
  try {
    const typeId = req.params.typeId;
    
    const vehicles = await Vehicle.findAll({
      where: { typeId },
      include: [{ model: VehicleType }]
    });
    
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVehicle = async (req, res) => {
  try {
    const id = req.params.id;
    
    const vehicle = await Vehicle.findByPk(id, {
      include: [{ model: VehicleType }]
    });
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
