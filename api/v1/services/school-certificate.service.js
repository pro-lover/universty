const path = require('path');
const db = require(path.join(__dirname, '../shared/db'));
const { Sequelize, Op } = require('sequelize');
const BriefProgress = require(path.join(__dirname, '../shared/briefProgress'));


module.exports = {
	getAll,
	getById,
	create,
	update,
	updateStatus,
	updateProgressStatus,
	restore,
	delete: _delete
};

async function getAll() {

	//console.log('Getting all schoolCertificates');

    const models = await db.SchoolCertificate.findAll({
		paranoid: false,
		order: [
			['name', 'ASC']
		],include:[
			{
				model: db.SchoolSubject,
				//as:'country',
				required:false,
			},
			{
				model: db.BriefPhase,
				//as:'office',
				required:false
			},{
				model: db.CreativeExecution,
				//as:'country',
				required:false,
			},
			{
				model: db.Client,
				//as:'country',
				required:false,
			},
			{
				model: db.Team,
				//as:'office',
				required:false
			},
			//{
			//	model: db.Client,
				//as:'office',
			//	required:false
			//},
		]
	});

	models.forEach( function(prime) {
		prime.history = [];
	});

	//console.log('Getting all schoolCertificates', models);

    return models.map(x => basicDetails(x));
	//return models;
}

async function getById(id) {
    const model = await getModelById(id);
	const modelHistory = await getHistoryById(id);

	if( modelHistory.length > 0 ) {
		model.history = modelHistory.filter( function (sub) {
			return sub.id === model.id;
		});
	} else {
		model.history = [];
	}

    return basicDetails(model);
}

async function create(params, editId) {
	// validate
	if (await db.SchoolCertificate.findOne({ where: { name: params.name } })) {
		throw 'name "' + params.name + '" already exists.';
	}

	let transaction;

	try {

		transaction = await db.sequelizeInstance.transaction();

		const model = await db.SchoolCertificate.create(
			{
				name: params.name,
				description: params.description,
				level: params.level,
				percentage: params.percentage,
				lastEditedBy: editId,
				role: "Created",
				briefphaseId: params.briefphaseId,
				creativeexecutionId: params.creativeexecutionId,
				clientId: editId,
				
			},
			{ transaction }
		);

		await model.setTeams(params.teamId, { transaction });
		await model.setSchoolSubjects(params.subjectId, { transaction });

		await transaction.commit();

		return getById(model.id);

	} catch (error) {

		//console.log('error:', error);

		if(transaction) {
			await transaction.rollback();
		}

		throw error;
	}
}

async function update(id, params, editId) {
    const model = await getModelById(id);

	// validate (if name/shortname was changed).
	if (params.name && model.name == params.name && model.description == params.description ) {
		throw 'SchoolCertificate hasn\'t been updated.';
	}
	// validate (if name/shortname is unique in db)
	if ( params.name && (model.name !== params.name) && await db.SchoolCertificate.findOne({ where: { name: params.name } })) {
		throw 'SchoolCertificate already exists.';
	}

    // copy params to model and save
    Object.assign(model, params);
    model.updated = Date.now();
	model.lastEditedBy = editId;
    await model.save();

    return basicDetails(model);
}

async function updateStatus(id, params, editId) {
	const model = await getModelById(id);

	model.status = params.status;
	model.updated = Date.now();
	model.lastEditedBy = editId;

	await model.save();

	return basicDetails(model);
}
async function updateProgressStatus(id, params, editId) {
	const model = await getModelById(id);

	model.role = params.role;
	model.updated = Date.now();
	model.lastEditedBy = editId;

	await model.save();

	return basicDetails(model);
}
async function _delete(id, editId) {
    const model = await getModelById(id);
	await model.update({updated: Date.now(), lastEditedBy: editId, status: false });
    await model.destroy();
	return basicDetails(model);
}

async function restore(id, editId) {
	const model = await getModelById(id);
	await model.restore();
	await model.update({lastEditedBy: editId, status: true });
	return basicDetails(model);
}

// helper functions

async function getModelById(id) {
	//const transaction = await db.sequelizeInstance.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED});
    const model = await db.SchoolCertificate.findByPk(id, {
		paranoid: false,
		//lock: true,
		//transaction,
		/** /
		lock: {
			level: transaction.LOCK,
			of: db.SchoolCertificate
		},
		/**/
	});
    if (!model) throw 'SchoolCertificate not found';
    return model;
}

async function getHistory() {

	return [];

	const modelHistories = await db.sequelizeInstance.query(
		"SELECT * FROM `briefHistories`",
		{
			type: db.sequelizeInstance.QueryTypes.SELECT
		}
	);

	return modelHistories;
}

async function getHistoryById(id) {

	return {};

	const modelHistories = await db.sequelizeInstance.query(
		"SELECT * FROM `briefHistories` WHERE id = ?",
		{
			replacements: [id],
			type: db.sequelizeInstance.QueryTypes.SELECT
		}
	);

	return modelHistories;
}

function basicDetails(model) {
    const { id, name, description, level, percentage, brandTone,role,status, created, updated, deletedAt, history, version, lastEditedBy,subjects,teams, briefphaseId,briefphase,creativeexecutionId,creativeexecution,clientId,client} = model;
    return { id, name, description, level, percentage, brandTone,role,status, created, updated, deletedAt, history, version,lastEditedBy,subjects,teams, briefphaseId,briefphase,creativeexecutionId,creativeexecution,clientId,client };
}
