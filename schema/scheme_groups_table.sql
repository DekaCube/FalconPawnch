CREATE TABLE GROUPS(
    group_name  VARCHAR(30) PRIMARY KEY,
    owner       VARCHAR(30),
    t_created   INT,
    t_last_used INT,
    members     INT,
    m1          VARCHAR(30),
    m2          VARCHAR(30),
    m3          VARCHAR(30),
    m4          VARCHAR(30),
    m5          VARCHAR(30)
);