//imports
const { Router } = require("express");
const {
  getDrugs,
  createDrug,
  updateDrug,
  deleteDrug,
} = require("../controllers/productController");

//Create route
const router = Router();

//Endpoints
router.get("/getAll", getDrugs);
router.post("/create", createDrug);
router.put("/update/:id", updateDrug);
//router.delete("/deletes/:id", deleteDrug);

//Make the route visible
module.exports = router;
