const express = require("express");
//ko can require tu express 4.16
//var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs");
var mysql = require("mysql");
const app = new express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs-db",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); //quan trong
  },
});

const upload = multer({ storage: storage });

app.get("/list", (req, res, next) => {
  let sql = "SELECT * FROM product"; //khai báo câu truy vấn
  db.query(sql, (err, data) => {
    //thực thi câu truy vấn
    if (err) throw err;
    res.render("list", { pros: data }); //trả data về giao diện list.ejs
  });
});

app.get("/create", (req, res, next) => {
  res.render("create");
});

// app.post("/upload", upload.single("image"), (req, res) => {

// });

app.get("/delete", (req, res) => {
  var img = req.query.img;
  console.log(img);
  if (img) {
    fs.unlink(`public/images/${img}`, (err, data) => {
      if (err) throw err;
      console.log("file deleted");
    });
  }
});

app.get("/tinh", (req, res, next) => {
  res.render("tinh");
});

app.post("/save", upload.single("image"), (req, res) => {
  var newProduct = {
    name: req.body.name,
    price: req.body.price,
    image: req.file.filename,
  };

  db.query("INSERT INTO product SET ?", newProduct, (err, data) => {
    if (err) throw err;
    console.log("Create successfully");
    res.redirect("/list");
  });
  console.log(req.body);
  // const b = req.body.thamSoB;
  // const a = req.body.thamSoA;
  // const c = req.body.thamSo;
  // if(a==0){
  //   if (b==0) {
  //     if (c==0) {
  //       console.log("PT vo so nghiem")
  //     }
  //     else{
  //       console.log("PT vo nghiem")
  //     }
  //   }
  //   else{
  //     console.log(`PT co nghiem la x = ${-c/b}`)
  //   }
  // }
  // else{
  //   const del = b*b - 4*a*c;
  //   if (del<0) {
  //     console.log("PT vo nghiem");
  //   }else if(del ==0){
  //     const x = -b%(a*a)
  //     console.log(`PT co nghiem la x = ${x}`);
  //   }else if(del>0){
  //     const x1 = (-b+Math.sqrt(del))%(2*a);
  //     const x2 = (-b-Math.sqrt(del))%(2*a);
  //     console.log(`PT co 2 nghiem la x1 = ${x1}, x2 = ${x2}`);
  //   }
  // }
});

app.get('/edit/:id', (req,res) => {
  var id = req.params.id;
  db.query('SELECT * FROM product WHERE id=?',id, (err,data) => {
      if (err) throw err
      res.render('edit', { product: data[0]});
  })
})


app.listen(port, () => {
  console.log("Sv chay o port " + port);
});
