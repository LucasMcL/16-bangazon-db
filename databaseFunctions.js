'use strict'

/**
 * This script contains functions for the following tasks:
 * 	- Creating the bangazon database
 * 	- Creating the tables
 * 	- Populating the tables
 */

const {Database} = require('sqlite3')
const db = new Database('bangazon.sqlite')


function createCustomers() {
	db.run(`CREATE TABLE IF NOT EXISTS 'customers' (
		'customerId' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		'name' TEXT,
		'address' TEXT,
		'city' TEXT,
		'state' TEXT,
		'postalCode' TEXT,
		'phoneNumber' TEXT
		)`)
}

function createPaymentOptions() {
		db.run(`CREATE TABLE IF NOT EXISTS 'payment_options' (
		'paymentOptionId' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		'paymentName' TEXT,
		'accountNumber' TEXT
		)`)
}

function createOrders() {
	db.run(`CREATE TABLE IF NOT EXISTS 'orders' (
		'orderId' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		'customerId' INTEGER NOT NULL,
		'paymentOptionId' INTEGER NOT NULL,
		'paidInFull' INTEGER NOT NULL,
		FOREIGN KEY ('customerId') REFERENCES customers(customerId),
		FOREIGN KEY ('paymentOptionId') REFERENCES payment_options(paymentOptionId)
		)`)
}
// `customerId`	TEXT,
// 	FOREIGN KEY(`customerId`) REFERENCES customers(customerId)















