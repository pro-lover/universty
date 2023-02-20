const express = require('express');
const router = express.Router();
const Joi = require('joi');
const path = require('path');

const validateRequest = require(path.join(__dirname, '../middleware/validate-request'));
const authorize = require(path.join(__dirname, '../middleware/authorize'));
const Role = require(path.join(__dirname, '../shared/role'));
const BriefProgress = require(path.join(__dirname, '../shared/briefProgress'));
const briefService = require(path.join(__dirname, '../services/brief.service'));

// routes
router.get('/', getAll);
router.get('/:id', authorize(), getById);

router.post('/', authorize([Role.Admin,Role.Client, Role.ProjectManager]), createSchema, create);
router.put('/:id/restore', authorize([Role.Admin,Role.Client, Role.ProjectManager]), restore);
router.put('/:id/update-status', authorize([Role.Admin,Role.Client, Role.ProjectManager]), updateStatusSchema, updateStatus);
router.put('/:id/update-brief-status', authorize([Role.Admin,Role.Client, Role.ProjectManager]), updateProgressStatusSchema, updateProgressStatus);
router.put('/:id', authorize([Role.Admin,Role.Client, Role.ProjectManager]), updateSchema, update);
router.delete('/:id', authorize([Role.Admin,Role.Client, Role.ProjectManager]), _delete);

module.exports = router;

function getAll(req, res, next) {
	briefService.getAll()
		.then(models => res.json(models))
		.catch(next);
}

function getById(req, res, next) {

	if ( Number(req.params.id) ) {
        briefService.getById(req.params.id)
			.then(model => model ? res.json(model) : res.sendStatus(404))
			.catch(next);
    } else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function createSchema(req, res, next) {
	const schema = Joi.object({
		offer: Joi.string().required(),
		objective: Joi.string().required(),
		business: Joi.string().required(),
		targetAudience: Joi.string().required(),
		targetAudienceInsight: Joi.string().required(),
		targetAudienceOuttake: Joi.string().required(),
		singleMindedThought: Joi.string().required(),
		brandTone: Joi.string().required(),
		budget: Joi.number().required(),
		deadlineTime: Joi.string().required(),
		deadlineDate: Joi.date().required(),
		briefphaseId: Joi.number().required(),
		creativeexecutionId: Joi.number().required(),
		brandKPIId: Joi.array().items(Joi.number()).required(),
		teamId: Joi.number().required(),

	});

	validateRequest(req, next, schema);
}

function create(req, res, next) {
	briefService.create(req.body, req.user.id)
		.then(model => res.json(model))
		.catch(next);
}

function updateSchema(req, res, next) {
	const schemaRules = {
		offer: Joi.string().required(),
		objective: Joi.string().required(),
		business: Joi.string().required(),
		targetAudience: Joi.string().required(),
		targetAudienceInsight: Joi.string().required(),
		targetAudienceOuttake: Joi.string().required(),
		singleMindedThought: Joi.string().required(),
		brandTone: Joi.string().required(),
		budget: Joi.number().required(),
		deadlineTime: Joi.string().required(),
		deadlineDate: Joi.date().required(),
		briefphaseId: Joi.number().required(),
		creativeexecutionId: number().required(),
		brandKPIId: Joi.array().items(Joi.number()).required(),
		teamId: Joi.number().required(),
	};
	if (req.user.role === Role.Admin) {
        schemaRules.role = Joi.string().valid(
			briefService.briefCreated,
			briefService.briefResolved,
			briefService.briefApproved,
			briefService.briefInProgress
		).empty('');
		}
	const schema = Joi.object(schemaRules)
	validateRequest(req, next, schema);
}

function update(req, res, next) {

	if ( Number(req.params.id) ) {
		briefService.update(req.params.id, req.body, req.user.id)
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
function updateProgressStatusSchema(req, res, next) {
	const schemaRules = Joi.object({
		role: Joi.string().required()
	});
	validateRequest(req, next, schemaRules);
}
function updateProgressStatus(req, res, next) {

	if ( Number(req.params.id) ) {
		briefService.updateProgressStatus(req.params.id, req.body, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function updateStatus(req, res, next) {

	if ( Number(req.params.id) ) {
		briefService.updateStatus(req.params.id, req.body, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function _delete(req, res, next) {

    if ( Number(req.params.id) ) {
        briefService.delete(req.params.id, req.user.id)
			.then(model => res.json(model))
			.catch(next);
    } else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function restore(req, res, next) {

	if ( Number(req.params.id) ) {
		briefService.restore(req.params.id, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}

}
// helper functions
