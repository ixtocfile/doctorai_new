const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class CandidateService {
    constructor(){
        this.candidates = [];
    }

    async create(data){
        const newCandidate = await models.Candidate.create(data)
        return newCandidate;
    }

    async find() {
        const rows = await models.Candidate.findAll();
        return rows;
    }

    async findOne(id){
        const candidate = await models.Candidate.findByPk(id);
        if(!candidate) {
           throw boom.notFound('candidate not found');
        }
        return candidate;
    }

    async update(id, updateData) {
        const candidate = await models.Candidate.findByPk(id);
        if (!candidate) {
          throw new Error('Candidate not found');
        }
        await candidate.update(updateData);
        return candidate;
    }

    async delete(id){
        const candidate = await models.Candidate.findByPk(id);
        await candidate.destroy();
        return { id }
    }
}

module.exports = CandidateService;