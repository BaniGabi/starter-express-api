//Imports
const { default: mongoose } = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes/productsRoutes");
const UserRoutes = require("./routes/UserRoutes");
const cartRoutes = require("./routes/cartRoutes");

//Create express app
const app = express();
const PORT = process.env.PORT | 5000;

//App Configuration
app.use(express.json());
app.use(cors());

//Connection to the cloud database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("medford db connected success ! "))
  .catch((err) => console.log(err));

//Routes configuration
app.use("/api", routes);
app.use("/api/auth", UserRoutes);
app.use("/api/cart", cartRoutes);

//Run server
app.listen(PORT, () => {
  console.log("medford server run on " + PORT);
});
