const express = require("express");
const app = new express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/list/:id", (req, res, next) => {
  res.render("list", { idSp: req.params.id, nameSp: "phone" });
});

app.get("/create/:id", (req, res, next) => {
  console.log(req.params);
  console.log(req.query);
  res.send("<h1>Create Page</h1>");
});

app.listen(port, () => {
  console.log("Sv chay o port " + port);
});
