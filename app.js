// require dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
const { allowedNodeEnvironmentFlags } = require("process");

// create login connectivity to mysql
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "employees_db"
});


connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Hello! What would you like to do?",
      choices: [
        "Add employee",
        "Add role",
        "Add department",
        "View all employees",
        "View all roles",
        "View all departments",
        "Update employee roles",
        // bonus
        "Delete employees",
        "Delete roles",
        "Delete departments"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add employee":
        addEmployee();
        break;
      
      case "Add role":
        addRole();
        break;

      case "Add department":
        addDepartment();
        break;

      case "View all employees":
        viewAllEmployees();
        break;

      case "View all roles":
        viewAllRoles();
        break;

      case "View all departments":
        viewAllDepartments();
        break;

      case "Update employee roles":
        updateEmployeeRoles();
        break;
      // bonus
      case "Delete employees":
        deleteEmployees();
        break;

      case "Delete roles":
        deleteRoles();
        break;

      case "Delete departments":
        deleteDepartments();
        break;
      }
  });
}


