module.exports = app => {
    const rawwaterdata = require("../controller/rawwaterdata.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Coagulation
    router.post("/", rawwaterdata.create);

    router.get("/",rawwaterdata.test);
    router.get("/all",rawwaterdata.findAll);
    app.use('/api/rawwaterdata', router);
}