const Sequelize = require('sequelize');
const db = require('./Database');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: {
            msg: 'Nome não pode ser em Branco'
        }
    },

    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Email não pode ser em branco!'
            },
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Senha não pode estar em branco!'
            },
            isAlphanumeric: {
                msg: 'Senha deve ser Letras e Numeros'
            }
        }
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    user_type: {
        type: Sequelize.STRING,
        allowNull: false
            // ADM OR CLIENT
    },
    cnh: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

User.sync();

module.exports = User