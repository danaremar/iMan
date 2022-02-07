-- USERS
INSERT INTO users (id, active, country, creation_date, delete_date, username, email, image_uid, last_connection, last_name, name, password, sector) VALUES(1, 1, 'ES', '2021-01-31 12:25:01.000', NULL, 'danaremar', 'danaremar@alum.us.es', 'cute-astronaut-1.jpg', '2021-01-31 12:25:01.000', 'Arellano Martinez', 'Daniel', '$2a$10$LhVd/V9pynC9r3N6fAK0O.N371jQqXQlmcg2q/pA7mXCipHWQnSvO', 'Ingenieria');
INSERT INTO users (id, active, country, creation_date, delete_date, username, email, image_uid, last_connection, last_name, name, password, sector) VALUES(2, 1, 'ES', '2021-01-31 12:25:01.000', NULL, 'rigoberto', 'rigoberto@utest.es', 'cute-astronaut-2.jpg', '2021-01-31 12:25:01.000', 'García López', 'Rigoberto', '$2a$10$LhVd/V9pynC9r3N6fAK0O.N371jQqXQlmcg2q/pA7mXCipHWQnSvO', 'Ingenieria');
INSERT INTO users (id, active, country, creation_date, delete_date, username, email, image_uid, last_connection, last_name, name, password, sector) VALUES(3, 1, 'ES', '2021-01-31 12:25:01.000', NULL, 'jysus', 'jysus@utest.es', 'cute-astronaut-3.jpg', '2021-01-31 12:25:01.000', 'Sanchez González', 'Jesús', '$2a$10$LhVd/V9pynC9r3N6fAK0O.N371jQqXQlmcg2q/pA7mXCipHWQnSvO', 'Ingenieria');
INSERT INTO users (id, active, country, creation_date, delete_date, username, email, image_uid, last_connection, last_name, name, password, sector) VALUES(4, 1, 'ES', '2021-01-31 12:25:01.000', NULL, 'miguel', 'miguel@utest.es', 'cute-astronaut-4.jpg', '2021-01-31 12:25:01.000', 'Gómez Fernández', 'Miguel', '$2a$10$LhVd/V9pynC9r3N6fAK0O.N371jQqXQlmcg2q/pA7mXCipHWQnSvO', 'Ingenieria');
INSERT INTO users (id, active, country, creation_date, delete_date, username, email, image_uid, last_connection, last_name, name, password, sector) VALUES(5, 1, 'ES', '2021-01-31 12:25:01.000', NULL, 'jl', 'jl@utest.es', 'cute-astronaut-5.jpg', '2021-01-31 12:25:01.000', 'Moreno Jiménez', 'Jose Luis', '$2a$10$LhVd/V9pynC9r3N6fAK0O.N371jQqXQlmcg2q/pA7mXCipHWQnSvO', 'Ingenieria');
INSERT INTO users (id, active, country, creation_date, delete_date, username, email, image_uid, last_connection, last_name, name, password, sector) VALUES(6, 1, 'ES', '2021-01-31 12:25:01.000', NULL, 'rafa', 'rafa@utest.es', 'cute-astronaut-6.jpg', '2021-01-31 12:25:01.000', 'Saez Alfaro', 'Rafael', '$2a$10$LhVd/V9pynC9r3N6fAK0O.N371jQqXQlmcg2q/pA7mXCipHWQnSvO', 'Ingenieria');
INSERT INTO users (id, active, country, creation_date, delete_date, username, email, image_uid, last_connection, last_name, name, password, sector) VALUES(7, 1, 'ES', '2021-01-31 12:25:01.000', NULL, 'javier', 'javier@utest.es', 'cute-astronaut-7.jpg', '2021-01-31 12:25:01.000', 'Lozano Cano', 'Javier', '$2a$10$LhVd/V9pynC9r3N6fAK0O.N371jQqXQlmcg2q/pA7mXCipHWQnSvO', 'Ingenieria');


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
INSERT INTO project2role (id, accepted, `role`, project_id, user_id) VALUES(13, 0, 2, 4, 1);


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


-- INCIDENT
INSERT INTO incident (id, affects, `date`, description, estimated_time, priority, status, active, code, last_modification, reported, title, assigned_user_id, user_id, project_id) VALUES(1, 'Scope & €', '2022-02-06 17:44:19.336', 'Profile image cannot updated correctly when it''s updated.', 12.0, 1, 'In progress', 1, 0, '2022-02-06 20:13:54.625', 'Excellent client', 'Profile image problems', 3, 1, 1);


-- INCIDENT UPDATE
INSERT INTO incident_update (id, affects, `date`, description, estimated_time, priority, status, assigned_user_id, user_id, incident_id) VALUES(1, 'Scope & €', '2022-02-06 19:49:50.562', 'Image is not updated so well', 12.0, 1, 'To do', 1, 1, 1);
INSERT INTO incident_update (id, affects, `date`, description, estimated_time, priority, status, assigned_user_id, user_id, incident_id) VALUES(2, NULL, '2022-02-06 19:55:22.900', 'Jysus is going to solve this', NULL, NULL, 'In progress', 3, 1, 1);
