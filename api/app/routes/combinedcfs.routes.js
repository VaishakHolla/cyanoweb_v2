module.exports = app => {
    const combinedcfs = require("../controller/combinedcfs.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Coagulation
    router.post("/", combinedcfs.create);

    router.get("/",combinedcfs.test);
    
    router.get("/all",combinedcfs.findAll);
    router.get("/find",combinedcfs.findOne)
    router.get("/delete",combinedcfs.delete);
    router.get("/deleteAll",combinedcfs.deleteAll);
    app.use('/api/combinedcfs', router);
}