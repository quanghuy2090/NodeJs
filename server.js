const express = require("express") 
const app = new express();
const port = 3000;

app.get("/", (req,res,next)=>{
    res.send("<h1>List Page</h1>")
});

app.get("/create", (req,res,next)=>{
    res.send("<h1>Create Page</h1>")
});

app.listen(port, ()=>{
    console.log("Sv chay o port " + port);
})