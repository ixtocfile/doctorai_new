const { Model, DataTypes } = require('sequelize');

const USER_TABLE = 'users';
const MISSION_TABLE = 'missions';
const REQUEST_TABLE = 'requests';

const RequestSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  request_created_by: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  request_created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // Auto-sets the date to current timestamp if not provided
  },
  user_id: {
    field: 'user_id',
    unique: true,
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: USER_TABLE,
      key: 'user_id',       
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  request_status: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  request_comment: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  request_validated_by: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  request_validated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  mission_id: {
    field: 'mission_id',
    unique: true,
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: MISSION_TABLE,  
      key: 'mission_id',  
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Request extends Model {
  static associate(models) {
      // Request belongs to User
      Request.belongsTo(models.User, {
          foreignKey: 'user_id',
          as: 'user' // Alias for referencing the user 
      });

      // Request belongs to Mission
      Request.belongsTo(models.Mission, {
          foreignKey: 'mission_id',
          as: 'mission' // Alias for referencing the mission
      });
  }

  static config(sequelize) {
      return {
          sequelize,
          tableName: REQUEST_TABLE,
          modelName: 'Request',
          timestamps: false
      };
  }
}

module.exports = { REQUEST_TABLE, RequestSchema, Request };
