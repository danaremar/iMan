-- USERS
INSERT INTO users(id, username, name, last_name, email, password, country, sector, creation_date, delete_date, last_connection, active) VALUES(1, 'danaremar', 'Daniel', 'Arellano Martinez', 'danaremar@alum.us.es', '{i+ceiUcHixxmiV82NpMls+mPiXkPn+J68+eIIFL8T6s=}f2579743cd02706c19c84f106eb2036fed160e20edd80974b2d54a5c5f7782c4', 'ES', 'Ingenieria', '2021-01-31 12:25:01', NULL, '2021-01-31 12:25:01', 1);
INSERT INTO users(id, username, name, last_name, email, password, country, sector, creation_date, delete_date, last_connection, active) VALUES(2, 'utest1', 'Rigoberto', 'García López', 'utest1@utest.es', '{i+ceiUcHixxmiV82NpMls+mPiXkPn+J68+eIIFL8T6s=}f2579743cd02706c19c84f106eb2036fed160e20edd80974b2d54a5c5f7782c4', 'ES', 'Ingenieria', '2021-01-31 12:25:01', NULL, '2021-01-31 12:25:01', 1);
INSERT INTO users(id, username, name, last_name, email, password, country, sector, creation_date, delete_date, last_connection, active) VALUES(3, 'utest2', 'Jesús', 'Sanchez González', 'utest2@utest.es', '{i+ceiUcHixxmiV82NpMls+mPiXkPn+J68+eIIFL8T6s=}f2579743cd02706c19c84f106eb2036fed160e20edd80974b2d54a5c5f7782c4', 'ES', 'Ingenieria', '2021-01-31 12:25:01', NULL, '2021-01-31 12:25:01', 1);
INSERT INTO users(id, username, name, last_name, email, password, country, sector, creation_date, delete_date, last_connection, active) VALUES(4, 'utest3', 'Miguel', 'Gómez Fernández', 'utest3@utest.es', '{i+ceiUcHixxmiV82NpMls+mPiXkPn+J68+eIIFL8T6s=}f2579743cd02706c19c84f106eb2036fed160e20edd80974b2d54a5c5f7782c4', 'ES', 'Ingenieria', '2021-01-31 12:25:01', NULL, '2021-01-31 12:25:01', 1);
INSERT INTO users(id, username, name, last_name, email, password, country, sector, creation_date, delete_date, last_connection, active) VALUES(5, 'utest4', 'Jose Luis', 'Moreno Jiménez', 'utest4@utest.es', '{i+ceiUcHixxmiV82NpMls+mPiXkPn+J68+eIIFL8T6s=}f2579743cd02706c19c84f106eb2036fed160e20edd80974b2d54a5c5f7782c4', 'ES', 'Ingenieria', '2021-01-31 12:25:01', NULL, '2021-01-31 12:25:01', 1);
INSERT INTO users(id, username, name, last_name, email, password, country, sector, creation_date, delete_date, last_connection, active) VALUES(6, 'utest5', 'Rafael', 'Saez Alfaro', 'utest5@utest.es', '{i+ceiUcHixxmiV82NpMls+mPiXkPn+J68+eIIFL8T6s=}f2579743cd02706c19c84f106eb2036fed160e20edd80974b2d54a5c5f7782c4', 'ES', 'Ingenieria', '2021-01-31 12:25:01', NULL, '2021-01-31 12:25:01', 1);
INSERT INTO users(id, username, name, last_name, email, password, country, sector, creation_date, delete_date, last_connection, active) VALUES(7, 'utest6', 'Javier', 'Lozano Cano', 'utest6@utest.es', '{i+ceiUcHixxmiV82NpMls+mPiXkPn+J68+eIIFL8T6s=}f2579743cd02706c19c84f106eb2036fed160e20edd80974b2d54a5c5f7782c4', 'ES', 'Ingenieria', '2021-01-31 12:25:01', NULL, '2021-01-31 12:25:01', 1);


