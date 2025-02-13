const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class MissionService {
    constructor(){
        this.missions = [];
    }

    async create(data){
        const newMission = await models.Mission.create(data)
        return newMission;
    }

    async find(query){
        const options = {
            limit: 5,
            offset: 0
        }
        const { limit, offset } = query;

        if (limit !== undefined && offset !== undefined) {
            options.limit = parseInt(limit, 10);
            options.offset = parseInt(offset, 10);
        }
        const rows = await models.Mission.findAll(options);
        return rows;
    }

    async findOne(mission_id){
        const mission = await models.Mission.findByPk(mission_id);
        if(!mission) {
           throw boom.notFound('mission not found');
        }
        return mission;
    }

    async update(mission_id, updateData) {
        const mission = await models.Mission.findByPk(mission_id);
        if (!mission) {
          throw new Error('Mission not found');
        }
        await mission.update(updateData);
        return mission;
    }

    async delete(mission_id){
        const mission = await models.Mission.findByPk(mission_id);
        await mission.destroy();
        return { mission_id }
    }
}

module.exports = MissionService;