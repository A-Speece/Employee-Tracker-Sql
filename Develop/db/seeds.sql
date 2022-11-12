INSERT INTO department (department_name)
VALUES ("IT"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO roles (title,salary,department_id)
VALUES ("Sales Lead",100000,5),
       ("Salesperson",80000,5),
       ("Lead Engineer",150000,2),
       ("Software Engineer",120000,2),
       ("Account Manager",160000,3),
       ("Legal Team Lead",250000,4),
       ("Lawyer",190000,4),
       ("Help Desk",100000,1);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Anthony","Speece",2,NULL),
       ("John","Doe",3,NULL),
       ("Jane","Smith",4,2);              