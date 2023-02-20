const express = require('express');
const router = express.Router();
const Joi = require('joi');
const path = require('path');

const validateRequest = require(path.join(__dirname, '../middleware/validate-request'));
const authorize = require(path.join(__dirname, '../middleware/authorize'));
const Role = require(path.join(__dirname, '../shared/role'));
const creativeService = require(path.join(__dirname, '../services/creative.service'));

// routes
router.get('/', getAll);
router.get('/:id', authorize(), getById);

router.post('/', authorize([Role.Admin, Role.ProjectManager]), createSchema, create);
router.put('/:id/restore', authorize([Role.Admin, Role.ProjectManager]), restore);
router.put('/:id/update-status', authorize([Role.Admin, Role.ProjectManager]), updateStatusSchema, updateStatus);
router.put('/:id', authorize([Role.Admin, Role.ProjectManager]), updateSchema, update);
router.delete('/:id', authorize([Role.Admin, Role.ProjectManager]), _delete);

module.exports = router;

function getAll(req, res, next) {
	creativeService.getAll()
		.then(models => res.json(models))
		.catch(next);
}

function getById(req, res, next) {

	if ( Number(req.params.id) ) {
        creativeService.getById(req.params.id)
			.then(model => model ? res.json(model) : res.sendStatus(404))
			.catch(next);
    } else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function createSchema(req, res, next) {
	const schema = Joi.object({
		description: Joi.string().required(),
		accountId: Joi.number().required(),
		joblevelId: Joi.number().required(),
		jobtitleId: Joi.number().required(),
		teamId: Joi.number().required(),
    });
	validateRequest(req, next, schema);
}

function create(req, res, next) {
	creativeService.create(req.body, req.user.id)
		.then(model => res.json(model))
		.catch(next);
}

function updateSchema(req, res, next) {
	const schemaRules = Joi.object({
		description: Joi.string().required(),
		accountId: Joi.number().required(),
		joblevelId: Joi.number().required(),
		jobtitleId: Joi.number().required(),
		teamId: Joi.number().required(),
	});
    validateRequest(req, next, schemaRules);
}

function update(req, res, next) {

	if ( Number(req.params.id) ) {
		creativeService.update(req.params.id, req.body, req.user.id)
			.then(model => res.json(model))
			.catch(next);
    } else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function updateStatusSchema(req, res, next) {
	const schemaRules = Joi.object({
		status: Joi.boolean().required()
	});
	validateRequest(req, next, schemaRules);
}

function updateStatus(req, res, next) {

	if ( Number(req.params.id) ) {
		creativeService.updateStatus(req.params.id, req.body, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function _delete(req, res, next) {

    if ( Number(req.params.id) ) {
        creativeService.delete(req.params.id, req.user.id)
			.then(model => res.json(model))
			.catch(next);
    } else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function restore(req, res, next) {

	if ( Number(req.params.id) ) {
		creativeService.restore(req.params.id, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}

}
// helper functions
