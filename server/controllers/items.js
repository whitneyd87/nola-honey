const Item = require("../models/item");

module.exports.index = async (req, res) => {
  try {
    const items = await Item.find({});
    res.send({ items: items });
  } catch (err) {
    console.error(err);
  }
};

module.exports.itemDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "_id",
        },
      })
      .populate("_id");
    res.send({ item: item });
  } catch (err) {
    console.error(err);
  }
};
