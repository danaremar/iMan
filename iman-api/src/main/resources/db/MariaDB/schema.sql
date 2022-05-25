create sequence hibernate_sequence start with 1 increment by 1

    create table effort (
       id bigint not null auto_increment,
        description varchar(255),
        end_date datetime(6),
        start_date datetime(6) not null,
        kanban_task_id bigint,
        user_id bigint not null,
        primary key (id)
    ) engine=InnoDB

    create table file_db (
       id bigint not null,
        content longblob,
        name varchar(255),
        primary key (id)
    ) engine=InnoDB

    create table incident (
       id bigint not null auto_increment,
        affects varchar(50),
        date datetime(6) not null,
        description varchar(255),
        estimated_time double precision check (estimated_time>=0),
        priority integer check (priority<=4 AND priority>=0),
        status varchar(50),
        active bit not null,
        code bigint not null check (code>=0),
        last_modification datetime(6) not null,
        reported varchar(50),
        title varchar(50),
        assigned_user_id bigint,
        user_id bigint not null,
        project_id bigint not null,
        primary key (id)
    ) engine=InnoDB

    create table incident_update (
       id bigint not null auto_increment,
        affects varchar(50),
        date datetime(6) not null,
        description varchar(255),
        estimated_time double precision check (estimated_time>=0),
        priority integer check (priority<=4 AND priority>=0),
        status varchar(50),
        assigned_user_id bigint,
        user_id bigint not null,
        incident_id bigint not null,
        primary key (id)
    ) engine=InnoDB

    create table kanban_column (
       id bigint not null auto_increment,
        active bit,
        column_order bigint not null check (column_order>=0),
        title varchar(50),
        sprint_id bigint not null,
        primary key (id)
    ) engine=InnoDB

    create table kanban_task (
       id bigint not null auto_increment,
        active bit,
        creation_date datetime(6) not null,
        description varchar(255),
        due_end_date datetime(6),
        due_start_date datetime(6),
        estimated_time double precision check (estimated_time>=0),
        importance varchar(50),
        number bigint not null check (number>=0),
        order_in_column bigint not null check (order_in_column>=0),
        title varchar(50),
        creator_id bigint,
        kanban_column_id bigint,
        primary key (id)
    ) engine=InnoDB

    create table kanban_task_assignation (
       kanban_task_id bigint not null,
        assigned_users_id bigint not null
    ) engine=InnoDB

    create table kanban_task_children (
       kanban_task_id bigint not null,
        children_id bigint not null
    ) engine=InnoDB

    create table project2role (
       id bigint not null auto_increment,
        accepted bit,
        role integer not null check (role<=3 AND role>=0),
        project_id bigint not null,
        user_id bigint not null,
        primary key (id)
    ) engine=InnoDB

    create table projects (
       id bigint not null auto_increment,
        active bit not null,
        close_date datetime(6),
        creation_date datetime(6) not null,
        description varchar(255),
        name varchar(50),
        primary key (id)
    ) engine=InnoDB

    create table sprint (
       id bigint not null auto_increment,
        active bit not null,
        close_date date,
        creation_date datetime(6) not null,
        description varchar(255),
        estimated_date date,
        number bigint not null check (number>=1),
        start_date date,
        title varchar(50),
        project_id bigint not null,
        primary key (id)
    ) engine=InnoDB

    create table users (
       id bigint not null auto_increment,
        active bit not null,
        country varchar(2),
        creation_date datetime(6) not null,
        delete_date datetime(6),
        email varchar(50) not null,
        image_uid varchar(64),
        last_connection datetime(6) not null,
        last_name varchar(50),
        name varchar(20),
        password varchar(256),
        sector varchar(20),
        username varchar(15),
        primary key (id)
    ) engine=InnoDB
