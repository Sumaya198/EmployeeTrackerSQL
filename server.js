const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

//assigning an object that comes from that enquirer
const password = process.argv[2];
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password,
  database: "employeetracker",
});

// function for adding an entry
function addNewEntry() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to add?",
        name: "choice",
        choices: [
          "Add new Department",
          "Add New Role",
          "Add Employee",
          "View Employees",
          "View roles",
          "View departments",
          "Update employee role",
        ],
      },
    ])
    .then(function (addWhatAnswers) {
      if (addWhatAnswers.choice === "Add new Department") {
        addNewDepartment();
      } else if (addWhatAnswers.choice === "Add New Role") {
        addNewRole();
      } else if (addWhatAnswers.choice === "Add Employee") {
        addNewEmployee();
      } else if (addWhatAnswers.choice === "View Employees") {
        viewAllEmployees();
      } else if (addWhatAnswers.choice === "View roles") {
        viewAllRoles();
      } else if (addWhatAnswers.choice === "View departments") {
        viewAllDepartment();
      } else {
        updateEmployeeRole();
      }
    });
}

///=================ADDING==============================

function addNewDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What department do you wish to add?",
        name: "addDep",
      },
    ])
    .then(function (newDep) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: newDep.addDep,
        },
        function (err, res) {
          if (err) throw err;
          buildTracker();
        }
      );
    });
}

function addNewRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the role title",
        name: "addRoleTitle",
      },
      {
        type: "input",
        message: "What is the salary?",
        name: "addRoleSalary",
      },
      {
        type: "input",
        message: "What is the department ID?",
        name: "addDepId",
      },
    ])
    .then(function (newRole) {
      connection.query("INSERT INTO role SET ?", {
        title: newRole.addRoleTitle,
        salary: newRole.addRoleSalary,
        department_id: newRole.addDepId,
      });
      buildTracker();
    });
}

function addNewEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the employee",
        name: "employeeFirstName",
      },
      {
        type: "input",
        message: "What is the last name of the employee",
        name: "employeeLastName",
      },
      {
        type: "input",
        message: "What is the role ID of the employee",
        name: "employeeRoleId",
      },
      {
        type: "input",
        message: "What is the role manager ID of the employee",
        name: "employeeManagerId",
      },
    ])
    .then(function (newEmp) {
      connection.query("INSERT INTO employee SET ?", {
        first_name: newEmp.employeeFirstName,
        last_name: newEmp.employeeLastName,
        role_id: newEmp.employeeRoleId,
        manager_id: newEmp.employeeManagerId,
      });
      buildTracker();
    });
}

//========================VIEWING=================================
//function for viewing an entry

function viewAllDepartment() {
  console.log(" ");
  connection.query(
    "SELECT id, name AS department FROM department",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      buildTracker();
    }
  );
}

function viewAllRoles() {
  console.log(" ");
  connection.query(
    "SELECT id, title, salary, department_id AS role FROM role",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      buildTracker();
    }
  );
}
function viewAllEmployees() {
  console.log(" ");
  connection.query(
    "SELECT id, first_name, last_name, role_id, manager_id AS employee FROM employee",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      buildTracker();
    }
  );
}

//==================UPDATING==============================

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        message:
          "what is the first name of the employee you would like to update?",
        type: "input",
        name: "name",
      },
      {
        message: "enter the new role ID:",
        type: "number",
        name: "role_id",
      },
    ])
    .then(function (response) {
      connection.query(
        "UPDATE employee SET role_id = role_id WHERE first_name = name",
        [response.role_id, response.name],
        function (err, data) {
          console.table(response);
        }
      );
      buildTracker();
    });
}


//============ CONTINUE BUILDING EMPLOYEE TRACKER =========

function buildTracker() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "What would you like to continue building the employee tracker",
        name: "continueAnswers",
        choices: ["yes", "no"],
      },
    ])
    .then(function (newAnswers) {
      if (newAnswers.continueAnswers === "yes") {
        addNewEntry();
      } else {
        console.log("Your tracker has been built");
        connection.end();
      }
    });
}

addNewEntry();

connection.connect(function (err) {
  if (err) console.log("Whoops error", err);
  else console.log("connected!");

  connection.query("SELECT * FROM department", function (err, result) {
    if (err) console.log("error", err);
    else console.log("result");
  });
});
