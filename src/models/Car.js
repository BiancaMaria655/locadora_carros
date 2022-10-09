const Sequelize = require('sequelize');
const db = require('./Database');
const User = require('./User');

const Car = db.define('cars', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },

  modelo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ano: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fabricante: {
    type: Sequelize.STRING,
    allowNull: false
  },
  valor_loc: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  },
  cor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  disponivel: {
    type: Sequelize.STRING,
    allowNull: false
    // S ou N
  },
  adicionais: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

Car.belongsTo(User)
User.hasMany(Car)

Car.sync();

module.exports = Car;
