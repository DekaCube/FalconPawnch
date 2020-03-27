CREATE TABLE TOKENS(
    token       VARCHAR(100) PRIMARY KEY,
    t_created   INT,
    t_last_used INT,
    user        VARCHAR(30) NOT NULL,
    UNIQUE KEY unique_user(user),
    CONSTRAINT fk_tokens
    FOREIGN KEY(user) REFERENCES USERS(username)
    ON DELETE CASCADE
    );
    
    
