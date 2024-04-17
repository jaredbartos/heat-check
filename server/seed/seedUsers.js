const { User } = require('../models');
const db = require('../config/connection');

// Function to seed users
const seedUsers = async data => {
	const users = await User.find();

	if (users.length) {
		await db.dropCollection('users');
	}

	await User.create(data);
};

module.exports = seedUsers;
