-- create file to pre-populate my database
use employees_db;
insert into departments (name, id)
values ("Front Office", 1);
insert into departments (name, id)
values ("Technology", 2);
insert into departments (name, id)
values ("Financial Controllers", 3);
insert into departments (name, id)
values ("Operations", 4);
insert into departments (name, id)
values ("Legal and Compliance", 5);
insert into departments (name, id)
values ("Internal Audit", 6);

insert into roles (title, salary, department_id)
values ("Salesperson", 15000, 1);
insert into roles (title, salary, department_id)
values ("Trader", 22000, 1);
insert into roles (title, salary, department_id)
values ("Business Manager", 10000, 1);
insert into roles (title, salary, department_id)
values ("Technology Lead", 2000, 2);
insert into roles (title, salary, department_id)
values ("Software Engineer", 17000, 2);
insert into roles (title, salary, department_id)
values ("Accountant", 10000, 3);
insert into roles (title, salary, department_id)
values ("Operations Specialist", 12000, 4);
insert into roles (title, salary, department_id)
values ("Lawyer", 24000, 5);
insert into roles (title, salary, department_id)
values ("Compliance Officer", 12000, 1);
insert into roles (title, salary, department_id)
values ("Internal Audit Officer", 14000, 6);

insert into employees (first_name, last_name, role_id, manager_id)
values ("Michael", "Jordan", 1, NULL);
insert into employees (first_name, last_name, role_id, manager_id)
values ("Kobe", "Bryant", 2, NULL);
insert into employees (first_name, last_name, role_id, manager_id)
values ("Lebron", "James", 3, NULL);
insert into employees (first_name, last_name, role_id, manager_id)
values ("Tim", "Duncan", 3, NULL);
insert into employees (first_name, last_name, role_id, manager_id)
values ("Stephen", "Curry", 4, 2);
insert into employees (first_name, last_name, role_id, manager_id)
values ("Kevin", "Durant", 4, 3);
insert into employees (first_name, last_name, role_id, manager_id)
values ("Kevin", "Garnett", 5, 4);
insert into employees (first_name, last_name, role_id, manager_id)
values ("Dwyane", "Wade", 6, 2);
insert into employees (first_name, last_name, role_id, manager_id)
values ("Scottie", "Pippen", 7,3);
insert into employees (first_name, last_name, role_id, manager_id)
values ("Chris", "Paul", 7, 4);
insert into employees (first_name, last_name, role_id, manager_id)
values ("Carmelo", "Anthony", 8, 2);
insert into employees (first_name, last_name, role_id, manager_id)
values ("Allen", "Iverson", 8, 3);
insert into employees (first_name, last_name, role_id, manager_id)
values ("James", "Harden", 9, 4);
insert into employees (first_name, last_name, role_id, manager_id)
values ("Ming", "Yao", 10, 2);

