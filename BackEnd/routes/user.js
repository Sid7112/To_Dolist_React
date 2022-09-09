

const express = require("express");

const route = express.Router();

route.post("/",require("../controllers/user").createCategory);

route.get("/",require("../controllers/user").getAllCategory);

route.get("/:userID",require("../controllers/user").getCategory);

route.put("/:userID",require("../controllers/user").updateCategory);

route.delete("/:userID",require("../controllers/user").deleteCategory);

module.exports = route;