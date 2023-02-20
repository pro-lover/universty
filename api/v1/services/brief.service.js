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

	//console.log('Getting all briefs');

    const models = await db.Brief.findAll({
		paranoid: false,
		order: [
			['offer', 'ASC']
		],include:[
			{
				model: db.BrandKPI,
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

	//console.log('Getting all briefs', models);

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
	if (await db.Brief.findOne({ where: { offer: params.offer } })) {
		throw 'offer "' + params.offer + '" already exists.';
	}

	let transaction;

	try {

		transaction = await db.sequelizeInstance.transaction();

		const model = await db.Brief.create(
			{
				offer: params.offer,
				objective: params.objective,
				business: params.business,
				targetAudience: params.targetAudience,
				targetAudienceInsight: params.targetAudienceInsight,
				targetAudienceOuttake: params.targetAudienceOuttake,
				singleMindedThought: params.singleMindedThought,
				brandTone: params.brandTone,
				budget: params.budget,
				deadlineDate: params.deadlineDate,
				deadlineTime: params.deadlineTime,
				lastEditedBy: editId,
				role: "Created",
				briefphaseId: params.briefphaseId,
				creativeexecutionId: params.creativeexecutionId,
				clientId: editId,
				
			},
			{ transaction }
		);

		await model.setTeams(params.teamId, { transaction });
		await model.setBrandKPIs(params.brandKPIId, { transaction });

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

	// validate (if offer/shortname was changed).
	if (params.offer && model.offer == params.offer && model.objective == params.objective ) {
		throw 'Brief hasn\'t been updated.';
	}
	// validate (if offer/shortname is unique in db)
	if ( params.offer && (model.offer !== params.offer) && await db.Brief.findOne({ where: { offer: params.offer } })) {
		throw 'Brief already exists.';
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
    const model = await db.Brief.findByPk(id, {
		paranoid: false,
		//lock: true,
		//transaction,
		/** /
		lock: {
			level: transaction.LOCK,
			of: db.Brief
		},
		/**/
	});
    if (!model) throw 'Brief not found';
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
    const { id, offer, objective, business, targetAudience, targetAudienceInsight, targetAudienceOuttake, singleMindedThought, brandTone, budget, deadlineDate,deadlineTime,role,status, created, updated, deletedAt, history, version, lastEditedBy,brandKPIs,teams, briefphaseId,briefphase,creativeexecutionId,creativeexecution,clientId,client} = model;
    return { id, offer, objective, business, targetAudience, targetAudienceInsight, targetAudienceOuttake, singleMindedThought, brandTone, budget, deadlineDate,deadlineTime,role,status, created, updated, deletedAt, history, version,lastEditedBy,brandKPIs,teams, briefphaseId,briefphase,creativeexecutionId,creativeexecution,clientId,client };
}
