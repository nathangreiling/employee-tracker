INSERT INTO department (name)
VALUES
    ('Marketing'),
    ('Finance'),
    ('Human Resource'),
    ('IT');

INSERT INTO role (title, salary, department_id)    
VALUES
    ('CMO', 170000.00, 1),
    ('Accountant', 80000.00, 2),
    ('CHRO', 200000.00, 3),
    ('Support Technician', 40000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Smith', 1, 2),
    ('Jane', 'Doe', 2, 5),
    ('Jawn', 'Wallei', 3, 3);