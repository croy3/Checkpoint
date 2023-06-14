-- SQLBook: Code
DROP DATABASE IF EXIST checkpoint;

CREATE DATABASE checkpoint;

USE checkpoint;

DROP TABLE IF EXIST project;

CREATE TABLE
    project (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR (100) NOT NULL,
        description TEXT NOT NULL,
        image_address VARCHAR (255),
        creation_date DATE NOT NULL
    ) engine = InnoDB;

DROP TABLE IF EXIST 'user';

CREATE TABLE
    `user` (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        login VARCHAR (50) NOT NULL,
        password VARCHAR (50) NOT NULL
    ) engine = InnoDB;