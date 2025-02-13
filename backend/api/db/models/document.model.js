const { Model, DataTypes } = require('sequelize'); 

const CANDIDATE_TABLE = 'candidates';
const DOCUMENT_TABLE = 'documents';

const DocumentSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }, 
    document_owner:{
        unique: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'candidates', 
          key: 'id',
        },
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL' 
    }, 
    document_label: {
        allowNull: false,
        type: DataTypes.STRING
    }, 
    document_label: {
        allowNull: false,
        type: DataTypes.STRING
    }, 
    document_emplacement_disque: {
        allowNull: false,
        type: DataTypes.STRING
    },
    document_type: {
        allowNull: false,
        type: DataTypes.STRING
    }
}

class Document extends Model {
    static associate(models) {
        this.belongsTo(models.Candidate, {
            as: 'candidate',
            foreignKey: 'document_owner',  
            targetKey: 'id', 
      });
    }
    static config(sequelize){
        return{
            sequelize,
            tableName:DOCUMENT_TABLE,
            modelName:'Document',
            timestamps: false
        }
    }
}

module.exports = { DOCUMENT_TABLE, DocumentSchema, Document };