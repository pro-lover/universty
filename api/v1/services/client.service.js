const path = require('path');
const db = require(path.join(__dirname, '../shared/db'));
const { Sequelize, Op } = require('sequelize');
const { first } = require('underscore');

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

	//console.log('Getting all clients');

    const models = await db.Client.findAll({ // no working
		paranoid: false,
		order: [
			['description', 'ASC']
		],include:[
			{
				model: db.Account,
				//as:'country',
				required:true,
				attribute:[ // ________________________note to do
					"firtName",
					"lastName",
					"email",
				]
			},
			{
				model: db.Brand,
				//as:'office',
				required:false
			},
		]
	});

	models.forEach( function(prime) {
		prime.history = [];
	});

	//console.log('Getting all clients', models);


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
	if (await db.Client.findOne({ where: {
		accountId: params.accountId,
		brandId: params.brandId
		} }))
	{
		throw 'Client already exists. Please provide a unique Name and client description.';
	}

    const model = new db.Client(params);
	model.lastEditedBy = editId;
    // save model
    await model.save();

    return basicDetails(await getModelById(model.id));
}

async function update(id, params, editId) {
    const model = await getModelById(id);
	// validate (if name/shortname was changed)
	if (params.description && model.description == params.description && model.description == params.description ) {
		throw 'Client hasn\'t been updated.';
	}
	// validate (if name/shortname is unique in db)
	if ( params.description && (model.description !== params.description) && await db.Client.findOne({ where: { description: params.description } })) {
		throw 'Client already exists.';
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
    const model = await db.Client.findByPk(id, {
		paranoid: false,
		include:[
			{
				model: db.Account,
				//as:'country',
				required:false
			},
			{
				model: db.Brand,
				//as:'office',
				required:false
			},
		]
	});
    if (!model) throw 'Client not found';
    return model;
}

async function getHistory() {

	return [];

	const modelHistories = await db.sequelizeInstance.query(
		"SELECT * FROM `clientHistories`",
		{
			type: db.sequelizeInstance.QueryTypes.SELECT
		}
	);

	return modelHistories;
}

async function getHistoryById(id) {

	return {};

	const modelHistories = await db.sequelizeInstance.query(
		"SELECT * FROM `clientHistories` WHERE id = ?",
		{
			replacements: [id],
			type: db.sequelizeInstance.QueryTypes.SELECT
		}
	);

	return modelHistories;
}

function basicDetails(model) {
    const { id, description, status, created, updated, deletedAt, history, version, lastEditedBy,brandId,brand,accountId,account } = model;
    return { id, description,  status, created, updated, deletedAt, history, version, lastEditedBy,brandId,brand,accountId,account };
}
