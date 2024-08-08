const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.admin = async (req, res) => {
  try {
    const tokens = req.cookies.token;
    if (tokens) {
      const tokenAd = jwt.verify(tokens, "nodejs");
      if (tokenAd) {
        res.render("admin");
      } else {
        alert("you dont have permission");
      }
    } else {
      alert("you dont have permission");
    }
  } catch (err) {
    res.status(400).json({ message: 'you dont have permission' });
  }
};

exports.registerForm = async (req, res) => {
  res.render("register");
};

exports.Register = async (req, res) => {
  try {
    var existEmail = await user.findOne({ email: req.body.email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already in used" });
    }
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await user.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    if (newUser) {
      console.log("Register Success");
      res.redirect("/loginform");
    }
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.apiRegister = async (req, res) => {
  try {
    var existEmail = await user.findOne({ email: req.body.email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already in used" });
    }
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await user.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Register Success!",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.loginForm = async (req, res) => {
  res.render("login");
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await user.findOne({ email });
    if (!users) {
      return res.status(404).json({ message: "Email or Password invalid!" });
    }
    const checkPass = await bcrypt.compare(password, users.password);
    console.log(checkPass);
    if (!checkPass) {
      return res.status(400).json({ message: "Email or Password invalid!" });
    }
    const token = jwt.sign({ id: users.id }, "nodejs", { expiresIn: "1h" });
    if (token) {
      res.cookie("token", token, { httpOnly: true });
      console.log("Login Success");
      res.redirect("/home");
    }
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.apiLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await user.findOne({ email });
    if (!users) {
      return res.status(404).json({ message: "Email or Password invalid!" });
    }
    const checkPass = await bcrypt.compare(password, users.password);
    console.log(checkPass);
    if (!checkPass) {
      return res.status(400).json({ message: "Email or Password invalid!" });
    }
    const token = jwt.sign({ id: users.id }, "nodejs", { expiresIn: "1h" });
    res.status(200).json({
      message: "Login Success!",
      token,
    });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/home");
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.apiListUser = async (req, res) => {
  try {
    const data = await user.find();
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.listUser = async (req, res) => {
  try {
    const data = await user.find();
    res.render("listUser", { pros: data });
  } catch (err) {
    res.render(err);
  }
};

exports.apiDeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await user.findByIdAndDelete(id);
    res.status(200).json({ data, message: "Delete Success" });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.deleteUser = async (req, res) => {
  var id = req.params.id;
  await user.findByIdAndDelete(id);
  res.redirect("/listUser");
};

exports.createUser = async (req, res) => {
  res.render("createUser");
};

exports.saveUser = async (req, res) => {
  try {
    var existEmail = await user.findOne({ email: req.body.email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already in used" });
    }
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await user.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    if (newUser) {
      console.log("Register Success");
      res.redirect("/listUser");
    }
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.apisaveUser = async (req, res) => {
  try {
    var existEmail = await user.findOne({ email: req.body.email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already in used" });
    }
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await user.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Register Success!",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await user.findById(id);
    res.render("editUser", { pros: data });
  } catch (err) {
    res.render(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    var existEmail = await user.findOne({ email: req.body.email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already in used" });
    }
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await user.findByIdAndUpdate(id, {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    if (newUser) {
      console.log("Update Success");
      res.redirect("/listUser");
    }
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.apiupdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    var existEmail = await user.findOne({ email: req.body.email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already in used" });
    }
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await user.findByIdAndUpdate(
      id,
      {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      },
      { new: true }
    );
    res.status(201).json({
      message: "Update Success!",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};
