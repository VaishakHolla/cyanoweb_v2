const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.coagulation = require("./coagulation.model.js")(mongoose);
db.flocculation = require("./flocculation.model.js")(mongoose);
db.sedimentation = require("./sedimentation.model.js")(mongoose);
db.rawwaterdata = require("./rawwaterdata.model.js")(mongoose);

module.exports = db;