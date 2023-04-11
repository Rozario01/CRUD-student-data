//importing the node.js equipments.../
const express = require('express');
const mysql = require("mysql");
const bodyparser =require("body-parser")
const cors =require('cors')
// refering ...
const app= express();

//middle ware
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));


// creating connection for database ..

const db = mysql.createConnection({
    
    host:"localhost",
    user: "rozo",
    Port: 3306,
    password:"password",
    database:"devdb",
    
})

// this is used if error inthe database connection //
db.connect((error)=>{
    if(!!error){
        throw error
    }
    else
    {
        console.log('Connected to DB')
    }
})


//here we can create routes //







// this is an inserting a details  api //
app.post("/api/insert",(req,res)=>{

   const Name = req.body.Name
   const Age = req.body.Age

    const sqlinsert =`INSERT INTO students(name,age) VALUES(?,?)`
    db.query(sqlinsert,[Name,Age])
})

// this is an getting a details from sql //
app.get("/api/get",(req,res)=>{
    const sqlSelect ="SELECT * FROM students"
    db.query(sqlSelect,(err,result)=>{
        if(err)
        {
            res.send(err)
        }
        else{
            res.send(result)
        }
        
    })
})
   




//listening to port//
const port =3001
app.listen(port,()=>{
    console.log(`running on port ${port}` )
})