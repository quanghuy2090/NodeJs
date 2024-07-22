const express = require("express");
//ko can require tu express 4.16
//var bodyParser = require("body-parser");
const productController = require("./controllers/productController");
const mongoose = require("mongoose");
var multer = require("multer");
var fs = require("fs");
const app = new express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); //quan trong
  },
});

const upload = multer({ storage: storage });

mongoose
  .connect("mongodb://localhost:27017/nodejs-db")
  .then((result) => {
    app.get("/list", productController.getList);
    app.get("/create", productController.create);
    app.get("/edit/:id", productController.getDetail);
    app.post("/save",upload.single('image'), productController.save);
    app.put("/update/:id",upload.single('image'), productController.update);
    app.delete("/delete/:id", productController.delete);
        app.listen(port, () => {
      console.log("Sv chay o port " + port);
    });
  })
  .catch((err) => {
    console.error(err);
  });
