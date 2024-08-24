const Sequelize = require('sequelize')

const dbname = "dbhr_system"
const dbuser = "root"
const dbpass = ""

const sequelize = new Sequelize(dbname, dbuser, dbpass, {
    host: "localhost",
    dialect: "mysql"
})


const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.jobs = require('../model/JobModel')(sequelize, Sequelize)
db.employee = require('../model/EmployeeModel')(sequelize, Sequelize)
db.region = require('../model/RegionModel')(sequelize, Sequelize)
db.countries = require('../model/CountryModel')(sequelize, Sequelize)
db.location = require('../model/LocationModel')(sequelize, Sequelize)
db.permission = require('../model/PermissionModel')(sequelize, Sequelize)
db.job_history = require('../model/JobHistoryModel')(sequelize, Sequelize)
db.card_employee = require('../model/CardEmployeeModel')(sequelize, Sequelize)
db.attandance = require("../model/AttandanceModel")(sequelize, Sequelize)
db.users = require('../model/UserModel')(sequelize, Sequelize)

db.jobs.hasMany(db.employee, {foreignKey: "job_id", as: "j_id"})
db.employee.belongsTo(db.jobs, {foreignKey: "job_id", as: "j_id"});



module.exports = db;
