module.exports = app => {
    const reccomendation = require("../controller/reccomendation.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Coagulation
    router.get("/search",reccomendation.search);
}