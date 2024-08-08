const express = require("express");
const productController = require("./controllers/productController");
const authController = require("./controllers/authController");
const mongoose = require("mongoose");
var multer = require("multer");
const app = new express();
const port = 3000;
const cookieParser = require("cookie-parser");
const checkPermission = require("./validate/checkPermission");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
    ////Product
    //api
    app.get("/products", productController.apiGetList);
    //app.get("/create", productController.create);
    app.get("/products/:id", productController.apiGetDetail);
    app.post("/products",checkPermission, upload.single("image"), productController.apiSave);
    app.patch(
      "/products/:id",checkPermission,
      upload.single("image"),
      productController.apiUpdate
    );
    app.delete("/products/:id",checkPermission, productController.apiDelete);
    //render
    app.get("/list", productController.GetList);
    app.get("/home", productController.Home);
    app.get("/list/:id", productController.GetDetail);
    app.get("/edit/:id", productController.edit);
    app.get("/create", productController.create);
    app.post(
      "/save",
      
      upload.single("image"),
      productController.save
    );
    app.post(
      "/update/:id",
      
      upload.single("image"),
      productController.update
    );
    app.get("/delete/:id",  productController.delete);
    ////Auth
    //api
    app.post("/users/register", authController.apiRegister);
    app.post("/users/login", authController.apiLogin);
    //render
    app.get("/registerform", authController.registerForm);
    app.post("/register", authController.Register);
    app.get("/loginform", authController.loginForm);
    app.post("/login", authController.Login);
    app.get("/logout", authController.logOut);
    app.get("/listUser", authController.listUser);
    app.get("/admin", authController.admin);
    app.get("/deleteUser/:id", authController.deleteUser);
    app.get("/createUser", authController.createUser);
    app.post("/saveUser", authController.saveUser);
    app.get("/editUser/:id", authController.editUser);
    app.post("/updateUser/:id", authController.updateUser);

    app.listen(port, () => {
      console.log("Sv chay o port " + port);
    });
  })
  .catch((err) => {
    console.error(err);
  });
