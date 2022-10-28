const Sequelize = require('sequelize');
const db = require('./Database');
const Car = require('./Car')

const Loc = db.define('locacao', {
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

  veiculo: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: {
      msg: 'Veiculo não pode ser em Branco!'
    }
  },
  dataIn: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    notEmpty: {
      msg: 'Data de inicio não pode ser em branco!'
    }
  },
  dataFim: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    notEmpty: {
      msg: 'Data Final não pode ser em branco!'
    }
  },
  valor: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: {
      msg: 'Valor Total não pode ser em branco!'
    }
  }
});

Loc.belongsTo(Car,{
  constraint:true,
  foreignKey:'idCarro'
})

Loc.sync();

module.exports = Loc;