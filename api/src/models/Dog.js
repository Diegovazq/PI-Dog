const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Dog",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weightMin: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      weightMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  
      averageWeight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
   
      life_span: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  
      from_DB: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false, }
  );
};