create index IDXrqyrwy6givisb80tbejhymov9 on effort (start_date)
create index IDX6353cwtsxr6wl7cnx5kclwj4l on effort (end_date)
create index IDX6a54ush3hvwcfl51btwqope2y on file_db (name)
create index IDX2uhypk5hjnma77k1683knjkqd on incident (code)
create index IDXh3ru29jw0naqiyvcac0id6w4a on incident (title)
create index IDXg8pmu317ebe2oefybxx09c1js on incident (reported)
create index IDXnd847hk520kcfa7omds0w63jp on incident (estimated_time)
create index IDXktjwkn9oenlf35ge7p1xkjkul on incident (affects)
create index IDXgx6vlbgbcwtkrfecr4yw4fkks on incident (priority)
create index IDXjn0avahaj6ehw49wna15x2yta on incident (status)
create index IDX7k3vkf7dhoak8ducjd39ft4c3 on incident_update (estimated_time)
create index IDX6bbr6p7c53qrk6w0hpohnqomb on incident_update (affects)
create index IDXbgr02ovemm371oeb4afvwqsgm on incident_update (priority)
create index IDXghiyc6nahrp5mmttbxrvy35bm on incident_update (status)
create index IDXp879ysw99m6bb37jm2xvga805 on kanban_column (title)
create index IDXfv6xqd6v261dgelw4v56507v8 on kanban_task (title)
create index IDXiv18ut5jgt5oceftbk0mcsw6x on kanban_task (number)
create index IDXadroo87hr1qvwvnn30jkofgjm on kanban_task (order_in_column)
create index IDXpewirligl6cnhnnc3veptxt34 on kanban_task (active)
create index IDXh5h4xprg9wa9nq90elrddeqmj on kanban_task (creation_date)
create index IDX81yt6je8efs5sxl9vd5gbb0qw on kanban_task (importance)
create index IDX1e447b96pedrvtxw44ot4qxem on projects (name)
create index IDXiasa27ust0iyfins6t3lyr7xb on projects (creation_date)
create index IDXid3ffqy893q8ndyirxckd8co7 on projects (active)
create index IDXl9jl5xdwmfxittiiqy25992lb on sprint (number)
create index IDX5yv888he3ytj79rdwqscxvoih on sprint (title)
create index IDX49x9kjuv1w7kbppf6fxspfpfi on sprint (creation_date)
create index IDXputs7n8vptuo6tl8cc1rbfvi1 on sprint (start_date)
create index IDXsfiotunig2i9kv96iaet6m92b on sprint (active)
create index IDXbxnwbqj8mn9d928hrweuy6h91 on sprint (close_date)
create index IDXr43af9ap4edm43mmtq01oddj6 on users (username)
create index IDX6dotkott2kjsp8vw4d0m25fb7 on users (email)
create index IDXbjffc6v8amps7fol3p6545ltb on users (creation_date)

    alter table users 
       add constraint UK_6dotkott2kjsp8vw4d0m25fb7 unique (email)

    alter table users 
       add constraint UK_r43af9ap4edm43mmtq01oddj6 unique (username)

    alter table effort 
       add constraint FKarjjw8gt8x4ss1g0nnh46ka1x 
       foreign key (kanban_task_id) 
       references kanban_task (id)

    alter table effort 
       add constraint FKq2idd4bmnh9xf65vki78uml48 
       foreign key (user_id) 
       references users (id)

    alter table incident 
       add constraint FKedfa4cwgyrdhsnxjgbyimob3e 
       foreign key (assigned_user_id) 
       references users (id)

    alter table incident 
       add constraint FK9o12oocjk2ge9dpt2t983hxes 
       foreign key (user_id) 
       references users (id)

    alter table incident 
       add constraint FKt2rs1u4qrx6mxf37v6jb8pyti 
       foreign key (project_id) 
       references projects (id)

    alter table incident_update 
       add constraint FK2h81acr8g2h5e5nl20yvgl8ty 
       foreign key (assigned_user_id) 
       references users (id)

    alter table incident_update 
       add constraint FK9bfulvu2hi9mfvr0sol5lbk4g 
       foreign key (user_id) 
       references users (id)

    alter table incident_update 
       add constraint FK7141v5uvhufdcgs1ri8427xl 
       foreign key (incident_id) 
       references incident (id)

    alter table kanban_column 
       add constraint FKe7orim3gebqqn8clllp5k89am 
       foreign key (sprint_id) 
       references sprint (id)

    alter table kanban_task 
       add constraint FKlu62ou9ljl456qbu8sgwjqp5e 
       foreign key (creator_id) 
       references users (id)

    alter table kanban_task 
       add constraint FKeotf726atxnm9hwnp8rysn40m 
       foreign key (kanban_column_id) 
       references kanban_column (id)

    alter table kanban_task_assignation 
       add constraint FK6sqggmqnfx8rvqqje8ggaqufv 
       foreign key (assigned_users_id) 
       references users (id)

    alter table kanban_task_assignation 
       add constraint FKi0xt9rvuxyjqrdnrkppyxga29 
       foreign key (kanban_task_id) 
       references kanban_task (id)

    alter table kanban_task_children 
       add constraint FK846xnp6he0tqw22n7kfeuxs40 
       foreign key (children_id) 
       references kanban_task (id)

    alter table kanban_task_children 
       add constraint FK76p4h4loa4o1w74uebhu7a9rc 
       foreign key (kanban_task_id) 
       references kanban_task (id)

    alter table project2role 
       add constraint FKeid1g84p56rol7ubakguvjtak 
       foreign key (project_id) 
       references projects (id)

    alter table project2role 
       add constraint FK7a7dss67dqsxyb212a70ldjhb 
       foreign key (user_id) 
       references users (id)

    alter table sprint 
       add constraint FKf4ke41fyshahftsksxsep1e5f 
       foreign key (project_id) 
       references projects (id)
