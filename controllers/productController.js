const DrugModel = require("../models/ProductModels");
const UserModel = require("../models/UsersModels");

module.exports.getDrugs = async (req, res) => {
  const createdBy = req.user; // Assuming user information is stored in the req.user property

  const drugs = await DrugModel.find({ createdBy });
  res.send(drugs);
};

module.exports.createDrug = async (req, res) => {
  try {
    const { drugName, manufacturer, quantity, sku, price } = req.body;
    const userId = req.headers.userId; // Assuming user information is stored in the req.user property

    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const drug = new DrugModel({
      drugName,
      manufacturer,
      quantity,
      sku,
      price,
      createdBy: userId,
    });

    const createdDrug = await drug.save();
    console.log("Drug saved successfully...");

    // Add the product to the user's cart
    const { productId, quantity: cartQuantity } = req.body;

    // Check if the product exists in the cart
    const cartItem = await CartModel.findOne({
      user: userId,
      product: productId,
    });

    if (cartItem) {
      // Product already exists in the cart, update the quantity
      cartItem.quantity += cartQuantity;
      await cartItem.save();
      console.log("Product quantity updated in the cart:", cartItem);
    } else {
      // Product doesn't exist in the cart, create a new cart item
      const newCartItem = new CartModel({
        user: userId,
        product: productId,
        quantity: cartQuantity,
      });
      await newCartItem.save();
      console.log("Product added to the cart:", newCartItem);
    }

    res.status(201).json(createdDrug);
  } catch (error) {
    console.error("Error creating drug:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.updateDrug = async (req, res) => {
  const { id } = req.params;
  const { drugName, manufacturer, quantity, sku, price } = req.body;

  DrugModel.findByIdAndUpdate(id, {
    drugName,
    manufacturer,
    quantity,
    sku,
    price,
  })
    .then(() => {
      console.log("updated successfully...");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "something went wrong" });
    });
};

module.exports.deleteDrug = async (req, res) => {
  const { id } = req.params;

  DrugModel.findByIdAndDelete(id)
    .then(() => {
      console.log("delleted drug successfully...");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "something went wrong" });
    });
};