-- PROJECTS
INSERT INTO projects(id, active, creation_date, close_date, description, name) VALUES(1, 1, '2021-01-31 12:25:01', NULL, 'Incredible project', 'IMAN PROJECT');
INSERT INTO projects(id, active, creation_date, close_date, description, name) VALUES(2, 1, '2021-01-31 12:25:01', NULL, 'Airport application to improve flights control in the ground', 'Acme-volar');
INSERT INTO projects(id, active, creation_date, close_date, description, name) VALUES(3, 1, '2021-01-31 12:25:01', NULL, 'Travel website application', 'Yourney');
INSERT INTO projects(id, active, creation_date, close_date, description, name) VALUES(4, 1, '2021-01-31 12:25:01', NULL, 'Website of PC fanboys', 'PC-MANIA');


-- PROJECT2ROLE
INSERT INTO project2role(id, accepted, `role`, project_id, user_id) VALUES(1, 1, 0, 1, 1);
INSERT INTO project2role(id, accepted, `role`, project_id, user_id) VALUES(2, 1, 0, 2, 1);
INSERT INTO project2role(id, accepted, `role`, project_id, user_id) VALUES(3, 0, 1, 1, 2);
INSERT INTO project2role(id, accepted, `role`, project_id, user_id) VALUES(4, 0, 2, 1, 3);
INSERT INTO project2role(id, accepted, `role`, project_id, user_id) VALUES(5, 1, 1, 1, 4);
INSERT INTO project2role(id, accepted, `role`, project_id, user_id) VALUES(6, 1, 2, 1, 5);
INSERT INTO project2role(id, accepted, `role`, project_id, user_id) VALUES(7, 1, 0, 3, 2);
INSERT INTO project2role(id, accepted, `role`, project_id, user_id) VALUES(8, 1, 2, 3, 1);
INSERT INTO project2role(id, accepted, `role`, project_id, user_id) VALUES(9, 1, 3, 3, 3);
INSERT INTO project2role(id, accepted, `role`, project_id, user_id) VALUES(10, 1, 1, 3, 4);
INSERT INTO project2role(id, accepted, `role`, project_id, user_id) VALUES(11, 1, 0, 4, 3);
INSERT INTO project2role(id, accepted, `role`, project_id, user_id) VALUES(12, 0, 2, 4, 2);


-- SPRINTS
INSERT INTO sprint (id, active, close_date, creation_date, description, estimated_date, `number`, start_date, title, project_id) VALUES(1, 1, '2021-07-21 12:35:00.335000000', '2021-07-01 12:35:00.335000000', 'Create architecture & framework', NULL, 1, '2021-07-01 12:35:00.335000000', 'Start project', 1);
INSERT INTO sprint (id, active, close_date, creation_date, description, estimated_date, `number`, start_date, title, project_id) VALUES(2, 1, NULL, '2021-07-05 12:35:00.335000000', 'Analize client''s product', NULL, 2, '2021-07-01 12:35:00.335000000', 'Analysis', 1);
INSERT INTO sprint (id, active, close_date, creation_date, description, estimated_date, `number`, start_date, title, project_id) VALUES(3, 0, NULL, '2021-07-10 12:35:00.335000000', 'I just want to test some functions', NULL, 3, '2021-07-01 12:35:00.335000000', 'Example project', 1);
INSERT INTO sprint (id, active, close_date, creation_date, description, estimated_date, `number`, start_date, title, project_id) VALUES(4, 1, NULL, '2021-07-15 12:35:00.335000000', 'Create an API Rest based on Spring Boot', NULL, 4, '2021-07-01 12:35:00.335000000', 'API', 1);
INSERT INTO sprint (id, active, close_date, creation_date, description, estimated_date, `number`, start_date, title, project_id) VALUES(6, 1, NULL, '2021-07-20 12:35:00.335000000', 'Improve DB Queries', NULL, 5, '2021-11-01 12:35:00.335000000', 'DB Queries', 1);


