const db = require('../models');
const VehicleType = db.VehicleType;
const Vehicle = db.Vehicle;

async function seedDatabase() {
  try {
    await db.sequelize.sync({ force: true });
    console.log('Database synchronized');

    const vehicleTypes = await VehicleType.bulkCreate([
      { name: 'Hatchback', wheels: 4 },
      { name: 'SUV', wheels: 4 },
      { name: 'Sedan', wheels: 4 },
      { name: 'Cruiser', wheels: 2 }
    ]);
    
    console.log('Vehicle types created');

    const vehicles = [
      { model: 'Swift', typeId: 1, description: 'Compact and fuel-efficient hatchback' },
      { model: 'i20', typeId: 1, description: 'Spacious premium hatchback' },
      
      { model: 'Creta', typeId: 2, description: 'Comfortable mid-size SUV' },
      { model: 'XUV700', typeId: 2, description: 'Premium SUV with advanced features' },
      
      { model: 'City', typeId: 3, description: 'Reliable and comfortable sedan' },
      { model: 'Verna', typeId: 3, description: 'Stylish sedan with premium features' },
      
      { model: 'Royal Enfield Classic', typeId: 4, description: 'Classic cruiser bike with retro styling' },
      { model: 'Harley Davidson Iron', typeId: 4, description: 'Premium cruiser bike with powerful engine' }
    ];
    
    await Vehicle.bulkCreate(vehicles);
    console.log('Vehicles created');
    
    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
