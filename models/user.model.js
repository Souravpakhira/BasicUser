const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../helpers/init_postgres');

const User = sequelize.define('user',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
              msg: 'Firstname cannot be empty'
            }
        }
    },
    lastName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
            msg: 'Email must be a unique'
        },
        validate: {
            isEmail: {
                msg: 'Must be a proper email'
            },
            notNull: {
                msg: "Email cannot be empty"
            },
        }
    }
},{
    timestamps: true
})

module.exports = User;