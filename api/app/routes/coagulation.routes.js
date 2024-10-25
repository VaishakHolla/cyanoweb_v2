 module.exports = app => {
    const coagulation = require("../controller/coagulation.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Coagulation
    router.post("/", coagulation.create);

    router.get("/",coagulation.test);
    
    router.get("/all",coagulation.findAll);
    router.get("/find",coagulation.findOne)
    router.get("/delete",coagulation.delete);
    router.get("/deleteAll",coagulation.deleteAll);
    app.use('/api/coagulation', router);
}