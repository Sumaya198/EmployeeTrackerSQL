const mysql = require('mysql')
const inquirer = require('inquirer');
const consoleTable = require('console.table')


//assigning an object that comes from that enquirer
const password = process.argv[2]
const connection = mysql.createConnection({

    host: 'localhost',
    port: 3306,
    user: 'root',
    password,
    database: 'employeetracker',
});



// function for adding an entry
function addNewEntry(){
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to add?",
      name: "choice",
      choices: ["Add new Department", 
                "Add New Role", 
                "Add Employee", 
                "View Employees", 
                "View roles", 
                "View departments",
                "Update employee role"]
    }
  ]).then(function(addWhatAnswers) {
    if(addWhatAnswers.choice === "Add new Department"){
      addNewDepartment();
    } else if (addWhatAnswers.choice === "Add New Role"){
      addNewRole();
    } else if (addWhatAnswers.choice === "Add Employee"){
      addNewEmployee();
    } else if (addWhatAnswers.choice === "View Employees"){
      viewAllEmployees();
    } else if (addWhatAnswers.choice === "View roles"){
      viewAllRoles();
    }else if (addWhatAnswers.choice === "View departments"){
      viewAllDepartment();
    } else {
      updateEmployeeRole();
      updateNameRole();
    }
    
    
  })
}

///=================ADDING==============================
function addEntry(){
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to add",
      name: "addingEntry",
      choices: ["Department", "Role", "Employee"]
    }
  ]).then(function(addAnswer) {
    if(addAnswer.addingEntry === "Department"){
      addNewDepartment();
    }else if (addAnswer.addingEntry === "Role"){
      addNewRole();
    }else {
      addNewEmployee();
    }
  
  })
}
function addNewDepartment(){
  inquirer.prompt([
    {
      type: "input",
      message: "What department do you wish to add?",
      name: "addDep",
      
    }
  ]).then(function(newDep){
  connection.query(
    "INSERT INTO department SET ?",
    {
      name: newDep.addDep,
    },
    function(err, res){
      if (err) throw err;
      buildTracker()
    }
  )
  })

}

function addNewRole(){
  inquirer.prompt([
    {
      type: "input",
      message: "What is the role title",
      name: "addRoleTitle",
    },
    {
      type: "input",
      message: "What is the salary?",
      name: "addRoleSalary"
    },
    {
      type: "input",
      message: "What is the department ID?",
      name: "addDepId"
    }
  ]).then(function(newRole) {
    connection.query("INSERT INTO role SET ?",
    {
      title: newRole.addRoleTitle,
      salary: newRole.addRoleSalary,
      department_id: newRole.addDepId,
    })
    buildTracker()
  })
}

function addNewEmployee(){
  inquirer.prompt([
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
    }
  ]).then (function(newEmp){
    connection.query("INSERT INTO employee SET ?",
    {
      first_name: newEmp.employeeFirstName,
      last_name: newEmp.employeeLastName,
      role_id: newEmp.employeeRoleId,
      manager_id: newEmp.employeeManagerId,
    })
    buildTracker()
  })

}

//========================VIEWING=================================
//function for viewing an entry


function viewAllDepartment() {
   console.log(' ');
  connection.query("SELECT id, name AS department FROM department", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    addNewEntry()
  })
};

function viewAllRoles(){
console.log(' ');
connection.query("SELECT id, title, salary, department_id AS role FROM role",
function(err, res){
  if (err) throw err
  console.table(res)
  addNewEntry()
})
}
function viewAllEmployees(){
  console.log(' ');
  connection.query("SELECT id, first_name, last_name, role_id, manager_id AS employee FROM employee",
  function(err, res){
    if (err) throw err
    console.table(res)
  })
}


//==================UPDATING==============================

function updateNameRole() {
  connection.query("SELECT id, first_name, last_name FROM employee", function(err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
      type: "list",
      message: "Select the employee you want to update?",
      name: "updateEmployeeName",
      choices: function(){
        const choiceArrayEmpl = []
        for (let i = 0; i<res.length; i++) {
            choiceArrayEmpl.push(`${res[i].id} | ${res[i].first_name} ${res[i].last_name}`);
        }
        return choiceArrayEmpl
      }
      },
    ]).then(function(employeeNewRole){
      const EmployeeUpdate = parseInt(employeeNewRole.updateEmployeeName.slice(0,5));
      updateNameRole(EmployeeUpdate)
    })
  })
}

// Function to select which role we will be changing the employee to
function updateEmployeeRole(employeeNewRole) {
  
  connection.query("SELECT id, title FROM role", function (err, res) {
    inquirer.prompt([
      {
      type: "list",
      message: "And what will be their new role be?",
      name: "updatedEmployeeInfo",
      choices: function(){
        const choiceArrayRole = []
        for (let i = 0; i<res.length; i++) {
            choiceArrayRole.push(`${res[i].id} | ${res[i].title}`);
        }
        return choiceArrayRole
      }
      },
    ]).then(function(role) {
      const employee = employeeNewRole
      const newRole = parseInt(role.updatedEmployeeInfo.slice(0,5));
      //const changingEmpl = newRole.employee
      connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [newRole, employee], function(err, res){
        if (err) {
        } else {
          console.log("Employee is now updated")
          buildTracker();
        }
      })
    })
  })
}
 //============ CONTINUE BUILDING EMPLOYEE TRACKER =========

 function buildTracker(){
   inquirer.prompt([
     {
       type: "list",
       name: "What would you like to continue building the employee tracker",
       name: "continueAnswers",
       choices: ["yes", "no"]
     }
   ]).then(function(newAnswers){
     if(newAnswers.continueAnswers === "yes"){
      addNewEntry();
     } else {
       console.log("Your tracker has been built");
       connection.end()
     }
   })
 }

addNewEntry();

connection.connect(function(err){
  if (err) console.log('Whoops error', err);
  else console.log('connected!');

  connection.query("SELECT * FROM department", function(err, result) {
      if (err) console.log('error', err);
      else console.log('result', result);
  });
});
