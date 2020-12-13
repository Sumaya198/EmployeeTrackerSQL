CREATE DATABASE employeetracker;

USE employeetracker;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary VARCHAR(30) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO department (name)
VALUE ("Accounting");
INSERT INTO department (name)
VALUE ("Human Recources");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Health Care");


INSERT INTO role (title, salary, department_id)
VALUE ("Investment Banker", 150000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Person", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Consultant", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Advice Worker", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Business analyst", 390000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Data Analyst", 320000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Physiotherapist", 270000, 5);

-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Halima", "Hussain", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Morgan", "Jason", 1, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Lilly","Kay",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Lewis", "Harris", null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Chris", "Pelkom", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Amina", "Said", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Hannah", "Smith", null, 7);

-- SELECTING FOR CREATING 
--TABLES IN OUR SQL WORKBENCH 
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;