var express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const db = require("./db");
const path = require("path");
const morgan = require("morgan");
// const Sequelize = require("sequelize");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(bodyParser.json({ "Content-Type": "application/json" }));
//application/vnd.api+json
app.use(express.static(__dirname + "/client/src/"));
app.use(express.static(__dirname + "/node_modules"));

// //create db
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "ExpensesTracker"
// });

// //connect to db
// db.connect(err => {
//   if (err) {
//     console.error("Error connecting: " + err.stack);
//     return;
//   }
//   console.log("mysql connected");
// });

//add expense
app.post("/expense", (req, res) => {
  let params = [req.body.category, req.body.amount, req.body.datee];
  console.log(params);
  let sql = `INSERT INTO expense (category,amount,datee) VAlUES ("${
    req.body.category
  }","${req.body.amount}","${req.body.datee}")`;
  let total;
  db.query(sql, params, function(err, results) {
    if (err) throw err;
    res.setHeader("Access-Control-Allow-Origin", "*");
    result = results;
  });

  let sql1 = "SELECT SUM(amount) FROM expense";
  db.query(sql1, function(err, results) {
    if (err) throw err;
    res.setHeader("Access-Control-Allow-Origin", "*");
    let x = JSON.stringify(results).split(":")[1];
    x = x.slice(0, -2);
    res.send(x);
  });
  // var { date, amount, category } = req.body;
  // db.Expense.create({
  //   category: category,
  //   date: date,
  //   amount: amount
  // })
  //   .then(function(expense) {
  //     res.setHeader("Access-Control-Allow-Origin", "*");
  //     res.send(expense);
  //     console.log(expense);
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   });
});

// var data = [req.body.category, req.body.amount, req.body.datee];
// let sql = `INSERT INTO expense(amount,datee,category) values ("${
//   req.body.amount
// }","${req.body.datee}","${req.body.category}");`;
// db.query(sql, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     // res.send(req.body.amount);
//     console.log("added successfully");
//   }
//   console.log(req.body);
// });
// });
//get the expenses
app.get("/expenses", (req, res) => {
  let sql = "SELECT SUM(amount) FROM expense";
  db.query(sql, (err, result) => {
    if (err) throw err;
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.send(result);
    res.setHeader("Access-Control-Allow-Origin", "*");
    let x = JSON.stringify(result).split(":")[1];
    console.log(result);
    x = x.slice(0, -2);
    res.send(x);
  });
  // db.expense.findAll().then(result => {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.json(result);
  // });
});

//get the saved track
// app.get("/track", (req, res) => {
//   let sql = "SELECT category FROM expense";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.send(result);
//   });
// });

//sum the whole total for the expenses
app.get("/total", (req, res) => {
  let sql = "SELECT * FROM expense";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(result);
  });
  // db.Expense.findAll().then(function(all) {
  //   var tot = 0;
  //   all.forEach(expense => {
  //     if (expense.amount) {
  //       tot += expense.amount;
  //     }
  //   });
  //   console.log(tot);
  //   res.json(tot);
  // });
  // db.Expense.sum("amount").then(sum => {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.json(sum);
  // });
});

//sum the whole total for the category
app.get("/subtotal/:category/:datee", (req, res) => {
  let months = {
    JAN: "01",
    FEB: "02",
    MAR: "03",
    APR: "04",
    MAY: "05",
    JUN: "06",
    JUL: "07",
    AUG: "08",
    SEP: "09",
    OCT: "10",
    NOV: "11",
    DEC: "12"
  };
  console.log(req.params.category, req.params.month);
  let category = req.params.category;
  let month = months[req.params.datee];
  let sql = mysql.format(
    `SELECT SUM(amount) from expense WHERE category = "${
      req.body.category
    }" AND MONTH(datee)="${req.body.datee}"`,
    [category, month]
  );
  db.query(sql, function(err, results) {
    if (err) throw err;
    res.setHeader("Access-Control-Allow-Origin", "*");
    let x = JSON.stringify(results).split(":")[1];
    x = x.slice(0, -2);
    res.send(x);
  });
  // db.Expense.sum("amount", {
  //   where: { category: req.params.category, date: req.params.date }
  // }).then(sum => {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.json(sum);
  // });
  // const id = req.params.total;
  // let sql = `SELECT sum(amount) FROM expense where category = "${
  //   req.body.category
  // }"`;
  // db.query(sql, { _id: id }, (err, result) => {
  //   if (err) throw err;
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.send(result);
  //   console.log(result);
  //});
});

app.get("/", function(req, res) {
  res.send("/index.html");
});

app.listen("3000", () => {
  console.log("server listeninig on port 3000");
});
