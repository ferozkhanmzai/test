const sequelize = require('../config/dbconfig');
const Sequelize = require('sequelize');

  var users = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    otp: {
        type: Sequelize.STRING,
        allowNull: true
    },
    otp_expiration_date: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: true
    },
  });

module.exports = users;