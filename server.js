var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var morgan = require("morgan");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" })); //app.use(express.bodyParser());

//app.use(express.static(__dirname + "/client"));
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
app.post("/expense", (req, res, result) => {
  //console.log(req.body);
  let sql = `insert into expense(amount,datee,category) values ("${
    req.body.amount
  }","${req.body.datee}","${req.body.category}");`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log("added successfully");
    console.log(req.body);
  });
});

//get the expenses
app.get("/expense", (req, res) => {
  let sql = "SELECT * FROM expense";
  db.query(sql, (err, result) => {
    if (err) throw err;
    //ßconsole.log(result);
    res.send(result);
  });
});

//get the saved track
app.get("/track", (req, res) => {
  let sql = "SELECT category FROM expense";
  db.query(sql, (err, result) => {
    if (err) throw err;
    //ßconsole.log(result);
    res.send(result);
  });
});

//sum the whole total for the expenses
app.get("/total", (req, res) => {
  let sql = "SELECT sum(amount) FROM expense";
  db.query(sql, (err, result) => {
    if (err) throw err;
    //ßconsole.log(result);
    res.send(result);
  });
});

//select the date for the category
app.get("/date", (req, res) => {
  let sql = `SELECT datee FROM expense where category = "${req.body.category}"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    //ßconsole.log(result);
    res.send(result);
    console.log(result);
  });
});

//sum the whole total for the category
app.get("/subtotal", (req, res) => {
  let sql = `SELECT sum(amount) FROM expense where category = "${
    req.body.category
  }"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});

app.get("/", function(req, res) {
  res.send("hello world");
});

app.listen("3000", () => {
  console.log("server listeninig on port 3000");
});
