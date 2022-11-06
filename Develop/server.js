const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL Password
    password: "sqlpassword1",
    database: "employee_db",
  },
  console.log(`Connected to the movies_db database.`)
);

function viewAllEmployees() {
  db.connect(function (err) {
    if (err) throw err;
    db.query("SELECT * FROM employee", function (err, result) {
      if (err) throw err;
      console.table(result);
    });
  });
}

//Function to ask questions for the manager task
function generateEmployeeManager() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "managerChoices",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View Roles",
          "Add Role",
          "View All Departments",
          "Add Departments",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      if (answers.managerChoices === "View All Employees") {
        viewAllEmployees();
      } else if (answers.managerChoices === "Add Employee") {
        addEmployee();
      } else if (answers.managerChoices === "Update Employee Role") {
        updateEmployeeRole();
      } else if (answers.managerChoices === "View Roles") {
        viewRoles();
      } else if (answers.managerChoices === "Add Role") {
        addRole();
      } else if (answers.managerChoices === "View All Departments") {
        viewAllDepartments();
      } else if (answers.employeeChoices === "Add Deparments") {
        addDepartments();
      } else {
        console.log("Quit Successfull");
      }
    });
}

generateEmployeeManager();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
