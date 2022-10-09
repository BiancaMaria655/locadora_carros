const Sequelize = require('sequelize');

database = new Sequelize('locadora', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  omitNull: true
});

database
  .authenticate()
  .then(result => {
    console.log('Conectado ao Banco de dados!');
  })
  .catch(err => {
    console.log('ERRO');
  });

module.exports = database;
