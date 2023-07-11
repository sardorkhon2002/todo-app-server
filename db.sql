CREATE TABLE If Not Exists task
(
    id          varchar(50)             not null
        constraint task_pk
            primary key,
    title       varchar(50)             not null,
    status      varchar(50)             not null,
    "createdAt" timestamp default now() not null,
    "updatedAt" timestamp default now() not null
);