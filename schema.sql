drop database if exists employees_db;
create database employees_db;
use employees_db;

create table departments (
  id int not null auto_increment,
  name varchar(30) not null,
  primary key (id)
);

create table roles (
  id int not null auto_increment,
  title varchar(30) not null,
  salary decimal(10, 4) not null,
  department_id int,
  primary key (id),
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);


create table employees (
  id int not null auto_increment,
  first_name varchar(30) not null,
  last_name varchar(30) not null,
  role_id int not null,
  manager_id int,
  primary key (id),
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);




