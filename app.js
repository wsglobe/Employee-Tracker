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


connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  runSearch();
  retrieveEmployeesFullData();
  retrieveEmployeesByName();
  retrieveManagerList();
  retrieveRoles();
  retrieveDepartments();
});

//create arrays
const employeesFullList = [];
const employeesByName = [];
const managerList = [];
const rolesList = [];
const departmentsList = [];

//retrieve data and push data into the different arrays
function retrieveEmployeesFullData() {
  var query = "SELECT staff.first_name, staff.last_name, title, salary, department_name, "
  query += "CONCAT(managers.first_name, ' ', managers.last_name) AS 'manager' FROM employees AS staff ";
  query += "LEFT JOIN roles ON staff.role_id = roles.id ";
  query += "LEFT JOIN departments ON roles.department_id = departments.id ";
  query += "LEFT JOIN employees AS managers ON staff.manager_id = managers.id";
  connection.query(query, function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      employeesFullList.push(res[i]);
    }
  })
}

function retrieveEmployeesByName() {
  var query = "SELECT id, first_name, last_name FROM employees";
  connection.query(query, function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      employeesByName.push({ value: res[i].id, name: res[i].first_name + ' ' + res[i].last_name });
    }
  })
}

function retrieveManagerList() {
  var query = "SELECT DISTINCT managers.id, managers.first_name, managers.last_name, department_name "
  query += "FROM employees AS staff ";
  query += "LEFT JOIN roles ON staff.role_id = roles.id ";
  query += "LEFT JOIN departments ON roles.department_id = departments.id ";
  query += "LEFT JOIN employees AS managers ON staff.manager_id = managers.id ";
  query += "GROUP BY id"
  connection.query(query, function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      managerList.push({ value: res[i].id, name: res[i].first_name + ' ' + res[i].last_name });
    }
  })
};

function retrieveRoles() {
  var query = "SELECT id, title FROM roles";
  connection.query(query, function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      rolesList.push({ value: res[i].id, name: res[i].title });
    }
  })
}

function retrieveDepartments() {
  var query = "SELECT id, department_name FROM departments";
  connection.query(query, function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      departmentsList.push({ value: res[i].id, name: res[i].department_name });
    }
  })
}



// main function
function runSearch() {
  inquirer.prompt(startQuestion)
    .then(function (answer) {
      switch (answer.startV) {

        case "View All Employees":
          viewAllEmployees();
          break;

        case "View All Employees By Department":
          viewAllEmployeesByDept();
          break;

        case "View All Employees By Manager":
          viewAllEmployeesByMgr();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRoles();
          break;

        case "Update Employee's Manager":
          updateEmployeeManager();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "Remove Role":
          removeRole();
          break;

        case "View All Departments":
          viewAllDepts();
          break;

        case "Add Department":
          addDept();
          break;

        case "Remove Department":
          removeDept();
          break;

        case "No further action required":
          connection.end();
          break;
      }
    })
}

// sub functions
function viewAllEmployees() {
  console.table(employeesFullList);
  runSearch();
};

function viewAllEmployeesByDept() {
  inquirer.prompt(viewEmployeesByDeptQuestion)
    .then(function (answer) {
      var query = "SELECT staff.first_name, staff.last_name, title, salary, department_name, "
      query += "CONCAT(managers.first_name, ' ', managers.last_name) AS 'manager' FROM employees AS staff ";
      query += "LEFT JOIN roles ON staff.role_id = roles.id ";
      query += "LEFT JOIN departments ON roles.department_id = departments.id ";
      query += "LEFT JOIN employees AS managers ON staff.manager_id = managers.id ";
      query += "WHERE departments.id = ?"
      console.log(answer.viewbyDeptV)
      connection.query(query, [answer.viewbyDeptV], function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      })
    })
}

function viewAllEmployeesByMgr() {
  inquirer.prompt(viewEmployeesByMgrQuestion)
    .then(function (answer) {
      var query = "SELECT staff.first_name, staff.last_name, title, salary, department_name, "
      query += "CONCAT(managers.first_name, ' ', managers.last_name) AS 'manager' FROM employees AS staff ";
      query += "LEFT JOIN roles ON staff.role_id = roles.id ";
      query += "LEFT JOIN departments ON roles.department_id = departments.id ";
      query += "LEFT JOIN employees AS managers ON staff.manager_id = managers.id ";
      query += "WHERE staff.manager_id = ?"
      connection.query(query, [answer.viewbyMgrV], function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      })
    })
}

function addEmployee() {
  inquirer.prompt(addEmployeeQuestions)
    .then(function (answer) {
      var query = "INSERT INTO employees SET ?"
      connection.query(query, {
        first_name: answer.addFirstV,
        last_name: answer.addLastV,
        role_id: answer.addRoleV,
        manager_id: answer.addManagerV,
      }, function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employee added successfully.")
        employeesFullList.length = 0;
        employeesByName.length = 0;
        retrieveEmployeesFullData();
        retrieveEmployeesByName();
        runSearch();
      })
    })
}

function removeEmployee() {
  inquirer.prompt(removeEmployeeQuestion)
    .then(function (answer) {
      var query = "DELETE FROM employees WHERE id = ?"
      connection.query(query, [answer.removeEmployeeV],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " employee deleted successfully.")
          employeesFullList.length = 0;
          employeesByName.length = 0;
          retrieveEmployeesFullData();
          retrieveEmployeesByName();
          runSearch();
        })
    })
}

