const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Module = sequelize.define("Module", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: "modules",
  timestamps: false,
});

module.exports = Module;