-- KANBAN COLUMNS
INSERT INTO kanban_column (id, active, column_order, title, sprint_id) VALUES(1, 1, 0, 'To do', 4);
INSERT INTO kanban_column (id, active, column_order, title, sprint_id) VALUES(2, 1, 1, 'In progress', 4);
INSERT INTO kanban_column (id, active, column_order, title, sprint_id) VALUES(3, 1, 2, 'Done', 4);


-- KANBAN TASKS
INSERT INTO kanban_task (id, active, creation_date, description, estimated_time, `number`, order_in_column, title, kanban_column_id) VALUES(1, 1, '2021-08-07 11:03:42.561000000', 'This is an example task C', 12.0, 1, 0, 'Task C', 3);
INSERT INTO kanban_task (id, active, creation_date, description, estimated_time, `number`, order_in_column, title, kanban_column_id) VALUES(2, 0, '2021-08-07 11:03:56.523000000', 'This is an example task B', 4.0, 2, 1, 'Task B', 1);
INSERT INTO kanban_task (id, active, creation_date, description, estimated_time, `number`, order_in_column, title, kanban_column_id) VALUES(3, 1, '2021-08-07 11:04:04.432000000', 'This is an example task A', 3.0, 2, 0, 'Task A', 2);
INSERT INTO kanban_task (id, active, creation_date, description, estimated_time, `number`, order_in_column, title, kanban_column_id) VALUES(4, 1, '2021-08-07 11:05:26.597000000', 'This is an example task E', 2.0, 3, 0, 'Task E', 1);
INSERT INTO kanban_task (id, active, creation_date, description, estimated_time, `number`, order_in_column, title, kanban_column_id) VALUES(5, 1, '2021-08-07 11:05:32.290000000', 'This is an example task D', 2.0, 4, 1, 'Task D', 2);
INSERT INTO kanban_task (id, active, creation_date, description, estimated_time, `number`, order_in_column, title, kanban_column_id) VALUES(6, 1, '2021-08-07 11:06:55.721000000', 'This is an example task F', 1.0, 5, 1, 'Task F', 1);



-- EFFORT
INSERT INTO effort (id, description, end_date, start_date, kanban_task_id, user_id) VALUES(1, NULL, '2021-08-15 10:23:13.557000000', '2021-08-15 08:52:01.793000000', 3, 1);
INSERT INTO effort (id, description, end_date, start_date, kanban_task_id, user_id) VALUES(2, NULL, '2021-08-15 10:23:13.557000000', '2021-08-15 08:52:01.793000000', 3, 1);
INSERT INTO effort (id, description, end_date, start_date, kanban_task_id, user_id) VALUES(3, NULL, '2021-08-15 10:23:13.557000000', '2021-08-15 08:52:01.793000000', 3, 1);
INSERT INTO effort (id, description, end_date, start_date, kanban_task_id, user_id) VALUES(4, NULL, '2021-08-15 10:23:13.557000000', '2021-08-15 08:52:01.793000000', 1, 1);
INSERT INTO effort (id, description, end_date, start_date, kanban_task_id, user_id) VALUES(5, NULL, '2021-08-15 10:23:13.557000000', '2021-08-15 08:52:01.793000000', 1, 1);
INSERT INTO effort (id, description, end_date, start_date, kanban_task_id, user_id) VALUES(6, NULL, '2021-08-15 10:23:13.557000000', '2021-08-15 08:52:01.793000000', 5, 1);
INSERT INTO effort (id, description, end_date, start_date, kanban_task_id, user_id) VALUES(7, 'Effort without assigned task', '2021-08-15 10:23:13.557000000', '2021-08-15 08:52:01.793000000', NULL, 1);
INSERT INTO effort (id, description, end_date, start_date, kanban_task_id, user_id) VALUES(8, NULL, NULL, '2021-08-15 17:31:33.652000000', 3, 1);
