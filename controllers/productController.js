const product = require("../models/productModel");

exports.apiGetList = async (req, res) => {
  try {
    const data = await product.find();
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.GetList = async (req, res) => {
  try {
    const data = await product.find();
    res.render("list", { pros: data });
  } catch (err) {
    res.render(err);
  }
};

exports.Home = async (req, res) => {
  try {
    const data = await product.find();
    res.render("home", { pros: data });
  } catch (err) {
    res.render(err);
  }
};

exports.apiGetDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await product.findById(id);
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.GetDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await product.findById(id);
    res.render("detail", { pros: data });
  } catch (err) {
    res.render(err);
  }
};

exports.create = (req, res) => {
  res.render("create");
};

exports.apiSave = async (req, res) => {
  try {
    var newPro = {
      name: req.body.name,
      price: req.body.price,
      image: req.file.filename,
    };
    var data = await product.create(newPro);
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.save = async (req, res) => {
  try {
    var newPro = {
      name: req.body.name,
      price: req.body.price,
      image: req.file.filename,
    };
    var products = await product.create(newPro);
    if (products) {
      console.log("create successfully");
      res.redirect("/list");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.apiUpdate = async (req, res) => {
  try {
    var editPro = {
      name: req.body.name,
      price: req.body.price,
      image: req.file.filename,
    };
    const id = req.params.id;
    var data = await product.findByIdAndUpdate(id, editPro, { new: true });
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await product.findById(id);
    res.render("edit", { pros: data });
  } catch (err) {
    res.render(err);
  }
};

exports.update = async (req, res) => {
  try {
    var editPro = {
      name: req.body.name,
      price: req.body.price,
      image: req.file.filename,
    };
    const id = req.params.id;
    var data = await product.findByIdAndUpdate(id, editPro);
    if (product) {
      console.log("update successfully");
      res.redirect("/list");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.apiDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await product.findByIdAndDelete(id);
    res.status(200).json({ data, message: "Delete Success" });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.delete = async (req, res) => {
  var id = req.params.id;
  await product.findByIdAndDelete(id);
  res.redirect("/list");
};
