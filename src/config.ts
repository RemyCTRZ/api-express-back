const { Sequelize } = require('sequelize');

export const sequelize = new Sequelize('postgres://' + process.env.USER + ':' + process.env.PASSWORD + '@' + process.env.HOST + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE)

sequelize.authenticate().then(() => {
  console.log("Connexion réussie !")
}).catch((err: string) => {
  console.log(err)
})

const User = sequelize.define('user', {
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

User.sync().then(() => {
  console.log("Synchronisation réussie !")
}).catch((err: string) => {
  console.log(err)
})

export const config = {
  API_PORT: process.env.API_PORT
}