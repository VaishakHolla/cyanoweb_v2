module.exports = app => {
    const flocculation = require("../controller/flocculation.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Coagulation
    router.post("/", flocculation.create);

    router.get("/",flocculation.test);

    router.get("/all",flocculation.findAll);
    router.get("/find",flocculation.findOne);
    router.get("/delete",flocculation.delete);
    router.get("/deleteAll",flocculation.deleteAll);
    app.use('/api/flocculation', router);
}