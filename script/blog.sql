DROP TABLE IF EXISTS user ;
create table user(
    u_id int auto_increment,
    u_name varchar(30) not null,
    u_pwd varchar(20) not null,
    u_email varchar(30) not null,
    create_time timestamp default current_timestamp,
    constraint user_pk primary key(u_id)
);



DROP TABLE IF EXISTS article;
create table article(
    a_id int auto_increment,
    a_title varchar(100) not null,
    a_content text not null,
    u_id int not null,
    create_time timestamp default current_timestamp,
    constraint article_pk primary key(a_id),
    constraint article_user_fk foreign key(u_id) references user(u_id)
);

DROP TABLE IF EXISTS comment;
create table comment(
    c_id int auto_increment,
    c_content tinytext not null,
    a_id int not null,
    create_time timestamp default current_timestamp,
    constraint comment_pk primary key(c_id),
    constraint coment_article_fk foreign key(a_id) references article(a_id)
);

insert into user(u_name,u_pwd,u_email) values('tom','123456','mz.tang@ot24.com');
insert into article (a_title,a_content,u_id)values('随笔','Hello every one !Today is 2015 january the 22th ! ',1);
insert into comment(c_content,a_id )values("great !",1);
