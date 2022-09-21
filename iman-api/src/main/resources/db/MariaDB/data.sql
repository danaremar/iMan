-- USERS
INSERT INTO users (id, active, country, creation_date, delete_date, username, email, image_uid, last_connection, last_name, name, password, sector) VALUES(1, 1, 'ES', '2021-01-31 12:25:01.000', NULL, 'danaremar', 'danaremar@alum.us.es', 'cute-astronaut-1.jpg', '2021-01-31 12:25:01.000', 'Arellano Martinez', 'Daniel', '$2a$06$mPxpsIpY1XkT3bnn8u372uK4J2xJJGFaURl0mZ5VjS6MJU6aDhYBC', 'Ingenieria');
INSERT INTO users (id, active, country, creation_date, delete_date, username, email, image_uid, last_connection, last_name, name, password, sector) VALUES(2, 1, 'ES', '2021-01-31 12:25:01.000', NULL, 'rigoberto', 'rigoberto@utest.es', 'cute-astronaut-2.jpg', '2021-01-31 12:25:01.000', 'García López', 'Rigoberto', '$2a$06$mPxpsIpY1XkT3bnn8u372uK4J2xJJGFaURl0mZ5VjS6MJU6aDhYBC', 'Ingenieria');
INSERT INTO users (id, active, country, creation_date, delete_date, username, email, image_uid, last_connection, last_name, name, password, sector) VALUES(3, 1, 'ES', '2021-01-31 12:25:01.000', NULL, 'jysus', 'jysus@utest.es', 'cute-astronaut-3.jpg', '2021-01-31 12:25:01.000', 'Sanchez González', 'Jesús', '$2a$06$mPxpsIpY1XkT3bnn8u372uK4J2xJJGFaURl0mZ5VjS6MJU6aDhYBC', 'Ingenieria');
INSERT INTO users (id, active, country, creation_date, delete_date, username, email, image_uid, last_connection, last_name, name, password, sector) VALUES(4, 1, 'ES', '2021-01-31 12:25:01.000', NULL, 'miguel', 'miguel@utest.es', 'cute-astronaut-4.jpg', '2021-01-31 12:25:01.000', 'Gómez Fernández', 'Miguel', '$2a$06$mPxpsIpY1XkT3bnn8u372uK4J2xJJGFaURl0mZ5VjS6MJU6aDhYBC', 'Ingenieria');
INSERT INTO users (id, active, country, creation_date, delete_date, username, email, image_uid, last_connection, last_name, name, password, sector) VALUES(5, 1, 'ES', '2021-01-31 12:25:01.000', NULL, 'jl', 'jl@utest.es', 'cute-astronaut-5.jpg', '2021-01-31 12:25:01.000', 'Moreno Jiménez', 'Jose Luis', '$2a$06$mPxpsIpY1XkT3bnn8u372uK4J2xJJGFaURl0mZ5VjS6MJU6aDhYBC', 'Ingenieria');
INSERT INTO users (id, active, country, creation_date, delete_date, username, email, image_uid, last_connection, last_name, name, password, sector) VALUES(6, 1, 'ES', '2021-01-31 12:25:01.000', NULL, 'rafa', 'rafa@utest.es', 'cute-astronaut-6.jpg', '2021-01-31 12:25:01.000', 'Saez Alfaro', 'Rafael', '$2a$06$mPxpsIpY1XkT3bnn8u372uK4J2xJJGFaURl0mZ5VjS6MJU6aDhYBC', 'Ingenieria');
INSERT INTO users (id, active, country, creation_date, delete_date, username, email, image_uid, last_connection, last_name, name, password, sector) VALUES(7, 1, 'ES', '2021-01-31 12:25:01.000', NULL, 'javier', 'javier@utest.es', 'cute-astronaut-7.jpg', '2021-01-31 12:25:01.000', 'Lozano Cano', 'Javier', '$2a$06$mPxpsIpY1XkT3bnn8u372uK4J2xJJGFaURl0mZ5VjS6MJU6aDhYBC', 'Ingenieria');


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
INSERT INTO kanban_task (id, active, creation_date, description, due_end_date, due_start_date, estimated_time, importance, `number`, order_in_column, tags, title, creator_id, kanban_column_id) VALUES(1, 1, '2021-08-07 11:03:42.561', 'This is an example task C', '2022-03-24 23:00:00.000', '2022-03-11 23:00:00.000', 12.0, NULL, 1, 0, 'develop,important', 'Task C', 1, 3);
INSERT INTO kanban_task (id, active, creation_date, description, due_end_date, due_start_date, estimated_time, importance, `number`, order_in_column, tags, title, creator_id, kanban_column_id) VALUES(2, 0, '2021-08-07 11:03:56.523', 'This is an example task B', NULL, NULL, 4.0, NULL, 2, 1, NULL, 'Task B', 1, 1);
INSERT INTO kanban_task (id, active, creation_date, description, due_end_date, due_start_date, estimated_time, importance, `number`, order_in_column, tags, title, creator_id, kanban_column_id) VALUES(3, 1, '2021-08-07 11:04:04.432', 'This is an example task A', '2022-03-13 23:00:00.000', '2022-03-11 23:00:00.000', 3.0, NULL, 2, 0, NULL, 'Task A', 2, 2);
INSERT INTO kanban_task (id, active, creation_date, description, due_end_date, due_start_date, estimated_time, importance, `number`, order_in_column, tags, title, creator_id, kanban_column_id) VALUES(4, 1, '2021-08-07 11:05:26.597', 'This is an example task E', '2022-03-13 23:00:00.000', '2022-03-09 23:00:00.000', 2.0, NULL, 3, 0, NULL, 'Task E', 1, 1);
INSERT INTO kanban_task (id, active, creation_date, description, due_end_date, due_start_date, estimated_time, importance, `number`, order_in_column, tags, title, creator_id, kanban_column_id) VALUES(5, 1, '2021-08-07 11:05:32.290', 'This is an example task D', '2022-03-12 23:00:00.000', '2022-03-07 23:00:00.000', 2.0, NULL, 4, 1, NULL, 'Task D', 1, 2);
INSERT INTO kanban_task (id, active, creation_date, description, due_end_date, due_start_date, estimated_time, importance, `number`, order_in_column, tags, title, creator_id, kanban_column_id) VALUES(6, 1, '2021-08-07 11:06:55.721', 'This is an example task F', '2022-03-07 23:00:00.000', '2022-03-03 23:00:00.000', 1.0, NULL, 5, 1, NULL, 'Task F', 1, 1);


