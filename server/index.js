//importing the node.js equipments.../
const express = require("express");
const mysql2 = require("mysql2");
const bodyparser = require("body-parser");
const cors = require("cors");
// refering ...
const app = express();

//middle ware
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));

// creating connection for database ..
const db = mysql2.createConnection({
  host: "localhost",
  user: "John",
  port: 2000,
  password: "Neymar.11",
  database: "devdb",
});

// this is used if error inthe database connection //
db.connect((error) => {
  if (!!error) {
    throw error;
  } else {
    console.log("Connected to DB");
  }
});

//here we can create routes //

// this is an inserting a details  api //
app.post("/api/insert", (req, res) => {
  const Name = req.body.Name;
  const Age = req.body.Age;
  const Phone = req.body.Phone;

  const sqlinsert = `INSERT INTO students(name,age,phone) VALUES(?,?,?)`;
  db.query(sqlinsert, [Name, Age, Phone]);
});

// this is an getting a details from sql //
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM students";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Editing the records
app.post("/api/edit", (req, res) => {
  try {
    const Id = req.body.Id;
    const Name = req.body.UPName;
    const Age = req.body.UPAge;
    const Phone = req.body.UPPhone;

    const update = `UPDATE students SET name='${Name}',age='${Age}',phone='${Phone}' WHERE id=${Id}`;
    db.query(update);
  } catch (err) {
    console.log(err);
  }
});

// deleting the records
app.post("/api/remove", (req, res) => {
  try {
    const Id = req.body.Id;
    const remove = `DELETE FROM students WHERE id=${Id}`;
    db.query(remove);
  } catch (err) {
    console.log(err);
  }
});
//listening to port//
const port = 3001;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
