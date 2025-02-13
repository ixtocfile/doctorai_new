const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class RequestService {
    constructor(){
        this.requests = [];
    }

    async create(data) {
        const {
            user_email,
            user_firstname,
            user_lastname,
            user_function,
            user_phone,
            user_street,
            user_zipcode,
            user_city,
            user_country,

            mission_company,
            mission_street,
            mission_zipcode,
            mission_city,
            mission_country,
            mission_contact_role,
            mission_contact_firstname,
            mission_contact_lastname,
            mission_contact_phone,
            mission_contact_email,
            mission_description,
            mission_startDate,
            mission_endDate
        } = data;
  
        try {
            // Find User
            let user = await models.User.findOne({ where: { user_email } }); 
            console.log('request user:', user);
            // If user does not exist, create new 
            if (!user) {
                let newUser = await models.User.create({
                    user_email,
                    user_firstname,
                    user_lastname,
                    user_function,
                    user_phone,
                    user_street, 
                    user_zipcode, 
                    user_city, 
                    user_country
                }); 
    
                console.log('request new User:', newUser);
                return newUser;
            }
  
            // 2. Create Mission
            let mission = await models.Mission.create({
                mission_company,
                mission_street,
                mission_zipcode,
                mission_city,
                mission_country,
                mission_contact_role,
                mission_contact_firstname,
                mission_contact_lastname,
                mission_contact_phone,
                mission_contact_email,
                mission_description,
                mission_startDate,
                mission_endDate
            });

            // 3. Create Request with associated User and Mission
            const newRequest = await models.Request.create({
                request_created_by: 'System',  
                request_created_at: new Date(),
                user_id: user.user_id,  
                mission_id: mission.mission_id,  
                request_status: 'En Attente',  // Default status
                request_comment: '', 
            });
  
            console.log('new Date : ', new Date())
            console.log("new request:", newRequest);
            return newRequest;
  
        } catch (error) {
            throw new Error(`Failed to create request: ${error.message}`);
        }
    }
  
    async find(query){
        const options = {
            include: [
                {
                    model: models.User,
                    as: 'user', // Ensure this matches the alias defined in the association
                    attributes: ['user_id', 'user_firstname', 'user_lastname', 'user_company', 'user_email', 'user_function', 'user_role', 'user_phone', 'user_street','user_zipcode', 'user_city','user_country']
                },
                {
                    model: models.Mission,
                    as: 'mission', // Ensure this matches the alias defined in the association
                    attributes: ['mission_id', 'mission_company', 'mission_city', 'mission_country', 'mission_contact_firstname', 'mission_contact_lastname', 'mission_description', 'mission_startDate', 'mission_endDate']
                }
            ],
            limit: 10,
            offset: 0
        };
    
        const { limit, offset } = query;
    
        if (limit !== undefined && offset !== undefined) {
            options.limit = parseInt(limit, 10);
            options.offset = parseInt(offset, 10);
        }
    
        const rows = await models.Request.findAll(options);
        return rows;
    }
      
    async findOne(id){
        const request = await models.Request.findByPk(id);
        if(!request) {
           throw boom.notFound('request not found');
        }
        return request;
    }

    async update(id, updateData) {
        const request = await models.Request.findByPk(id);
        if (!request) {
          throw new Error('Request not found');
        }
        await request.update(updateData);
        return request;
    }

    async delete(id){
        const request = await models.Request.findByPk(id);
        await request.destroy();
        return { id }
    }
}

module.exports = RequestService;