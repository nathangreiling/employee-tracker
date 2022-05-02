const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database :'employee_tracker_db'
    },
    );


let onStart = () => {
    inquirer.prompt([
        {
            name: 'actions',
            type: 'list',
            choices: [
                'View all departments.',
                'View all roles.',
                'View all employees.',
                'Add a department.',
                'Add a role.',
                'Add an employee.',
                'Update an employee role.'
            ],
            message:'What is your course of action?'
        }
    ]).then(function(result) {
        switch (result.actions) {
            case 'View all departments.':
                viewDepartments();
                break;
            case 'View all roles.':
                viewRoles();
                break;
            case 'View all employees.':
                viewEmployees();
                break;
            case 'Add a department.':
                addDepartments();
                break;
            case 'Add a role.':
                addRoles();
                break;
            case 'Add an employee.':
                addEmployees();    
                break;
            case 'Update an employee role.':
                updateRoles();
                break;                
        }
    });
};

let viewDepartments = () => {
    let sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
        if (err)
        throw err;
        console.table(res);
        onStart();
    });
};

let viewRoles = () => {
    let sql = `SELECT * FROM role`;
    db.query(sql, (err, res) => {
        if (err)
        throw (err);
        console.table(res);
        onStart();
    });
};

let viewEmployees = () => {
    let sql = `SELECT * FROM employee`;
    db.query(sql, (err, res) => {
        if (err)
        throw (err);
        console.table(res);
        onStart();
    });
};

let addDepartments = () => {
    inquirer.prompt([
        {
            name:'department',
            type:'input',
            message:'What is the name of the department?'
        }
    ]).then(function(input){
        db.query(`INSERT INTO department (name) VALUES (?)`, [input.department],
        function(err, res) {
            if (err)
            throw err;
            onStart();
        });
    });
};

let addRoles = () => {
    inquirer.prompt([
        {
            name: 'roles',
            type: 'input',
            message: 'Please enter a name for this role.'
        },
        {
            name: 'salary',
            type: 'input',
            message:'Please enter a salary for this role.'
        },
        {
            name: 'id',
            type: 'input',
            message: 'Please enter the ID of the department this role belongs to.'
        }
    ]).then(function(input) {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`,
        [input.roles, input.salary, input.id], 
        function(err, res) {
            if (err)
            throw (err);
        });
        onStart();
    });
};

let addEmployees = () => {
    inquirer.prompt([
        {
            name:'first',
            type:'input',
            message:'Please enter the first name of the employee.'
        },
        {
            name:'last',
            type:'input',
            message:'Please enter the last name of the employee.'
        },
        {
            name:'role',
            type:'input',
            message:'Please enter the role of the employee.'
        },
        {
            name:'manager',
            type:'input',
            message:'Please enter the manager of the employee.'
        }
    ]).then(function(input) {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, 3, NULL)`, [input.first, input.last,],
        function(err, res) {
            if (err)
            throw err;
            onStart();
        });
    });
};

let updateRoles = () => {
    inquirer.prompt([
        {
            name:'employee',
            type:'input',
            message:'Select employee to update.'
        },
        {
            name:'role',
            type:'input',
            message:'Please list the new role of the employee.'
        }
    ]).then(function(input) {
    db.query(`UPDATE employee SET role_id =5 WHERE first_name =?`, [input.employee], 
    function(err,res) {
        if (err)
        throw err;
        onStart();
    });
});
};
onStart();
