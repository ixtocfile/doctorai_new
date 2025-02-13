const { Candidate, CandidateSchema } = require('./candidate.model');
const { Document, DocumentSchema } = require('./document.model');
const { Mission, MissionSchema } = require('./mission.model');
const { Request, RequestSchema } = require('./request.model');
const { Patient, PatientSchema } = require('./patient.model');
const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
    Candidate.init(CandidateSchema, Candidate.config(sequelize));
    Document.init(DocumentSchema, Document.config(sequelize));
    Mission.init(MissionSchema, Mission.config(sequelize));
    Request.init(RequestSchema, Request.config(sequelize));
    Patient.init(PatientSchema, Patient.config(sequelize));
    User.init(UserSchema, User.config(sequelize));

    Request.associate(sequelize.models);
    Document.associate(sequelize.models);
    Candidate.associate(sequelize.models);
    User.associate(sequelize.models);   // Add User associations
    Mission.associate(sequelize.models);  // Add Mission associations
}

module.exports = setupModels;