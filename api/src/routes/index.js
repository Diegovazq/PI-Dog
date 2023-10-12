const { Router } = require("express");

const dogRouter = require("./dogRouter");
const temperamentRouter = require("./temperamentRouter");

const router = Router();

router.use("/dog", dogRouter);
router.use("/temperament", temperamentRouter);

module.exports = router;
