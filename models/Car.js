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
    allowNull: false,
    notEmpty: {
      msg: 'Nome não pode ser em Branco!'
    }
  },

  modelo: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: {
      msg: 'Modelo não pode ser em Branco!'
    }
  },
  ano: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: {
        msg: 'Ano não pode ser em branco!'
    }
  },
  fabricante: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: {
      msg: 'Fabricante não pode ser em branco!'
    }
  },
  valor_loc: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false,
    notEmpty: {
        msg: 'Valore da locação não pode ser em branco!'
    
    }
  },
  cor: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: {
      msg: 'Nome não pode ser em Branco!'
    }
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

//Car.belongsTo(User)
//User.hasMany(Car)

Car.sync();

module.exports = Car;