-- KANBAN TASK CHILDREN (hierarchy)
INSERT INTO kanban_task_children (kanban_task_id, children_id) VALUES(5, 4);
INSERT INTO kanban_task_children (kanban_task_id, children_id) VALUES(6, 5);
INSERT INTO kanban_task_children (kanban_task_id, children_id) VALUES(4, 1);
INSERT INTO kanban_task_children (kanban_task_id, children_id) VALUES(4, 3);


-- KANBAN TASK ASSIGNATION
INSERT INTO kanban_task_assignation (kanban_task_id, assigned_users_id) VALUES(1, 1);
INSERT INTO kanban_task_assignation (kanban_task_id, assigned_users_id) VALUES(1, 2);
INSERT INTO kanban_task_assignation (kanban_task_id, assigned_users_id) VALUES(1, 3);
INSERT INTO kanban_task_assignation (kanban_task_id, assigned_users_id) VALUES(2, 1);


-- EFFORT
INSERT INTO effort (id, description, end_date, start_date, kanban_task_id, user_id) VALUES(1, NULL, '2021-08-15 10:23:13.557000000', '2021-08-15 08:52:01.793000000', 3, 1);
INSERT INTO effort (id, description, end_date, start_date, kanban_task_id, user_id) VALUES(2, NULL, '2021-08-15 10:23:13.557000000', '2021-08-15 08:52:01.793000000', 3, 1);
INSERT INTO effort (id, description, end_date, start_date, kanban_task_id, user_id) VALUES(3, NULL, '2021-08-15 10:23:13.557000000', '2021-08-15 08:52:01.793000000', 3, 1);
INSERT INTO effort (id, description, end_date, start_date, kanban_task_id, user_id) VALUES(4, NULL, '2021-08-15 10:23:13.557000000', '2021-08-15 08:52:01.793000000', 1, 1);
INSERT INTO effort (id, description, end_date, start_date, kanban_task_id, user_id) VALUES(5, NULL, '2021-08-15 10:23:13.557000000', '2021-08-15 08:52:01.793000000', 1, 1);
INSERT INTO effort (id, description, end_date, start_date, kanban_task_id, user_id) VALUES(6, NULL, '2021-08-15 10:23:13.557000000', '2021-08-15 08:52:01.793000000', 5, 1);
INSERT INTO effort (id, description, end_date, start_date, kanban_task_id, user_id) VALUES(7, 'Effort without assigned task', '2021-08-15 10:23:13.557000000', '2021-08-15 08:52:01.793000000', NULL, 1);


