const Joi = require('joi');

const patient_id = Joi.number().integer();
const patient_firstname = Joi.string();
const patient_lastname = Joi.string();
const patient_gender = Joi.string().valid('Male', 'Female', 'Other');
const patient_dob = Joi.date().iso();
const patient_email = Joi.string().email();
const patient_phone = Joi.string().max(15);
const patient_street = Joi.string().max(145);
const patient_zipcode = Joi.string().max(10);
const patient_city = Joi.string().max(45);
const patient_country = Joi.string().max(45);
const patient_emergency_contact_name = Joi.string().max(90);
const patient_emergency_contact_phone = Joi.string().max(15);
const patient_medical_record_number = Joi.string().max(45);
const patient_blood_type = Joi.string().max(5);
const patient_allergies = Joi.string().allow('').optional();
const patient_medications = Joi.string().allow('').optional();
const patient_primary_care_physician = Joi.string().max(90);
const patient_insurance_provider = Joi.string().max(90);
const patient_insurance_policy_number = Joi.string().max(45);

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const idSchema = Joi.object({
    patient_id: patient_id.required()
});

const getPatientSchema = Joi.object({
    patient_id: patient_id.required()
});

const createPatientSchema = Joi.object({
    patient_firstname: patient_firstname.required(),
    patient_lastname: patient_lastname.required(),
    patient_gender: patient_gender.required(),
    patient_dob: patient_dob.required(),
    patient_email: patient_email.required(),
    patient_phone: patient_phone.required(),
    patient_street: patient_street.required(),
    patient_zipcode: patient_zipcode.required(),
    patient_city: patient_city.required(),
    patient_country: patient_country.required(),
    patient_emergency_contact_name: patient_emergency_contact_name.optional(),
    patient_emergency_contact_phone: patient_emergency_contact_phone.optional(),
    patient_medical_record_number: patient_medical_record_number.optional(),
    patient_blood_type: patient_blood_type.optional(),
    patient_allergies: patient_allergies.optional(),
    patient_medications: patient_medications.optional(),
    patient_primary_care_physician: patient_primary_care_physician.optional(),
    patient_insurance_provider: patient_insurance_provider.optional(),
    patient_insurance_policy_number: patient_insurance_policy_number.optional()
});

const updatePatientSchema = Joi.object({
    patient_firstname: patient_firstname,
    patient_lastname: patient_lastname,
    patient_gender: patient_gender,
    patient_dob: patient_dob,
    patient_email: patient_email,
    patient_phone: patient_phone,
    patient_street: patient_street,
    patient_zipcode: patient_zipcode,
    patient_city: patient_city,
    patient_country: patient_country,
    patient_emergency_contact_name: patient_emergency_contact_name,
    patient_emergency_contact_phone: patient_emergency_contact_phone,
    patient_medical_record_number: patient_medical_record_number,
    patient_blood_type: patient_blood_type,
    patient_allergies: patient_allergies,
    patient_medications: patient_medications,
    patient_primary_care_physician: patient_primary_care_physician,
    patient_insurance_provider: patient_insurance_provider,
    patient_insurance_policy_number: patient_insurance_policy_number
});

const queryPatientSchema = Joi.object({
    limit,
    offset
});

module.exports = { idSchema, getPatientSchema, createPatientSchema, updatePatientSchema, queryPatientSchema };
