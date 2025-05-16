module.exports = (sequelize, DataTypes) => {
  const VehicleType = sequelize.define('VehicleType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    wheels: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[2, 4]]
      }
    }
  }, {
    timestamps: true
  });
  
  return VehicleType;
};