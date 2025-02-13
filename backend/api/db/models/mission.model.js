const { Model, DataTypes } = require('sequelize'); 

const MISSION_TABLE = 'missions';

const MissionSchema = {
    mission_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    }, 
    mission_company:{
        allowNull: true,
        type: DataTypes.STRING
    }, 
    mission_street: {
        allowNull: true,
        type: DataTypes.STRING
    }, 
    mission_zipcode: {
        allowNull: true,
        type: DataTypes.INTEGER
    }, 
    mission_city: {
        allowNull: true,
        type: DataTypes.STRING
    },
    mission_country: {
        allowNull: true,
        type: DataTypes.STRING
    }, 
    mission_contact_firstname: {
        allowNull: true,
        type: DataTypes.STRING
    }, 
    mission_contact_lastname: {
        allowNull: true,
        type: DataTypes.STRING
    }, 
    mission_contact_role: {
        allowNull: true,
        type: DataTypes.STRING
    }, 
    mission_contact_phone: {
        allowNull: true,
        type: DataTypes.INTEGER
    }, 
    mission_contact_email: {
        allowNull: true,
        type: DataTypes.STRING
    }, 
    mission_description: {
        allowNull: true,
        type: DataTypes.STRING
    }, 
    mission_startDate: {
        allowNull: true,
        type: DataTypes.DATE
    }, 
    mission_endDate: {
        allowNull: true,
        type: DataTypes.DATE
    }, 
}

class Mission extends Model {
    static associate(models) {
        Mission.hasMany(models.Request, {
            foreignKey: 'mission_id',
            as: 'requests'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: 'missions',
            modelName: 'Mission',
            timestamps: false
        };
    }
}

module.exports = { MISSION_TABLE, MissionSchema, Mission };