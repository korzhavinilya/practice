CREATE TABLE Client (
    client_uid UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL 
);

CREATE TABLE Role (
    role_uid UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE ClientRole (
    client_uid UUID,
    role_uid UUID,
    PRIMARY KEY (client_uid, role_uid),
    FOREIGN KEY (client_uid) REFERENCES Client (client_uid),
    FOREIGN KEY (role_uid) REFERENCES Role (role_uid)
);

SELECT username, name as role
FROM ClientRole
JOIN Client USING(client_uid)
JOIN Role USING(role_uid);

CREATE UNIQUE INDEX ON client(username);

