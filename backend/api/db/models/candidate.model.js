const { Model, DataTypes } = require('sequelize'); 

const CANDIDATE_TABLE = 'candidates';

const CandidateSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }, 
    candidate_firstname:{
        allowNull: false,
        type: DataTypes.STRING
    }, 
    candidate_lastname: {
        allowNull: false,
        type: DataTypes.STRING
    }, 
    candidate_nationality: {
        allowNull: false,
        type: DataTypes.STRING
    }, 
    candidate_project: {
        allowNull: false,
        type: DataTypes.STRING
    }
}

class Candidate extends Model {
    static associate(models) {
        this.hasOne(models.Document, {
          as: 'document',
          foreignKey: 'document_owner',
        });
      }
    static config(sequelize){
        return{
            sequelize,
            tableName:CANDIDATE_TABLE,
            modelName:'Candidate',
            timestamps: false
        }
    }
}

module.exports = { CANDIDATE_TABLE, CandidateSchema, Candidate };