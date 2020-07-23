
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

// create the connection for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "employees_db"
});

// connect to mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  start();
});

// difference between mysql server and sql database?

function start() {
  inquirer
    .prompt({
      name: "",
      type: "",
      message: "",
      choices: [
        "Add departments",
        "Add roles",
        "Add employees",
        "View departments",
        "View roles",
        "View employees",
        "View employees by manager",
        "Delete departments",
        "Delete roles",
        "Delete employees",
        "Update employee roles",
        "Update employee managers",
        "View the total utilized budget of a department",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Add departments": 
        addDepartments();
        break;

        case "Add roles":
        addRoles();
        break;

        case "Add employees":
        addEmployees();
        break;

        case "View departments":
        viewDepartments();
        break;

        case "View roles":
        viewRoles();
        break;

        case "View employees":
        viewEmployees();
        break;

        case "View employees by manager":
        viewEmployeesByManager();
        break;

        case "Delete departments":
        deleteDepartments();
        break;
        
        case "Delete roles":
        deleteRoles();
        break;

        case "Delete employees":
        deleteEmployees();
        break;

        case "Update employee roles":
        updateEmployeesRoles();
        break;

        case "Update employee managers":
        updateEmployeeManagers();
        break;

        case "View the total utilized budget of a department":
        viewBudget();
        break;

        case "exit":
        connection.end();
        break;
      }
    }); 
}

//create sub functions
function viewEmployees() {
  connection.query("select * from employees", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  }) 
}

function viewDepartments() {
  connection.query("select * from departments", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  })
}
function viewRoles() {
  connection.query("select * from roles", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  })
}
function viewEmployeesByManager() {
  connection.query("select manager from employees", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  })
}
function viewEmployeesByManager() {
  connection.query("select manager from employees", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  })
}