create sequence hibernate_sequence start with 1 increment by 1

    create table effort (
       id bigint not null auto_increment,
        description varchar(255),
        end_date datetime(6),
        start_date datetime(6) not null,
        kanban_task_id bigint,
        user_id bigint not null,
        primary key (id)
    ) engine=InnoDB

    create table file_db (
       id bigint not null,
        content longblob,
        name varchar(255),
        primary key (id)
    ) engine=InnoDB

    create table incident (
       id bigint not null auto_increment,
        affects varchar(50),
        date datetime(6) not null,
        description varchar(255),
        estimated_time double precision check (estimated_time>=0),
        priority integer check (priority<=4 AND priority>=0),
        status varchar(50),
        active bit not null,
        code bigint not null check (code>=0),
        last_modification datetime(6) not null,
        reported varchar(50),
        title varchar(50),
        assigned_user_id bigint,
        user_id bigint not null,
        project_id bigint not null,
        primary key (id)
    ) engine=InnoDB

    create table incident_update (
       id bigint not null auto_increment,
        affects varchar(50),
        date datetime(6) not null,
        description varchar(255),
        estimated_time double precision check (estimated_time>=0),
        priority integer check (priority<=4 AND priority>=0),
        status varchar(50),
        assigned_user_id bigint,
        user_id bigint not null,
        incident_id bigint not null,
        primary key (id)
    ) engine=InnoDB

    create table kanban_column (
       id bigint not null auto_increment,
        active bit,
        column_order bigint not null check (column_order>=0),
        title varchar(50),
        sprint_id bigint not null,
        primary key (id)
    ) engine=InnoDB

    create table kanban_task (
       id bigint not null auto_increment,
        active bit,
        creation_date datetime(6) not null,
        description varchar(255),
        due_end_date datetime(6),
        due_start_date datetime(6),
        estimated_time double precision check (estimated_time>=0),
        importance varchar(50),
        number bigint not null check (number>=0),
        order_in_column bigint not null check (order_in_column>=0),
        title varchar(50),
        creator_id bigint,
        kanban_column_id bigint,
        primary key (id)
    ) engine=InnoDB

    create table kanban_task_assignation (
       kanban_task_id bigint not null,
        assigned_users_id bigint not null
    ) engine=InnoDB

    create table kanban_task_children (
       kanban_task_id bigint not null,
        children_id bigint not null
    ) engine=InnoDB

    create table project2role (
       id bigint not null auto_increment,
        accepted bit,
        role integer not null check (role<=3 AND role>=0),
        project_id bigint not null,
        user_id bigint not null,
        primary key (id)
    ) engine=InnoDB

    create table projects (
       id bigint not null auto_increment,
        active bit not null,
        close_date datetime(6),
        creation_date datetime(6) not null,
        description varchar(255),
        name varchar(50),
        primary key (id)
    ) engine=InnoDB

    create table sprint (
       id bigint not null auto_increment,
        active bit not null,
        close_date date,
        creation_date datetime(6) not null,
        description varchar(255),
        estimated_date date,
        number bigint not null check (number>=1),
        start_date date,
        title varchar(50),
        project_id bigint not null,
        primary key (id)
    ) engine=InnoDB

    create table users (
       id bigint not null auto_increment,
        active bit not null,
        country varchar(2),
        creation_date datetime(6) not null,
        delete_date datetime(6),
        email varchar(50) not null,
        image_uid varchar(64),
        last_connection datetime(6) not null,
        last_name varchar(50),
        name varchar(20),
        password varchar(256),
        sector varchar(20),
        username varchar(15),
        primary key (id)
    ) engine=InnoDB
