const { Router } =  require ("express");
const {getAllTempHandlers} = require("../handler/temperamentHandler");

const temperamentRouter= Router();

temperamentRouter.get("/", getAllTempHandlers);

module.exports = temperamentRouter;


