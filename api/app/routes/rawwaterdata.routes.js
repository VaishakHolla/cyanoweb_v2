module.exports = app => {
    const rawwaterdata = require("../controller/rawwaterdata.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Coagulation
    router.post("/", rawwaterdata.create);

    router.get("/",rawwaterdata.test);
    router.get("/all",rawwaterdata.findAll);
    router.get("/delete",rawwaterdata.delete);
    router.get("/deleteAll",rawwaterdata.deleteAll);
    app.use('/api/rawwaterdata', router);
}