create index IDXrqyrwy6givisb80tbejhymov9 on effort (start_date)
create index IDX6353cwtsxr6wl7cnx5kclwj4l on effort (end_date)
create index IDX6a54ush3hvwcfl51btwqope2y on file_db (name)
create index IDX2uhypk5hjnma77k1683knjkqd on incident (code)
create index IDXh3ru29jw0naqiyvcac0id6w4a on incident (title)
create index IDXg8pmu317ebe2oefybxx09c1js on incident (reported)
create index IDXnd847hk520kcfa7omds0w63jp on incident (estimated_time)
create index IDXktjwkn9oenlf35ge7p1xkjkul on incident (affects)
create index IDXgx6vlbgbcwtkrfecr4yw4fkks on incident (priority)
create index IDXjn0avahaj6ehw49wna15x2yta on incident (status)
create index IDX7k3vkf7dhoak8ducjd39ft4c3 on incident_update (estimated_time)
create index IDX6bbr6p7c53qrk6w0hpohnqomb on incident_update (affects)
create index IDXbgr02ovemm371oeb4afvwqsgm on incident_update (priority)
create index IDXghiyc6nahrp5mmttbxrvy35bm on incident_update (status)
create index IDXp879ysw99m6bb37jm2xvga805 on kanban_column (title)
create index IDXfv6xqd6v261dgelw4v56507v8 on kanban_task (title)
create index IDXiv18ut5jgt5oceftbk0mcsw6x on kanban_task (number)
create index IDXadroo87hr1qvwvnn30jkofgjm on kanban_task (order_in_column)
create index IDXpewirligl6cnhnnc3veptxt34 on kanban_task (active)
create index IDXh5h4xprg9wa9nq90elrddeqmj on kanban_task (creation_date)
create index IDX81yt6je8efs5sxl9vd5gbb0qw on kanban_task (importance)
create index IDX1e447b96pedrvtxw44ot4qxem on projects (name)
create index IDXiasa27ust0iyfins6t3lyr7xb on projects (creation_date)
create index IDXid3ffqy893q8ndyirxckd8co7 on projects (active)
create index IDXl9jl5xdwmfxittiiqy25992lb on sprint (number)
create index IDX5yv888he3ytj79rdwqscxvoih on sprint (title)
create index IDX49x9kjuv1w7kbppf6fxspfpfi on sprint (creation_date)
create index IDXputs7n8vptuo6tl8cc1rbfvi1 on sprint (start_date)
create index IDXsfiotunig2i9kv96iaet6m92b on sprint (active)
create index IDXbxnwbqj8mn9d928hrweuy6h91 on sprint (close_date)
create index IDXr43af9ap4edm43mmtq01oddj6 on users (username)
create index IDX6dotkott2kjsp8vw4d0m25fb7 on users (email)
create index IDXbjffc6v8amps7fol3p6545ltb on users (creation_date)

    alter table users 
       add constraint UK_6dotkott2kjsp8vw4d0m25fb7 unique (email)

    alter table users 
       add constraint UK_r43af9ap4edm43mmtq01oddj6 unique (username)

    alter table effort 
       add constraint FKarjjw8gt8x4ss1g0nnh46ka1x 
       foreign key (kanban_task_id) 
       references kanban_task (id)

    alter table effort 
       add constraint FKq2idd4bmnh9xf65vki78uml48 
       foreign key (user_id) 
       references users (id)

    alter table incident 
       add constraint FKedfa4cwgyrdhsnxjgbyimob3e 
       foreign key (assigned_user_id) 
       references users (id)

    alter table incident 
       add constraint FK9o12oocjk2ge9dpt2t983hxes 
       foreign key (user_id) 
       references users (id)

    alter table incident 
       add constraint FKt2rs1u4qrx6mxf37v6jb8pyti 
       foreign key (project_id) 
       references projects (id)

    alter table incident_update 
       add constraint FK2h81acr8g2h5e5nl20yvgl8ty 
       foreign key (assigned_user_id) 
       references users (id)

    alter table incident_update 
       add constraint FK9bfulvu2hi9mfvr0sol5lbk4g 
       foreign key (user_id) 
       references users (id)

    alter table incident_update 
       add constraint FK7141v5uvhufdcgs1ri8427xl 
       foreign key (incident_id) 
       references incident (id)

    alter table kanban_column 
       add constraint FKe7orim3gebqqn8clllp5k89am 
       foreign key (sprint_id) 
       references sprint (id)

    alter table kanban_task 
       add constraint FKlu62ou9ljl456qbu8sgwjqp5e 
       foreign key (creator_id) 
       references users (id)

    alter table kanban_task 
       add constraint FKeotf726atxnm9hwnp8rysn40m 
       foreign key (kanban_column_id) 
       references kanban_column (id)

    alter table kanban_task_assignation 
       add constraint FK6sqggmqnfx8rvqqje8ggaqufv 
       foreign key (assigned_users_id) 
       references users (id)

    alter table kanban_task_assignation 
       add constraint FKi0xt9rvuxyjqrdnrkppyxga29 
       foreign key (kanban_task_id) 
       references kanban_task (id)

    alter table kanban_task_children 
       add constraint FK846xnp6he0tqw22n7kfeuxs40 
       foreign key (children_id) 
       references kanban_task (id)

    alter table kanban_task_children 
       add constraint FK76p4h4loa4o1w74uebhu7a9rc 
       foreign key (kanban_task_id) 
       references kanban_task (id)

    alter table project2role 
       add constraint FKeid1g84p56rol7ubakguvjtak 
       foreign key (project_id) 
       references projects (id)

    alter table project2role 
       add constraint FK7a7dss67dqsxyb212a70ldjhb 
       foreign key (user_id) 
       references users (id)

    alter table sprint 
       add constraint FKf4ke41fyshahftsksxsep1e5f 
       foreign key (project_id) 
       references projects (id)
