const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
    return (req, res, next) => {
      console.log('Schema:', schema);
      console.log('Schema Validate Method:', schema ? schema.validate : 'Schema not defined');
  
      if (!schema || typeof schema.validate !== 'function') {
        return next(boom.badImplementation('Invalid schema provided'));
      }
      
      const data = req[property];
      const { error } = schema.validate(data, { abortEarly: false });
      
      if (error) {
        return next(boom.badRequest(error));
      }
      
      next();
    };
  }
  
module.exports = validatorHandler;