const { Model, DataTypes } = require('sequelize'); 

const USER_TABLE = 'users';

const UserSchema = {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    user_firstname:{
        allowNull: true,
        type: DataTypes.STRING
    }, 
    user_lastname: {
        allowNull: true,
        type: DataTypes.STRING
    }, 
    user_company: {
        allowNull: true,
        type: DataTypes.STRING
    }, 
    user_email: {
        allowNull: true,
        type: DataTypes.STRING
    },
    user_password: {
        allowNull: true,
        type: DataTypes.STRING
    }, 
    user_function: {
        allowNull: true,
        type: DataTypes.STRING
    }, 
    user_role: {
        allowNull: true,
        type: DataTypes.STRING
    },
    user_password_init: {
        allowNull: true,
        type: DataTypes.BOOLEAN
    }, 
    recovery_token: {
        field: 'recovery_token',
        allowNull: true,
        type: DataTypes.STRING
    },
    user_phone: {
        allowNull: true,
        type: DataTypes.INTEGER
    }, 
    user_street: {
        allowNull: true,
        type: DataTypes.STRING
    }, 
    user_zipcode: {
        allowNull: true,
        type: DataTypes.STRING
    }, 
    user_city: {
        allowNull: true,
        type: DataTypes.STRING
    }, 
    user_country: {
        allowNull: true,
        type: DataTypes.STRING
    }, 
}

class User extends Model {
    static associate(models) {
        // Define the alias 'requests' to easily reference all requests associated with a user
        User.hasMany(models.Request, { 
            foreignKey: 'user_id',
            as: 'requests' // Alias to use in queries
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        };
    }
}

module.exports = { USER_TABLE, UserSchema, User };