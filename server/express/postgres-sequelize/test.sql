// ENABLE UUID 
// uuid_generate_v4()
// contact_id uuid DEFAULT uuid_generate_v4 ()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";



//RELATIONSHIPS

// ONE TO ONE 

CREATE TABLE IF NOT EXISTS passport_number (
    passport_number_uid UUID NOT NULL PRIMARY KEY,
    number VARCHAR(12) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL, 
    total INT NOT NULL
);

CREATE TABLE IF NOT EXISTS passport (
    passport_uid UUID NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    passport_number_uid UUID NOT NULL UNIQUE REFERENCES passport_number(passport_number_uid)
);

INSERT INTO passport_number VALUES (uuid_generate_v4(), 'KH2309093PB1');
INSERT INTO passport_number VALUES (uuid_generate_v4(), 'KH2315025PB1');

INSERT INTO passport VALUES (uuid_generate_v4(), 'Ilya Korzhavin', '42796a7a-e88b-464f-ba75-dc687fe11f37');
INSERT INTO passport VALUES (uuid_generate_v4(), 'Svetlana Korzhavina', '7837abff-93de-4ccc-a910-d98f405867c1');

// ONE TO MANY

CREATE TABLE IF NOT EXISTS book (
    book_uid UUID NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS page (
    page_uid UUID NOT NULL PRIMARY KEY,
    number INTEGER NOT NULL,
    book_uid UUID NOT NULL REFERENCES book(book_uid) 
);

INSERT INTO book VALUES (uuid_generate_v4(), 'The Braille edition of the book Exam Warriors', 'PM Narendra Modi');
INSERT INTO book VALUES (uuid_generate_v4(), 'Believe-What Life and Cricket Taught Me', 'Suresh Raina');
INSERT INTO book VALUES (uuid_generate_v4(), 'Whereabouts', 'Jhumpa Lahiri');

INSERT INTO page VALUES (uuid_generate_v4(), 1, '31b66d67-8c76-4c1b-ba02-45e283eafba5');
INSERT INTO page VALUES (uuid_generate_v4(), 2, '31b66d67-8c76-4c1b-ba02-45e283eafba5');
INSERT INTO page VALUES (uuid_generate_v4(), 1, '9db472e1-b0ce-44d9-83cf-02b11589f874');

// MANY TO MANY

CREATE TABLE IF NOT EXISTS student (
    student_uid UUID NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS class (
    class_uid UUID NOT NULL PRIMARY KEY,
    course VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS student_class_relation (
    student_uid UUID NOT NULL REFERENCES student(student_uid),
    class_uid UUID NOT NULL REFERENCES class(class_uid),
    UNIQUE (student_uid, class_uid)
);

INSERT INTO student VALUES (uuid_generate_v4(), 'Ilya Korzhavin');
INSERT INTO student VALUES (uuid_generate_v4(), 'Svetlana Korzhavina');

INSERT INTO class VALUES (uuid_generate_v4(), 'English');
INSERT INTO class VALUES (uuid_generate_v4(), 'Computer Science');
INSERT INTO class VALUES (uuid_generate_v4(), 'History');
INSERT INTO class VALUES (uuid_generate_v4(), 'Chemistry');

INSERT INTO student_class_relation VALUES ('aa6f3ff7-bf88-47c4-958f-23f6d3db84dc', '7dbc3a0b-ba16-4770-96fc-30a74294766b');
INSERT INTO student_class_relation VALUES ('aa6f3ff7-bf88-47c4-958f-23f6d3db84dc', 'b0be4bbb-ca0a-4c46-bbec-455a10fff951');
INSERT INTO student_class_relation VALUES ('d2a90653-efc6-4a8c-a9c1-ae05645efbb1', '0cd2ad75-6234-498a-88ae-3b7255c10635');
INSERT INTO student_class_relation VALUES ('d2a90653-efc6-4a8c-a9c1-ae05645efbb1', '0ab9f092-ccdb-4b84-ae13-980b9ae02ac7');
INSERT INTO student_class_relation VALUES ('d2a90653-efc6-4a8c-a9c1-ae05645efbb1', '7dbc3a0b-ba16-4770-96fc-30a74294766b');

SELECT course, COUNT(*)
FROM student_class_relation
JOIN student USING(student_uid)
JOIN class USING(class_uid)
GROUP BY course;

