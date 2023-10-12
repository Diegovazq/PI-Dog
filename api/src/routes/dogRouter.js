const { Router } = require("express");
const {
  getAllDogsHandler,
  getDogByNameHandler,
  getDogByIDHandler,
  createNewDogHandler,
 deleteDogHandler,

} = require("../handler/dogHandler");

const dogRouter = Router();

dogRouter.get("/", getAllDogsHandler);
dogRouter.get("/name/:name",getDogByNameHandler);
dogRouter.get("/:idRaza", getDogByIDHandler); 
dogRouter.post("/", createNewDogHandler); 
dogRouter.delete("/:id",deleteDogHandler);


module.exports = dogRouter;