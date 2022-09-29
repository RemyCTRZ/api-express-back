const { Sequelize } = require('sequelize');

export const sequelize = new Sequelize('postgres://' + process.env.USER + ':' + process.env.PASSWORD + '@' + process.env.HOST + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE)

export const User = sequelize.define('user', {
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: false
  },
  description: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  }
},
  {
    freezeTableName: true
  })

export const config = {
  API_PORT: process.env.API_PORT
}