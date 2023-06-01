// cartRoutes.js
const { Router } = require("express");
const {
  addToCart,
  getProductsCart,
  deleteCart,
} = require("../controllers/cartController");
const { sendEmail } = require("../services/email.notification");
const router = Router();

router.post("/addToCart", addToCart);
router.get("/getCart", getProductsCart);
router.delete("/delete/:id", deleteCart);
router.post("/send-email", sendEmail);

module.exports = router;
