const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');

router.get('/types', vehicleController.getAllVehicleTypes);

router.get('/types/:typeId', vehicleController.getVehiclesByType);

router.get('/:id', vehicleController.getVehicle);

module.exports = router;
