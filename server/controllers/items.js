const Item = require("../models/item");

module.exports.index = async (req, res) => {
  const items = await Item.find({});
  res.send({ items: items });
};

module.exports.itemDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    res.send({ item: item });
  } catch (err) {
    console.error(err);
  }
};
