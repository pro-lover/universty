const path = require('path');
const config = require(path.join(__dirname, '../config.json'));
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const Temporal = require('sequelize-temporal');

module.exports = db = {};

initialize();

async function initialize() {

	const { host, port, user, password, database } = process.env.NODE_ENV === 'production' ? config.database.prod : config.database.local;

    //const { host, port, user, password, database } = config.database.local;

	// create db if it doesn't already exist

    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, {
		host: host,
  		port: port,
		dialect: 'mysql',
		logging: false
	});

	db.sequelizeInstance = sequelize;

	/**
	 * ACCESS ACCOUNTS MODEL
	 */
	// init models and add them to the exported db object
	db.Account = require('../models/account.model')(sequelize);

	db.RefreshToken = require('../models/refresh-token.model')(sequelize);

	// define relationships
	db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
	db.RefreshToken.belongsTo(db.Account);

	/**
	 * DATA MODEL - Emergency Contact
	 */
	db.Emergency = require('../models/emergency.model')(sequelize);

/**
	 * DATA MODEL - School Subject
	 */
	db.SchoolSubject = require('../models/school-subject.model')(sequelize);
	/**
	 * DATA MODEL - BRAND 
	 */
	db.Brand = require('../models/brand.model')(sequelize);
	/**
	 * DATA MODEL - BRIEF PHASE
	 */
	db.BriefPhase = require('../models/brief-phase.model')(sequelize);
	/**
	 * DATA MODEL - BRIEF
	 */
	db.Brief = require('../models/brief.model')(sequelize);
		/**
	 * DATA MODEL - SCHOOOL CERTIFICATE
	 */
	db.SchoolCertificate = require('../models/brief.model')(sequelize);
	/**
	 * DATA MODEL - CLIENT
	 */
	db.Client = require('../models/client.model')(sequelize);

	/**
	 * DATA MODEL - CREATIVE EXECUTION
	 */
	db.CreativeExecution = require('../models/creative-execution.model')(sequelize);
	/**
	 * DATA MODEL - CREATIVE
	 */
	db.Creative = require('../models/creative.model')(sequelize);
	/**
	 * DATA MODEL - JOB TITLE
	 */
	db.JobTitle = require('../models/job-title.model')(sequelize);
	/**
	 * DATA MODEL - JOB LEVEL
	 */
	 db.JobLevel = require('../models/job-level.model')(sequelize);
	/**
	 * DATA MODEL - TEAM
	 */
	db.Team = require('../models/team.model')(sequelize);

		//--[ define relationships ]--//

/**
	 * BRIEF
	 */
	db.Brief.belongsTo(db.BriefPhase, { onDelete: 'NO ACTION' });
	db.BriefPhase.hasMany(db.Brief);

	db.Brief.belongsTo(db.Client, { onDelete: 'NO ACTION' });
	db.Client.hasMany(db.Brief);

	db.Brief.belongsTo(db.CreativeExecution, { onDelete: 'NO ACTION' });
	db.CreativeExecution.hasMany(db.Brief);

	db.Brief.belongsToMany(db.Team, { through: 'briefTeam', onDelete: 'NO ACTION' });
	db.Team.belongsToMany(db.Brief, { through: 'briefTeam', onDelete: 'NO ACTION' });

	db.Brief.belongsToMany(db.SchoolSubject, { through: 'briefSchoolSubject', onDelete: 'NO ACTION' });
	db.SchoolSubject.belongsToMany(db.Brief, { through: 'briefSchoolSubject', onDelete: 'NO ACTION' });

	/**
	* BRIEF
	*/
   db.SchoolCertificate.belongsTo(db.BriefPhase, { onDelete: 'NO ACTION' });
   db.BriefPhase.hasMany(db.SchoolCertificate);

   db.SchoolCertificate.belongsTo(db.Client, { onDelete: 'NO ACTION' });
   db.Client.hasMany(db.SchoolCertificate);

   db.SchoolCertificate.belongsTo(db.CreativeExecution, { onDelete: 'NO ACTION' });
   db.CreativeExecution.hasMany(db.SchoolCertificate);

   db.SchoolCertificate.belongsToMany(db.Team, { through: 'briefTeam', onDelete: 'NO ACTION' });
   db.Team.belongsToMany(db.SchoolCertificate, { through: 'briefTeam', onDelete: 'NO ACTION' });

   db.SchoolCertificate.belongsToMany(db.SchoolSubject, { through: 'briefSchoolSubject', onDelete: 'NO ACTION' });
   db.SchoolSubject.belongsToMany(db.SchoolCertificate, { through: 'briefSchoolSubject', onDelete: 'NO ACTION' });
	/**
	 * CREATIVE
	 */
	db.Creative.belongsTo(db.Team, { onDelete: 'NO ACTION' });
	db.Team.hasMany(db.Creative);

	db.Creative.belongsTo(db.Account, { onDelete: 'NO ACTION' });
	db.Account.hasMany(db.Creative);

	db.Creative.belongsTo(db.JobLevel, { onDelete: 'NO ACTION' });
	db.JobLevel.hasMany(db.Creative);

	db.Creative.belongsTo(db.JobTitle, { onDelete: 'NO ACTION' });
	db.JobTitle.hasMany(db.Creative);

	/**
	 * CLIENT
	 */
	db.Client.belongsTo(db.Account, { onDelete: 'NO ACTION' });
	db.Account.hasMany(db.Client);

	db.Client.belongsTo(db.Brand, { onDelete: 'NO ACTION' });
	db.Brand.hasMany(db.Client);

	// sync all models with database
	await sequelize.sync();
	db.SchoolCertificate.sync({
		alter: {
			drop: false
		}
	}).catch(function(err){
		console.log(err);
	});
	// sync all models with database
	//await sequelize.sync();
	//db.Brief.sync({
	//	alter: {
	//		drop: false
	//	}
	//}).catch(function(err){
	//	console.log(err);
	//});
	// Version History Table
	/**/
	//Temporal(db.Account, sequelize);


	/** /
	await sequelize.sync({
		alter: {
			drop: false
		}
	}).catch(function(err){
		console.log(err);
	});
	db.Delegate.sync({
		alter: {
			drop: false
		}
	}).catch(function(err){
		console.log(err);
	});
	/**/
}
