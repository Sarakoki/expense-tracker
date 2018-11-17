var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
// var morgan = require("morgan");
// var path = require("path");
// var Sequelize = require("sequelize");
// var connect = require("connect");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(bodyParser.json({ "Content-Type": "application/json" }));
//application/vnd.api+json
// app.use(express.static(__dirname + "/client/src/"));
app.use(express.static(__dirname + "/node_modules"));

//create db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ExpensesTracker"
});

//connect to db
db.connect(err => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("mysql connected");
});

//add expense

app.post("/expense", (req, res) => {
  var data = [req.body.category, req.body.amount, req.body.datee];
  let sql = `INSERT INTO expense(amount,datee,category) values ("${
    req.body.amount
  }","${req.body.datee}","${req.body.category}");`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.setHeader("Access-Control-Allow-Origin", "*");
      // res.send(req.body.amount);
      console.log("added successfully");
    }
    console.log(req.body);
  });
});
//get the expenses
app.get("/expense", (req, res) => {
  let sql = "SELECT * FROM expense";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(result);
  });
});

app.get("/expense/:expenseID", (req, res) => {
  const id = req.params.expenseID;
  console.log(id);
  let sql = `SELECT * FROM expense `;
  db.query(sql, { _id: id }, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[id]);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(results[id]);
  });
});

//get the saved track
app.get("/track", (req, res) => {
  let sql = "SELECT category FROM expense";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(result);
  });
});

//sum the whole total for the expenses
app.get("/total", (req, res) => {
  let sql = "SELECT sum(amount) FROM expense";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(result);
  });
});

//select the date for the category
app.get("/date", (req, res) => {
  let sql = `SELECT datee FROM expense where category = "${req.body.category}"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(result);
    //console.log(result);
  });
});

//sum the whole total for the category
app.get("/subtotal/:total", (req, res) => {
  const id = req.params.total;
  let sql = `SELECT sum(amount) FROM expense where category = "${
    req.body.category
  }"`;
  db.query(sql, { _id: id }, (err, result) => {
    if (err) throw err;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(result);
    console.log(result);
  });
});

app.get("/", function(req, res) {
  res.render("/index.html");
});

app.listen("3000", () => {
  console.log("server listeninig on port 3000");
});
