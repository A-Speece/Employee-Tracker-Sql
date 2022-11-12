const inquirer = require("inquirer");
const mysql = require("mysql2");

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
    db.query(
      `SELECT employee.id,employee.first_name,employee.last_name,
        roles.title,roles.salary,department.department_name FROM employee JOIN roles ON employee.role_id = roles.id 
        JOIN department ON department.id = roles.department_id`,
      function (err, result) {
        if (err) throw err;
        console.table(result);
        generateEmployeeManager();
      }
    );
  });
}

function viewRoles() {
  db.connect(function (err) {
    if (err) throw err;
    db.query("SELECT * FROM roles", function (err, result) {
      if (err) throw err;
      console.table(result);
      generateEmployeeManager();
    });
  });
}

function viewAllDepartments() {
  db.connect(function (err) {
    if (err) throw err;
    db.query("SELECT * FROM department", function (err, result) {
      if (err) throw err;
      console.table(result);
      generateEmployeeManager();
    });
  });
}

function addDepartments() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What department would you like to create",
      },
    ])
    .then((answers) => {
      db.connect(function (err) {
        if (err) throw err;
        db.query(
          "INSERT INTO department(department_name) VALUES (?)",
          [answers.departmentName],
          function (err, result) {
            if (err) throw err;
            console.log("Department has been added");
            generateEmployeeManager();
          }
        );
      });
    });
}

function addRole() {
  db.connect(function (err) {
    if (err) throw err;
    db.query("SELECT * FROM department", function (err, result) {
      if (err) throw err;
      console.log(result);
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "Title",
          },
          {
            type: "input",
            name: "salary",
            message: "Salary",
          },
          {
            type: "list",
            name: "department_id",
            message: "Which department?",
            choices: result.map((item) => {
              return {
                name: item.department_name,
                value: item.id,
              };
            }),
          },
        ])
        .then((answers) => {
          db.connect(function (err) {
            if (err) throw err;
            db.query(
              "INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)",
              [answers.title, answers.salary, answers.department_id],
              function (err, result) {
                if (err) throw err;
                console.log("Role has been added");
                generateEmployeeManager();
              }
            );
          });
        });
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
        loop: false,
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
      } else if (answers.managerChoices === "Add Departments") {
        addDepartments();
      } else {
        console.log("Quit Successfull");
      }
    });
}

generateEmployeeManager();
