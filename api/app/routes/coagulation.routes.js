module.exports = app => {
    const coagulation = require("../controller/coagulation.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Coagulation
    router.post("/", coagulation.create);

    router.get("/",coagulation.test);
    router.get("/all",coagulation.findAll);

    app.use('/api/coagulation', router);
}