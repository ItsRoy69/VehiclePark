const db = require('../models');
const Booking = db.Booking;
const Vehicle = db.Vehicle;
const { Op } = db.Sequelize;

exports.createBooking = async (req, res) => {
  try {
    const { firstName, lastName, vehicleId, startDate, endDate } = req.body;

    if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (parsedEndDate <= parsedStartDate) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }
    const overlappingBookings = await Booking.findAll({
      where: {
        vehicleId,
        [Op.or]: [
          {
            startDate: { [Op.between]: [parsedStartDate, parsedEndDate] }
          },
          {
            endDate: { [Op.between]: [parsedStartDate, parsedEndDate] }
          },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: parsedStartDate } },
              { endDate: { [Op.gte]: parsedEndDate } }
            ]
          }
        ]
      }
    });

    if (overlappingBookings.length > 0) {
      return res.status(409).json({ message: 'Vehicle is already booked for the selected dates' });
    }

    const booking = await Booking.create({
      firstName,
      lastName,
      vehicleId,
      startDate: parsedStartDate,
      endDate: parsedEndDate
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
