const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class PatientService {
    constructor() {
        this.patients = [];
    }

    async create(data) {
        try {
            const newPatient = await models.Patient.create(data);
            console.log("New patient:", newPatient);
            return newPatient;
        } catch (error) {
            throw new Error(`Failed to create patient: ${error.message}`);
        }
    }

    async find(query) {
        const options = {
            limit: 10,
            offset: 0
        };

        const { limit, offset } = query;

        if (limit !== undefined && offset !== undefined) {
            options.limit = parseInt(limit, 10);
            options.offset = parseInt(offset, 10);
        }

        const patients = await models.Patient.findAll(options);
        return patients;
    }

    async findOne(id) {
        const patient = await models.Patient.findByPk(id);
        if (!patient) {
            throw boom.notFound('Patient not found');
        }
        return patient;
    }

    async update(id, updateData) {
        const patient = await models.Patient.findByPk(id);
        if (!patient) {
            throw new Error('Patient not found');
        }
        await patient.update(updateData);
        return patient;
    }

    async delete(id) {
        const patient = await models.Patient.findByPk(id);
        if (!patient) {
            throw new Error('Patient not found');
        }
        await patient.destroy();
        return { id };
    }
}

module.exports = PatientService;
