DROP TABLE IF EXISTS user ;
create table user(
    u_id int auto_increment,
    u_name varchar(128) unique  not null,
    u_pwd varchar(128) not null,
    u_email varchar(128) not null,
    create_time timestamp default current_timestamp,
    constraint user_pk primary key(u_id)
)ENGINE = InnoDB default charset = utf8;

DROP TABLE IF EXISTS article;
create table article(
    a_id int auto_increment,
    a_title varchar(128) not null,
    a_content text not null,
    u_name varchar(128) not null,
    a_status int default 0,
    a_read int default 0,
    a_favour int default 0,
    create_time timestamp default current_timestamp,
    constraint article_pk primary key(a_id),
    constraint article_user_fk foreign key(u_name) references user(u_name) ON DELETE CASCADE
)ENGINE = InnoDB default charset = utf8;

DROP TABLE IF EXISTS comment;
create table comment(
    c_id int auto_increment,
    c_content varchar(512) not null,
    a_id int not null,
    u_name varchar(128) not null,
    create_time timestamp default current_timestamp,
    constraint comment_pk primary key(c_id),
    constraint comment_article_fk foreign key(a_id) references article(a_id) on delete CASCADE,
    constraint comment_user_fk foreign key(u_name) references user(u_name) on delete CASCADE
)ENGINE = InnoDB default charset = utf8;

DROP TABLE IF EXISTS favour;
create table favour(
    a_id int not null,
    u_name varchar(128) not null,
    create_time timestamp default current_timestamp,
    constraint favour_pk primary key (a_id, u_name),
    constraint article_favour_fk foreign key (a_id) references article(a_id) ON DELETE CASCADE,
    constraint user_favour_fk foreign key (u_name) references user(u_name) ON DELETE CASCADE
)ENGINE = InnoDB default charset = utf8;

DROP TABLE IF EXISTS message;
create table message(
    id int primary key auto_increment,
    article_id int,
    comment_id int,
    commender_id int,
    reminder_id int,
    message varchar(512),
    has_read int //0 never read ,1 has read
)ENGINE = InnoDB default charset = utf8;