function updateEmployeeRoles() {
  inquirer.prompt(updateEmployeeRoleQuestions)
    .then(function (answer) {
      var query = "UPDATE employees SET role_id = ? WHERE id = ?"
      connection.query(query, [answer.updateEmployeeRoleV, answer.selectEmployeeRoleV],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " employee's role updated successfully.")
          employeesFullList.length = 0;
          retrieveEmployeesFullData();
          runSearch();
        })
    })
}

function updateEmployeeManager() {
  inquirer.prompt(updateEmployeeMgrQuestions)
    .then(function (answer) {
      var query = "UPDATE employees SET manager_id = ? WHERE id = ?"
      connection.query(query, [answer.updateEmployeeMgrV, answer.selectEmployeeMgrV],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " employee's manager updated successfully.")
          employeesFullList.length = 0;
          retrieveEmployeesFullData();
          runSearch();
        })
    })
}

function viewAllRoles() {
  console.table(rolesList);
  runSearch();

  function addRole() {
    inquirer.prompt(addRoleQuestion)
      .then(function (answer) {
        var query = "INSERT INTO roles SET ?"
        connection.query(query, {
          title: answer.addRoleV,
          salary: answer.addRoleSalaryV,
          department_id: answer.addRoleDeptV,
        }, function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " role added successfully.")
          rolesList.length = 0;
          retrieveRoles();
          runSearch();
        })
      })
  }

  function removeRole() {
    inquirer.prompt(removeRoleQuestion)
      .then(function (answer) {
        var query = "DELETE FROM roles WHERE id = ?"
        connection.query(query, [answer.removeRoleV],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " role deleted successfully.")
            rolesList.length = 0;
            retrieveRoles();
            runSearch();
          })
      })
  }
  
  function viewAllDepts() {
    console.table(departmentsList);
    runSearch();
  };

  function addDept() {
    inquirer.prompt(addDeptQuestions)
      .then(function (answer) {
        var query = "INSERT INTO departments SET ?"
        connection.query(query, {
          department_name: answer.addDeptV,
        }, function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " department added successfully.")
          departmentsList.length = 0;
          retrieveDepartments(); 
          runSearch();
        })
      })
  }

  function removeDept() {
    inquirer.prompt(removeDeptQuestion)
      .then(function (answer) {
        var query = "DELETE FROM departments WHERE id = ?"
        connection.query(query, [answer.removeDeptV],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " department deleted successfully.")
            departmentsList.length = 0;
            retrieveDepartments(); 
            runSearch();
          })
      })
  }


// create a list of inquirer questions

const startQuestion = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "startV",
    choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee's Manager", "View All Roles", "Add Role", "Remove Role", "View All Departments", "Add Department", "Remove Department", "No further action required"]
  },
]

//BONUS
const viewEmployeesByDeptQuestion = [
  {
    type: "list",
    message: "Select department you want to view all employees by:",
    name: "viewbyDeptV",
    choices: departmentsList
  }
]

//BONUS
const viewEmployeesByMgrQuestion = [
  {
    type: "list",
    message: "Select manager you want to view all employees by:",
    name: "viewbyMgrV",
    choices: managerList
  }
]

const addEmployeeQuestions = [
  {
    type: "input",
    message: "Enter Employee's first name:",
    name: "addFirstV"
  },
  {
    type: "input",
    message: "Enter Employee's last name:",
    name: "addLastV"
  },
  {
    type: "list",
    message: "Select Employee's role:",
    name: "addRoleV",
    choices: rolesList
  },
  {
    type: "list",
    message: "Select Employee's manager:",
    name: "addManagerV",
    choices: managerList
  }
]

//BONUS
const removeEmployeeQuestion = [
  {
    type: "list",
    message: "Select employee you want to remove:",
    name: "removeEmployeeV",
    choices: employeesByName
  }
]

const updateEmployeeRoleQuestions = [
  {
    type: "list",
    message: "Select employee for which you want to update role:",
    name: "selectEmployeeRoleV",
    choices: employeesByName
  },
  {
    type: "list",
    message: "Select role to update:",
    name: "updateEmployeeRoleV",
    choices: rolesList
  }
]

//BONUS
const updateEmployeeMgrQuestions = [
  {
    type: "list",
    message: "Select employee for which you want to update manager:",
    name: "selectEmployeeMgrV",
    choices: employeesByName
  },
  {
    type: "list",
    message: "Select Employee's manager:",
    name: "updateEmployeeMgrV",
    choices: managerList
  }
]

const addRoleQuestion = [
  {
    type: "input",
    message: "Enter role title to add:",
    name: "addRoleV"
  },
  {
    type: "number",
    message: "Enter monthly salary level for role:",
    name: "addRoleSalaryV"
  },
  {
    type: "list",
    message: "Select the department the role is in:",
    name: "addRoleDeptV",
    choices: departmentsList
  }
]

//BONUS
const removeRoleQuestion = [
  {
    type: "list",
    message: "Select role to remove:",
    name: "removeRoleV",
    choices: rolesList
  }
]

const addDeptQuestions = [
  {
    type: "input",
    message: "Enter department to add:",
    name: "addDeptV"
  }
]

//BONUS
const removeDeptQuestion = [
  {
    type: "list",
    message: "Select department to remove:",
    name: "removeDeptV",
    choices: departmentsList
  }
]
