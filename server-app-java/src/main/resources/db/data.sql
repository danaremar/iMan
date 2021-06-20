-- USERS
INSERT INTO iman_db.users(id, username, name, last_name, email, password, country, sector, creation_date, delete_date, last_connection, active) VALUES(1, 'danaremar', 'Daniel', 'Arellano Martinez', 'danaremar@alum.us.es', 'shuloshulo', 'ES', 'Ingenieria', '2021-01-31 12:25:01', NULL, '2021-01-31 12:25:01', 1);
INSERT INTO iman_db.users(id, active, country, creation_date, delete_date, email, last_connection, last_name, name, password, sector, username) VALUES(2, 1, 'ES', '2021-02-22 12:25:01', NULL, 'danny@danny.es', '2021-02-22 12:25:01', 'Arellano Martinez', 'Daniel', 'danny', 'Ingenieria', 'danny');


--select * from sprint s where s.active = 1 order by s.`number` desc,