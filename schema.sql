CREATE DATABASE ExpensesTracker;

USE ExpensesTracker;

CREATE TABLE expense(
category VARCHAR(30) NOT NULL,
amount INT NOT NULL,
datee  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
