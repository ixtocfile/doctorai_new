const { Model, DataTypes } = require('sequelize');

const PATIENT_TABLE = 'patients';

const PatientSchema = {
  patient_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patient_firstname: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  patient_lastname: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  patient_gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: true,
  },
  patient_dob: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  patient_email: {
    type: DataTypes.STRING(45),
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  patient_phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  patient_street: {
    type: DataTypes.STRING(145),
    allowNull: true,
  },
  patient_zipcode: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  patient_city: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  patient_country: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  patient_emergency_contact_name: {
    type: DataTypes.STRING(90),
    allowNull: true,
  },
  patient_emergency_contact_phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  patient_medical_record_number: {
    type: DataTypes.STRING(45),
    allowNull: true,
    unique: true,
  },
  patient_blood_type: {
    type: DataTypes.STRING(5),
    allowNull: true,
  },
  patient_allergies: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  patient_medications: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  patient_primary_care_physician: {
    type: DataTypes.STRING(90),
    allowNull: true,
  },
  patient_insurance_provider: {
    type: DataTypes.STRING(90),
    allowNull: true,
  },
  patient_insurance_policy_number: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
};

class Patient extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: PATIENT_TABLE,
      modelName: 'Patient',
      timestamps: false,
    };
  }
}

module.exports = { PATIENT_TABLE, PatientSchema, Patient };
