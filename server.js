const express = require("express");
const path = require("path");
const hbs = require("hbs");  

const bodyParser = require("body-parser");  

const app = express();
const portNum = 8088;

const dramasRouter = require("./router/dramas");



app.engine("html" , hbs.__express);

app.set("views" , path.join(__dirname , "application" , "views" ));


app.use( express.static( path.join( __dirname , "application") ));

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({
  extended : false,   
  limit : "1mb",     
  parameterLimit : "10000" 
}));


app.get("/" , (req,res)=>{
  res.render("index.html");
});

app.use("/dramas",dramasRouter);



app.get("/about/us",(req,res)=>{
  res.render("aboutus.html");
});



app.get("/data",(req,res)=>{
  res.json({ name : "jeff" , age : 18 , message : "今天好冷喔～～～" });
});



app.listen(portNum , ()=>{
  console.log(`Server is running at localhost:${portNum}`);
});
