DROP DATABASE IF EXISTS employeetrackerdb;
CREATE DATABASE employeetrackerdb;

USE employeetrackerdb;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)  
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_departmentrole FOREIGN KEY (department_id) REFERENCES department(id)

 );

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT REFERENCES employee,
  PRIMARY KEY (id),
  CONSTRAINT FK_roleemployee FOREIGN KEY (role_id) REFERENCES role(id)
);