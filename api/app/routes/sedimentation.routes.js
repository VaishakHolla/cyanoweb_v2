module.exports = app => {
    const sedimentation = require("../controller/sedimentation.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Coagulation
    router.post("/", sedimentation.create);

    router.get("/",sedimentation.test);

    router.get("/all",sedimentation.findAll);
    router.get("/find",sedimentation.findOne);
    router.get("/delete",sedimentation.delete);
    router.get("/deleteAll",sedimentation.deleteAll);
    app.use('/api/sedimentation', router);
}