-- INCIDENT
INSERT INTO incident (id, affects, `date`, description, estimated_time, priority, status, active, code, last_modification, reported, title, assigned_user_id, user_id, project_id) VALUES(1, 'Scope & €', '2022-02-06 17:44:19.336', 'Profile image cannot updated correctly when it''s updated.', 12.0, 1, 'Done', 1, 1, '2022-02-06 20:13:54.625', 'Excellent client', 'Profile image problems', 3, 2, 1);
INSERT INTO incident (id, affects, `date`, description, estimated_time, priority, status, active, code, last_modification, reported, title, assigned_user_id, user_id, project_id) VALUES(2, 'Scope', '2022-02-06 17:44:19.336', 'Desc 2, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur facilisis eros varius rhoncus. Aliquam eget ipsum egestas, varius magna eu, vehicula quam.', 9.0, 1, 'Done', 1, 2, '2022-02-08 20:13:54.625', 'University', 'Problem changing project id', 4, 1, 1);
INSERT INTO incident (id, affects, `date`, description, estimated_time, priority, status, active, code, last_modification, reported, title, assigned_user_id, user_id, project_id) VALUES(3, '€', '2022-02-06 17:44:19.336', 'Desc 3, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur facilisis eros varius rhoncus. Aliquam eget ipsum egestas, varius magna eu, vehicula quam.', 3.0, 1, 'To do', 1, 3, '2022-02-10 13:13:54.625', 'Big company', 'XSS security vulnerability', 5, 3, 1);
INSERT INTO incident (id, affects, `date`, description, estimated_time, priority, status, active, code, last_modification, reported, title, assigned_user_id, user_id, project_id) VALUES(4, '€', '2022-02-06 17:44:19.336', 'Profile image cannot updated correctly when it''s updated.', 5.0, 1, 'To do', 1, 4, '2022-02-08 20:13:54.625', 'Excellent client', 'JWT security vulnerability', 3, 4, 1);
INSERT INTO incident (id, affects, `date`, description, estimated_time, priority, status, active, code, last_modification, reported, title, assigned_user_id, user_id, project_id) VALUES(5, 'Scope', '2022-02-06 17:44:19.336', 'Desc 4, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur facilisis eros varius rhoncus. Aliquam eget ipsum egestas, varius magna eu, vehicula quam.', 2.0, 1, 'To do', 1, 5, '2022-02-10 13:13:54.625', 'University', 'Project cannot be edited', 4, 3, 1);
INSERT INTO incident (id, affects, `date`, description, estimated_time, priority, status, active, code, last_modification, reported, title, assigned_user_id, user_id, project_id) VALUES(6, '€', '2022-02-06 17:44:19.336', 'Desc 6, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur facilisis eros varius rhoncus. Aliquam eget ipsum egestas, varius magna eu, vehicula quam.', 4.0, 1, 'Done', 1, 6, '2022-02-06 20:13:54.625', 'Big company', 'Profile image problems', 4, 2, 1);
INSERT INTO incident (id, affects, `date`, description, estimated_time, priority, status, active, code, last_modification, reported, title, assigned_user_id, user_id, project_id) VALUES(7, 'Scope', '2022-02-06 17:44:19.336', 'Profile image cannot updated correctly when it''s updated.', 4.0, 1, 'To do', 1, 7, '2022-02-08 20:13:54.625', 'Excellent client', 'Profile image problems', 3, 1, 1);
INSERT INTO incident (id, affects, `date`, description, estimated_time, priority, status, active, code, last_modification, reported, title, assigned_user_id, user_id, project_id) VALUES(8, 'Scope', '2022-02-06 17:44:19.336', 'Profile image cannot updated correctly when it''s updated.', 0.0, 1, 'To do', 1, 8, '2022-02-10 13:13:54.625', 'University', 'Profile image problems', 4, 5, 1);
INSERT INTO incident (id, affects, `date`, description, estimated_time, priority, status, active, code, last_modification, reported, title, assigned_user_id, user_id, project_id) VALUES(9, '€', '2022-02-06 17:44:19.336', 'Profile image cannot updated correctly when it''s updated.', 30.0, 1, 'Done', 1, 9, '2022-02-10 13:13:54.625', 'Excellent client', 'Profile image problems', 3, 6, 1);
INSERT INTO incident (id, affects, `date`, description, estimated_time, priority, status, active, code, last_modification, reported, title, assigned_user_id, user_id, project_id) VALUES(10, 'Scope', '2022-02-06 17:44:19.336', 'Profile image cannot updated correctly when it''s updated.', 1.0, 1, 'Done', 1, 10, '2022-02-08 20:13:54.625', 'Big company', 'Profile image problems', 5, 1, 1);
INSERT INTO incident (id, affects, `date`, description, estimated_time, priority, status, active, code, last_modification, reported, title, assigned_user_id, user_id, project_id) VALUES(11, '€', '2022-02-06 17:44:19.336', 'Profile image cannot updated correctly when it''s updated.', 21.0, 1, 'Done', 1, 11, '2022-02-06 20:13:54.625', 'University', 'Profile image problems', 4, 1, 1);
INSERT INTO incident (id, affects, `date`, description, estimated_time, priority, status, active, code, last_modification, reported, title, assigned_user_id, user_id, project_id) VALUES(12, '€', '2022-02-06 17:44:19.336', 'Profile image cannot updated correctly when it''s updated.', 3.0, 1, 'To do', 1, 12, '2022-02-06 20:13:54.625', 'Big company', 'Profile image problems', 4, 1, 1);
INSERT INTO incident (id, affects, `date`, description, estimated_time, priority, status, active, code, last_modification, reported, title, assigned_user_id, user_id, project_id) VALUES(13, '€', '2022-02-06 17:44:19.336', 'Profile image cannot updated correctly when it''s updated.', 6.0, 1, 'Done', 1, 13, '2022-02-06 20:13:54.625', 'Big company', 'Profile image problems', 3, 1, 1);
INSERT INTO incident (id, affects, `date`, description, estimated_time, priority, status, active, code, last_modification, reported, title, assigned_user_id, user_id, project_id) VALUES(14, 'Scope & €', '2022-02-06 17:44:19.336', 'Profile image cannot updated correctly when it''s updated.', 7.0, 1, 'Done', 1, 14, '2022-02-06 20:13:54.625', 'Excellent client', 'Profile image problems', 5, 1, 1);

