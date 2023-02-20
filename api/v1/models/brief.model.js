const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
	const attributes = {
		offer: { type: DataTypes.STRING, allowNull: false },
		objective: { type: DataTypes.STRING, allowNull: false },
		business: { type: DataTypes.STRING, allowNull: false },
		targetAudience: { type: DataTypes.STRING, allowNull: false },
		targetAudienceInsight: { type: DataTypes.STRING, allowNull: false },
		targetAudienceOuttake: { type: DataTypes.STRING, allowNull: false },
		singleMindedThought: { type: DataTypes.STRING, allowNull: false },
		brandTone: { type: DataTypes.STRING, allowNull: false },
		budget: { type: DataTypes.FLOAT, allowNull: false },
		role: { type: DataTypes.STRING, allowNull: false, defaultValue: "Created" },
		deadlineTime: { type: DataTypes.TIME, allowNull: true },
		deadlineDate: { type: DataTypes.DATEONLY, allowNull: true },
		status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
		lastEditedBy: { type: DataTypes.INTEGER, allowNull: true }
	};

	const options = {
		//
		// disable default timestamp fields (createdAt and updatedAt)
		timestamps: true,
		createdAt: 'created',
		updatedAt: 'updated',
		// don't delete database entries but set the newly added attribute deletedAt
		// to the current date (when deletion was done). paranoid will only work if
		// timestamps are enabled
		paranoid: true,
		// Enable optimistic locking.  When enabled, sequelize will add a version count attribute
		// to the model and throw an OptimisticLockingError error when stale instances are saved.
		// Set to true or a string with the attribute name you want to use to enable.
		version: true
	};

	return sequelize.define('brief', attributes, options);
}
