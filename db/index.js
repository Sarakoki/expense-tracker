// var Sequelize = require("sequelize");
// var sequelize = new Sequelize("ExpensesTracker", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
//   operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch(err => {
//     console.error("Unable to connect to the database:", err);
//   });

// // we define the models we need using js--we don't need a schema file!
// var Expense = sequelize.define("expense", {
//   category: Sequelize.STRING,
//   date: Sequelize.DATE,
//   amount: Sequelize.INTEGER
// });

// // Expense.sync({ force: true });

// exports.Expense = Expense;

var mysql = require("mysql");

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

module.exports = db;