-- INCIDENT UPDATE
INSERT INTO incident_update (id, affects, `date`, description, estimated_time, priority, status, assigned_user_id, user_id, incident_id) VALUES(1, 'Scope & €', '2022-02-06 19:49:50.562', 'Image is not updated so well', 12.0, 1, 'To do', 1, 1, 1);
INSERT INTO incident_update (id, affects, `date`, description, estimated_time, priority, status, assigned_user_id, user_id, incident_id) VALUES(2, NULL, '2022-02-06 19:55:22.900', 'Jysus is going to solve this', NULL, NULL, 'In progress', 3, 1, 1);




-- ACTIVES
INSERT INTO active (id, active, code, company, cost, cpe, cpe_type, creation_date, description, end_adquisition, end_of_life, importance, last_modification, location, name, periodicity, product, start_adquisition, subscription_type, `type`, version, created_by_user_id, modified_by_user_id, project_id) VALUES(1, 1, 1, 'Huawei', 600.0, 'cpe:2.3:a:huawei:pcmanager:10.0.5.51:*:*:*:*:*:*:*', 'CPE 2.3', '2022-08-07 16:15:33.334', 'Personal laptop', NULL, NULL, 'High', '2022-08-07 16:15:33.336', 'Seville', 'Matebook D14', 'Once', 'Matebook', '2021-08-07 12:37:55.714', NULL, 'Hardware/Laptop', 'D14 8GB 512GB', 1, 1, 1);
INSERT INTO active (id, active, code, company, cost, cpe, cpe_type, creation_date, description, end_adquisition, end_of_life, importance, last_modification, location, name, periodicity, product, start_adquisition, subscription_type, `type`, version, created_by_user_id, modified_by_user_id, project_id) VALUES(2, 1, 2, 'Microsoft', 5.0, 'cpe:2.3:o:microsoft:windows_11:22H1:*:*:*:*:*:x64:*', 'CPE 2.3', '2022-08-07 17:09:23.086', 'Main Operating System', NULL, NULL, 'High', '2022-08-07 17:09:23.451', 'Seville', 'Personal Windows 11', 'Once', 'Windows 11', '2021-08-07 12:37:55.714', NULL, 'Software/Operating system', '22H1', 1, 1, 1);
INSERT INTO active (id, active, code, company, cost, cpe, cpe_type, creation_date, description, end_adquisition, end_of_life, importance, last_modification, location, name, periodicity, product, start_adquisition, subscription_type, `type`, version, created_by_user_id, modified_by_user_id, project_id) VALUES(3, 1, 3, 'Oracle', 1000, 'cpe:2.3:a:oracle:mysql_enterprise_monitor:8.0.29:*:*:*:*:*:*:*', 'CPE2.3', '2022-08-07 16:15:33.334', 'Oracle Enterprise Monitor', NULL, NULL, 'Critical', '2022-08-07 16:15:33.336', 'Seville', 'MySQL Enterprise Monitor', 'Per year', 'MySQL Enterprise Monitor', '2021-08-07 12:37:55.714', NULL, 'Software/Database', 'Enterprise', 1, 1, 1);




