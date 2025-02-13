const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class DocumentService {
    constructor(){
        this.documents = [];
    }

    async create(data){
        const newDocument = await models.Document.create(data)
        return newDocument;
    }

    async find(query){
        const options = {
            include: ['candidate'], 
            limit: 5,
            offset: 0
        }
        const { limit, offset } = query;

        if (limit !== undefined && offset !== undefined) {
            options.limit = parseInt(limit, 10);
            options.offset = parseInt(offset, 10);
        }
        const rows = await models.Document.findAll(options);
        return rows;
    }

    async findOne(id){
        const document = await models.Document.findByPk(id);
        if(!document) {
            throw boom.notFound('document not found');
        }
        return document;
    }

    async update(id, updateData){
        const document = await models.Document.findByPk(id);
        if (!document) {
          throw new Error('Document not found');
        }
        await document.update(updateData);
        return document;
    }

    async delete(id){
        const document = await models.Document.findByPk(id);
        await document.destroy();
        return { id }
    }
}

module.exports = DocumentService;