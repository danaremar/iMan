-- USERS
INSERT INTO iman_db.users(id, username, name, last_name, email, password, country, sector, creation_date, delete_date, last_connection, active) VALUES(1, 'danaremar', 'Daniel', 'Arellano Martinez', 'danaremar@alum.us.es', '{i+ceiUcHixxmiV82NpMls+mPiXkPn+J68+eIIFL8T6s=}f2579743cd02706c19c84f106eb2036fed160e20edd80974b2d54a5c5f7782c4', 'ES', 'Ingenieria', '2021-01-31 12:25:01', NULL, '2021-01-31 12:25:01', 1);
INSERT INTO iman_db.users(id, active, country, creation_date, delete_date, email, last_connection, last_name, name, password, sector, username) VALUES(2, 1, 'ES', '2021-02-22 12:25:01', NULL, 'danny@danny.es', '2021-02-22 12:25:01', 'Arellano Martinez', 'Daniel', 'danny', 'Ingenieria', 'danny');

-- PROJECTS
INSERT INTO iman_db.projects(id, active, creation_date, delete_date, description, name) VALUES(1, 1, '2021-01-31 12:25:01', NULL, 'Incredible project', 'DEMO PROJECT');

-- PROJECT2ROLE
INSERT INTO iman_db.project2role(id, accepted, `role`, project_id, user_id) VALUES(1, 1, 0, 1, 1);
--INSERT INTO iman_db.project2role(id, accepted, `role`) VALUES(1, 1, 0);

--PROJECTS_PROJECT_ROLES
--INSERT INTO iman_db.projects_project_roles(project_id, project_roles_id) VALUES(1, 1);




--select * from sprint s where s.active = 1 order by s.`number` desc,