-- ACTIVES USERS
INSERT INTO active_users (id, ips, notes, serial, status, active_id, user_id) VALUES(1, '192.168.1.38', '', '', 'New', 1, 1);

-- ACTIVE CHILDRENS
INSERT INTO active_children (active_id, children_id) VALUES(1, 2);

-- VULNLIB
INSERT INTO vulnlib (id, active, affected_versions, company, creation_date, cvss, cvss_manual, cvss_vector, cwe_type, description, lang, modification_date, name, product, standard, project_id) VALUES(1, 1, 'V15.0.0.22020', 'SCADA', '2022-08-17 10:23:27.963', 7.5, 1, 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H', 'DoS', 'Out-of-bounds Read vulnerability exists that could cause denial of service when an attacker repeatedly sends a specially crafted message.', 'EN-US', '2022-08-17 10:23:27.963', 'CVE-2022-24315', 'Interactive Graphical SCADA System Data Server', 0, 1);
INSERT INTO vulnlib (id, active, affected_versions, company, creation_date, cvss, cvss_manual, cvss_vector, cwe_type, description, lang, modification_date, name, product, standard, project_id) VALUES(2, 1, '3.1.6, 3.2.2 & older', 'Spring', '2022-08-17 10:23:27.963', 9.8, 0, 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H', 'Code injection', 'User can provide a specially crafted SpEL as a routing-expression that may result in remote code execution and access to local resources.', 'EN-US', '2022-08-17 10:23:27.963', 'CVE-2022-22963', 'Spring Cloud Function', 1, NULL);

-- VULNLINK
INSERT INTO vulnlink (id, url, website_name) VALUES(1, 'https://nvd.nist.gov/vuln/detail/CVE-2022-24315', 'NVD');
INSERT INTO vulnlink (id, url, website_name) VALUES(2, 'https://nvd.nist.gov/vuln/detail/CVE-2022-22963', 'NVD');
INSERT INTO vulnlib_vulnlinks (vuln_lib_id, vulnlinks_id) VALUES(1, 1);
INSERT INTO vulnlib_vulnlinks (vuln_lib_id, vulnlinks_id) VALUES(2, 2);

-- VULN
INSERT INTO vuln (id, active, affected_version, affects, code, creation_date, description, fixed, name, new_version, notified, patch_date, patch_type, created_by_user_id, project_id, active_id) VALUES(1, 1, 'Oracle Enterprise Monitor 8.0.29 and previous', 1, 1, '2022-08-18 17:02:58.617', 'Oracle MySQL Enterprise Monitor is affected by Spring4Shell, allowing RCE', 0, 'MySQL Enterprise / Spring4Shell', '8.0.30', 1, '2022-08-22 10:26:31.803', 'To fix', 1, 1, 3);

-- VULN_VULNLIB
INSERT INTO vuln_vulnlib (vuln_id, vulnlib_id) VALUES(1, 2);




-- RISK FREQ
INSERT INTO risk_freq (id, name, quantity, project_id) VALUES(1, 'Very often', 1.0, 1);
INSERT INTO risk_freq (id, name, quantity, project_id) VALUES(2, 'Often', 0.7, 1);
INSERT INTO risk_freq (id, name, quantity, project_id) VALUES(3, 'Normal', 0.4, 1);
INSERT INTO risk_freq (id, name, quantity, project_id) VALUES(4, 'Unusual', 0.1, 1);
INSERT INTO risk_freq (id, name, quantity, project_id) VALUES(5, 'Very unusual', 0.05, 1);

-- RISK DIMENSION
INSERT INTO risk_dim (id, abbreviation, name, project_id) VALUES(1, 'I', 'Integrity', 1);
INSERT INTO risk_dim (id, abbreviation, name, project_id) VALUES(2, 'C', 'Confidentiality', 1);
INSERT INTO risk_dim (id, abbreviation, name, project_id) VALUES(3, 'A', 'Avaliability', 1);

-- RISK 
INSERT INTO risk (id, active, code, creation_date, description, last_modification, name, risk_type, total, total_wo_sfg, active_id, vuln_id, created_by_user_id, modified_by_user_id, project_id) VALUES(1, 1, 1, '2022-09-03 13:44:39.286', 'Water can cause electrical shotcuts in main server room', '2022-09-03 13:44:39.290', 'Flooding server room', 'Natural disaster', 88.00000000000006, 450.0, 1, 1, 1, 1, 1);

-- RISK SFG
INSERT INTO risk_sfg (id, active, description, name) VALUES(1, 1, 'Allows to dewater servers room', 'Bumping system');

-- RISK -> RISK SFG
INSERT INTO risk_risk_sfg (risk_id, risk_sfg_id) VALUES(1, 1);

-- RISK REDUCTION
INSERT INTO risk_sfg_reduction (id, cost, reduction, risk_dim_id) VALUES(1, 100.0, 0.2, 1);
INSERT INTO risk_sfg_reduction (id, cost, reduction, risk_dim_id) VALUES(2, 0.0, 0.2, 2);
INSERT INTO risk_sfg_reduction (id, cost, reduction, risk_dim_id) VALUES(3, 100.0, 0.2, 3);

-- RISK SFG -> RISK REDUCTION
INSERT INTO risk_sfg_risk_sfg_reduction (risk_sfg_id, risk_sfg_reduction_id) VALUES(1, 1);
INSERT INTO risk_sfg_risk_sfg_reduction (risk_sfg_id, risk_sfg_reduction_id) VALUES(1, 2);
INSERT INTO risk_sfg_risk_sfg_reduction (risk_sfg_id, risk_sfg_reduction_id) VALUES(1, 3);

-- RISK CALC
INSERT INTO risk_calc (id, degradation, total, total_wo_sfg, value, risk_dim_id, risk_freq_id) VALUES(1, 1.0, 60.00000000000003, 250.0, 5000.0, 1, 5);
INSERT INTO risk_calc (id, degradation, total, total_wo_sfg, value, risk_dim_id, risk_freq_id) VALUES(2, 0.0, 0.0, 0.0, 10000.0, 2, 5);
INSERT INTO risk_calc (id, degradation, total, total_wo_sfg, value, risk_dim_id, risk_freq_id) VALUES(3, 1.0, 28.00000000000003, 200.0, 4000.0, 3, 5);

-- RISK -> RISK CALC
INSERT INTO risk_risk_calc (risk_id, risk_calc_id) VALUES(1, 1);
INSERT INTO risk_risk_calc (risk_id, risk_calc_id) VALUES(1, 2);
INSERT INTO risk_risk_calc (risk_id, risk_calc_id) VALUES(1, 3);


