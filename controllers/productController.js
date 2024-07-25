const product = require("../models/productModel");

exports.getList = async (req, res) => {
  try {
    const data = await product.find();
    res.render("list", { pros: data });
  } catch (err) {
    console.error(err);
  }
};

exports.getDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await product.findById(id);
    res.render(`edit`, { pros: data });
  } catch (err) {
    console.error(err);
  }
};

exports.create = (req, res) => {
  res.render("create");
};

exports.save = async (req, res) => {
  var newPro = {
    name: req.body.name,
    price: req.body.price,
    image: req.file.filename,
  };
  try {
    var products = await product.create(newPro);
    if (products) {
      console.log("Add Product Successfully!");
      res.redirect("/list");
    }
  } catch (err) {
    console.error(err);
    return res.render('create', { error: 'Failed to add product' });
  }
};

exports.update = async (req, res) => {
  var editPro = {
    name: req.body.name,
    price: req.body.price,
    image: req.file.filename,
  };
  const id = req.params.id;
  var data = await product.findByIdAndUpdate(id, editPro);
  if (data) {
    console.log("Update Successfully!");
    res.redirect("/list");
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await product.findByIdAndDelete(id);
  res.redirect("/list");
};
