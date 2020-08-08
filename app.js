var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// create the connection for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Walter@1990",
  database: "employees_db",
});

// connect to mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
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
        "exit",
      ],
    })
    .then(function (answer) {
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
  connection.query("select * from employees", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewDepartments() {
  connection.query("select * from departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
function viewRoles() {
  connection.query("select * from roles", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
function viewEmployeesByManager() {
  connection.query(
    "select * from employees where manager_id is null",
    function (err, res) {
      if (err) throw err;
      console.log(res);
      var managerArr = [];
      res.map(function (content) {
        var name = content.id;
        managerArr.push(name);
      });
      inquirer
        .prompt({
          name: "action",
          type: "list",
          message: "What would you like to do?",
          choices: managerArr,
        })
        .then(function (answer) {
          connection.query(
            `select * from employees where manager_id = ${answer.action}`,
            function (err, res) {
              console.table(res);
              start();
            }
          );
        });
    }
  );
}
function addDepartments() {
  connection.query(
    "select * from departments",
    function (err, res) {
      if (err) throw err;
      console.log(res);
      var departmentArr = [];
      res.map(function(content){
        var name = content.id;
        departmentArr.push(name);
      });
      inquirer
        .prompt({
          name: "action",
          type: "list",
          message: "What would you like to do?",
          choices: departmentArr,
        })
        .then(function (answer) {
          connection.query(
            `select * from departments = ${answer.action}`,
            function (err, res) {
              console.table(res);
              start();
            }
          );
        });
    }
  );
}
function addRoles() {
  connection.query("select * from roles", function (err, res) {
    if (err) throw err;
    console.log(res);
    var rolesArr = [];
    res.map(function (content) {
      var name = content.id;
      rolesArr.push(name);
    });
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: rolesArr,
      })
      .then(function (answer) {
        connection.query(`select * from roles  = ${answer.action}`, function (
          err,
          res
        ) {
          console.table(res);
          start();
        });
      });
  });
}
function addEmployees() {
  connection.query("select * from employees", function (err, res) {
    if (err) throw err;
    console.log(res);
    var employeesArr = [];
    res.map(function (content) {
      var name = content.id;
      employeesArr.push(name);
    });
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: employeesArr,
      })
      .then(function (answer) {
        console.log(answer);
        connection.query(`select * from employees  = ${answer.action.eId}`, function (
          err,
          res
        ) {
          console.table(res);
          start();
        });
      });
  });
}

// let arr = [1,2,3];
// arr.map(function(x){
//   x+1
// })



function deleteEmployees() {
  connection.query(
    "select * from employees",
    function (err, res) {
      if (err) throw err;
      var employeesArr = [];
      res.map(function (content) {
        var lastName = content.last_name;
        var firstName = content.first_name;
        var employeeId = content.id;
        employeesArr.push({
          lN: lastName,
          fN: firstName,
          eId: employeeId
        }
        )});
        console.log(employeesArr);
      inquirer
        .prompt({
          name: "action",
          type: "list",
          message: "Which employee would you like to delete?",
          choices: employeesArr,
        })
        .then(function (answer) {
          connection.query(
            `Delete from employees where id = ${answer.eId}`,
            function (err, res) {
              console.table(res);
              start();
            }
          );
        });
    }
  );
}




