const mongoose = require("mongoose");
const { sizes } = require("./inventoryHelper");
const Item = require("../models/item");
const inventory = require("./inventory");

mongoose.connect("mongodb://localhost:27017/nola-honey", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Item.deleteMany({});
  for (let i = 0; i < inventory.length; i++) {
    let itemInventory;
    let item = inventory[i];
    const quantity = Math.floor(Math.random() * 20) + 10;
    if (item.itemType !== "T-Shirt") {
      itemInventory = [{ quantity }];
    } else {
      itemInventory = sizes.map((size) => ({
        size,
        quantity: Math.floor(Math.random() * 20) + 10,
      }));
    }
    const newItem = new Item({
      title: item.title,
      category: item.category,
      department: item.department,
      itemType: item.itemType,
      description: item.description,
      image: item.image,
      price: item.price,
      inventory: itemInventory,
    });
    await newItem.save();
  }
  console.log("DataBase seeded!");
};

seedDB();
