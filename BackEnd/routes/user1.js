

const express = require("express");

const route = express.Router();

route.post("/",require("../controllers/user1").createTask);


route.get("/",require("../controllers/user1").getAllTask);


route.get("/:taskID",require("../controllers/user1").getTask);


route.put("/:taskID",require("../controllers/user1").updateTask);


route.delete("/:taskID",require("../controllers/user1").deleteTask);


module.exports = route;