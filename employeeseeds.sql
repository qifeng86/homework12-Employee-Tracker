USE employeetrackerdb;

-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("John", "Doe", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Mike", "Chan", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Ashley","Rodriguez", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Kevin", "Tupik", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Malia", "Brown", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Sarah", "Lourd", 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Tom", "Allen", 7, 6);