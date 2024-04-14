const express = require("express");
const fs = require("fs");
const router = express.Router();

let readFilePromise = (dataPath)=>{
  return new Promise( (resolve , reject) =>{
    fs.readFile(dataPath,"utf8" , (err,data)=>{
      if(err) reject(err);
      else resolve( JSON.parse(data) );
    });
  });
};


router.get("/page" , (req,res)=>{
  res.render("dramas.html");
}); 


router.get("/list" , async (req,res)=>{   
  try {
    let data = await readFilePromise("models/sample2.json");
    let type = req.query.type;

    if( type === "全"){
      res.json({ result : data });
    }else{
      let filteredData = data.filter( ele => ele["category"] === type );
      res.json({ result : filteredData });
    };

  } catch (err){
    console.log(err);
    res.status(500).json({ message: "系統有問題！"});
  };
});



router.post("/data" , async (req,res) =>{  
  try{
    let payload = req.body;
    console.log(payload["category"]);
    console.log(payload["name"]);

    let data = await readFilePromise("models/sample2.json");
    data.push(req.body);

    fs.writeFileSync("models/sample2.json", JSON.stringify(data) , "utf8");

    res.json({message : "ok."});
  } catch(err){
    console.log(err);
    res.status(500).json({ message : "系統有問題！"});
  };
});

module.exports = router;