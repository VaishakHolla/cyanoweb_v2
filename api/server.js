const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json())

var corsOptions = {
  origin: "http://localhost:3000"
};
console.log(process.env.CLIENT_ORIGIN,"CLIENT ORIGIN HERE")
app.use(cors(corsOptions));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Backend working." });
});


require("./app/routes/coagulation.routes")(app);
require("./app/routes/flocculation.routes")(app);
require("./app/routes/sedimentation.routes")(app);
require("./app/routes/rawwaterdata.routes")(app);
require("./app/routes/reccomendation.routes")(app);
require("./app/routes/combinedcfs.routes")(app);


// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});