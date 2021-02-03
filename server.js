const inquirer = require("inquirer")
const mysql = require("mysql")

// create database connection with credentials//
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    user: "root",
    password: "root",
    database: "employeetrackerdb"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    questions();
});

//prompt user to select an action//
function questions() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "Add Department",
                "Add Role",
                "Add Employee",
                "View All Employees",
                "View All Roles",
                "View All Departments",
                "Update Employee Role"
            ]
        }
    ]).then(function (answer) {
        switch (answer.choice) {
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "View All Employees":
                viewEmployees();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "View All Departments":
                viewDepartments();
                break;
            case "Update Employee Role":
                updateEmployee();
                break;
        }
    })
}

//Add Department//
function addDepartment() {

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter new department name."
        }
    ]).then(function (answer) {
        var query = "INSERT INTO department SET ?";
        connection.query(query, {

            name: answer.name

        }, function (err, res) {
            if (err) throw err;
            viewDepartments();
        }
        );
    });
};

//Add Role//
function addRole() {

    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Enter new title."
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary?"

        },
        {
            name: "departmentID",
            type: "input",
            message: "What is the department ID?"

        }
    ]).then(function (answer) {
        var query = "INSERT INTO role SET ?"
        connection.query(query,
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.departmentID,
            },
            function (err) {

                if (err) throw err
                viewRoles();
            }
        )

    });
};

//Add Employee//
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "lastname",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "list",
            message: "What is the role?",
            choices: allRoles()
        },
        {
            name: "manager",
            type: "list",
            message: "Who is the manager?",
            choices: allEmployeeLastNames()
        }
    ]).then(function (answer) {
        var query = "INSERT INTO employee SET ?"
        connection.query(query,
            {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: roleArray.findIndex(allRoles) + 1,
                manager_id: employeeLastnameArray.findIndex(allEmployeeLastNames) + 1,

            }, function (err) {
                if (err) throw err
                viewEmployees();
            });

    });
};


//View All Employees//
function viewEmployees() {
    var query = "SELECT first_name, last_name, role_id, manager_id FROM employee"
    connection.query(query,
        function (err, res) {
            if (err) throw err
            console.table(res)
            questions()
        });
};
//View All Roles//
function viewRoles() {
    var query = "SELECT title, salary, department_id FROM role"
    connection.query(query,
        function (err, res) {
            if (err) throw err
            console.table(res)
            questions()
        });
};
//View All Departments//
function viewDepartments() {
    var query = "SELECT name FROM department"
    connection.query(query,
        function (err, res) {
            if (err) throw err
            console.table(res)
            questions()
        });
};

//Update Employee//
function updateEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "What is employee's first name would you like to update?"
        },
        {
            name: "lastname",
            type: "input",
            message: "What is employee's last name would you like to update?"

        },
        {
            name: "role",
            type: "list",
            message: "What is employee's new role?",
            choices: allRoles()
        },
        {
            name: "manager",
            type: "list",
            message: "Who is employee's new manager?",
            choices: allEmployeeLastNames()
        },
    ]).then(function (answer) {
        var query = "UPDATE employee SET ? WHERE ? AND ?"
        connection.query(query, {

            title: answer.role,
            first_name: answer.firstname,
            last_name: answer.lastname,

        }, function (err, data) {
            console.table(answer);
        })
        questions();
    })

}

//Query all roles by title//
var roleArray = [];
function allRoles() {
    var query = "SELECT title FROM role"
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }

    });
    return roleArray;
};


//Query all employee by last_name//
var employeeLastnameArray = [];
function allEmployeeLastNames() {
    var query = "SELECT last_name FROM employee"
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            employeeLastnameArray.push(res[i].last_name);
        }

    });
    return employeeLastnameArray;
};