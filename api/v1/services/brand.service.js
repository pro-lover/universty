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

	console.log('Getting all brands');

    const models = await db.Brand.findAll({
		paranoid: false,
		order: [
			['name', 'ASC']
		],
	});

	models.forEach( function(prime) {
		prime.history = [];
	});

	//console.log('Getting all brands', models);


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
	if (await db.Brand.findOne({ where: {
		[Op.or]: [{name: params.name}, {description: params.description}]
		} }))
	{
		throw 'Brand already exists. Please provide a unique Name and Brand description.';
	}

    const model = new db.Brand(params);
	model.lastEditedBy = editId;
    // save model
    await model.save();

    return basicDetails(await getModelById(model.id));
}

async function update(id, params, editId) {
    const model = await getModelById(id);

	// validate (if name/shortname was changed)
	if (params.name && model.name == params.name && model.description == params.description ) {
		throw 'Brand hasn\'t been updated.';
	}
	// validate (if name/shortname is unique in db)
	if ( params.name && (model.name !== params.name) && await db.Brand.findOne({ where: { name: params.name } })) {
		throw 'Brand already exists.';
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
    const model = await db.Brand.findByPk(id, {
		paranoid: false,
		//lock: true,
		//transaction,
		/** /
		lock: {
			level: transaction.LOCK,
			of: db.Brand
		},
		/**/
	});
    if (!model) throw 'Brand not found';
    return model;
}

async function getHistory() {

	return [];

	const modelHistories = await db.sequelizeInstance.query(
		"SELECT * FROM `brandHistories`",
		{
			type: db.sequelizeInstance.QueryTypes.SELECT
		}
	);

	return modelHistories;
}

async function getHistoryById(id) {

	return {};

	const modelHistories = await db.sequelizeInstance.query(
		"SELECT * FROM `brandHistories` WHERE id = ?",
		{
			replacements: [id],
			type: db.sequelizeInstance.QueryTypes.SELECT
		}
	);

	return modelHistories;
}

function basicDetails(model) {
    const { id, name, description,numberOfAvailableSlots, status, created, updated, deletedAt, history, version, lastEditedBy,accountId,brandId } = model;
    return { id, name, description,numberOfAvailableSlots,  status, created, updated, deletedAt, history, version, lastEditedBy,accountId,brandId };
}
