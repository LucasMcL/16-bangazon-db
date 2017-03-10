'use strict'

// Todo: shorter function names in export

/**
 * This script contains functions for the following tasks:
 * 	- Creating the bangazon database
 * 	- Creating the tables
 * 	- Populating the tables
 * 	- Deleting the tables' data
 */

const {Database} = require('sqlite3')
const db = new Database('bangazon.sqlite')


///////////////////
// Create Tables //
///////////////////

function createCustomers() {
	db.run(`CREATE TABLE IF NOT EXISTS 'customers' (
		'customerId' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		'name' TEXT,
		'address' TEXT,
		'city' TEXT,
		'state' TEXT,
		'postalCode' TEXT,
		'phoneNumber' TEXT
		);`)
}

function createPaymentOptions() {
		db.run(`CREATE TABLE IF NOT EXISTS 'payment_options' (
		'paymentOptionId' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		'paymentName' TEXT,
		'accountNumber' TEXT
		);`)
}

function createProducts() {
	db.run(`CREATE TABLE IF NOT EXISTS 'products' (
		'productId' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		'productName' INTEGER,
		'productPrice' INTEGER
		);`)
}

function createOrders() {
	db.run(`CREATE TABLE IF NOT EXISTS 'orders' (
		'orderId' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		'customerId' INTEGER NOT NULL,
		'paymentOptionId' INTEGER NOT NULL,
		'paidInFull' INTEGER CHECK(paidInFull = 1 or paidInFull = -1),
		FOREIGN KEY ('customerId') REFERENCES customers(customerId),
		FOREIGN KEY ('paymentOptionId') REFERENCES payment_options(paymentOptionId)
		);`)
}

function createOrderLineItems() {
	db.run(`CREATE TABLE IF NOT EXISTS 'order_line_items' (
		'lineItemId' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		'orderId' INTEGER NOT NULL,
		'productId' INTEGER NOT NULL,
		FOREIGN KEY ('orderId') REFERENCES orders(orderId),
		FOREIGN KEY ('productId') REFERENCES products(productId)
		);`)
}

function createAll() {
	createCustomers()
	createProducts()
	createPaymentOptions()
	createOrders()
	createOrderLineItems()
}

/////////////////////
// Populate Tables //
/////////////////////

// populates database with customer, product, and payment option information

function populateCustomers() {
	const {customers} = require('./test_data/customers.json')

	customers.forEach(customer => {
		const {name, address, city, state, postalCode, phoneNumber} = customer
		db.run(`INSERT INTO customers (customerId, name, address, city, state, postalCode, phoneNumber)
			VALUES (null, "${name}", "${address}", "${city}", "${state}", "${postalCode}", "${phoneNumber}");
			`)
	})
}

function populatePaymentOptions() {
	const {paymentOptions} = require('./test_data/payment_options.json')

	paymentOptions.forEach(paymentOption => {
		const {paymentName, accountNumber} = paymentOption
		db.run(`INSERT INTO payment_options (paymentOptionId, paymentName, accountNumber)
			VALUES (null, "${paymentName}", "${accountNumber}");
			`)
	})
}

function populateProducts() {
	const {products} = require('./test_data/products.json')

	products.forEach(product => {
		const {productName, productPrice} = product
		db.run(`INSERT INTO products (productId, productName, productPrice)
			VALUES (null, "${productName}", "${productPrice}");`)
	})
}

function populateAll() {
	populateProducts()
	populateCustomers()
	populatePaymentOptions()
}

/////////////
// Delete  //
/////////////

function wipeData() {
	db.run(`DELETE FROM customers`)
	db.run(`DELETE FROM products`)
	db.run(`DELETE FROM payment_options`)
	db.run(`DELETE FROM orders`)
	db.run(`DELETE FROM order_line_items`)
}

function dropTables() {
	db.run(`DROP TABLE customers`)
	db.run(`DROP TABLE products`)
	db.run(`DROP TABLE payment_options`)
	db.run(`DROP TABLE orders`)
	db.run(`DROP TABLE order_line_items`)
}

// Export functions
module.exports = {
	create: {createCustomers, createPaymentOptions, createProducts, createOrders, createOrderLineItems, createAll},
	populate: {populateCustomers, populatePaymentOptions, populateProducts, populateAll},
	delete: {wipeData, dropTables}
}

