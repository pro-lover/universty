const path = require('path');
const db = require(path.join(__dirname, '../shared/db'));
const { Sequelize, Op } = require('sequelize');

module.exports = {
	getAll,
	getById,
	create,
	update,
	updateStatus,
	restore,
	delete: _delete
};

async function getAll() {

	//console.log('Getting all creativeexecutions');

    const models = await db.CreativeExecution.findAll({
		paranoid: false,
		order: [
			['description', 'ASC']
		]
	});

	models.forEach( function(prime) {
		prime.history = [];
	});

	//console.log('Getting all creativeExecutions', models);


    return models.map(x => basicDetails(x));
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
	if (await db.CreativeExecution.findOne({ where: {
		[Op.or]: [{name: params.name}, {description: params.description}]
		} }))
	{
		throw 'CreativeExecution already exists. Please provide a unique Name and CreativeExecution description.';
	}

    const model = new db.CreativeExecution(params);
	model.lastEditedBy = editId;
    // save model
    await model.save();

    return basicDetails(await getModelById(model.id));
}

async function update(id, params, editId) {
    const model = await getModelById(id);

	// validate (if name/shortname was changed)
	if (params.name && model.name == params.name && model.description == params.description ) {
		throw 'CreativeExecution hasn\'t been updated.';
	}
	// validate (if name/shortname is unique in db)
	if ( params.name && (model.name !== params.name) && await db.CreativeExecution.findOne({ where: { name: params.name } })) {
		throw 'CreativeExecution already exists.';
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
    const model = await db.CreativeExecution.findByPk(id, {
		paranoid: false,
		//lock: true,
		//transaction,
		/** /
		lock: {
			level: transaction.LOCK,
			of: db.CreativeExecution
		},
		/**/
	});
    if (!model) throw 'CreativeExecution not found';
    return model;
}

async function getHistory() {

	return [];

	const modelHistories = await db.sequelizeInstance.query(
		"SELECT * FROM `creativeExecutionHistories`",
		{
			type: db.sequelizeInstance.QueryTypes.SELECT
		}
	);

	return modelHistories;
}

async function getHistoryById(id) {

	return {};

	const modelHistories = await db.sequelizeInstance.query(
		"SELECT * FROM `creativeExecutionHistories` WHERE id = ?",
		{
			replacements: [id],
			type: db.sequelizeInstance.QueryTypes.SELECT
		}
	);

	return modelHistories;
}

function basicDetails(model) {
    const { id, name, description, status, created, updated, deletedAt, history, version, lastEditedBy} = model;
    return { id, name, description,  status, created, updated, deletedAt, history, version, lastEditedBy};
}
