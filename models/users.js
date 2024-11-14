const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure usernames are unique
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure emails are unique
        validate: {
            isEmail: true, // Validate that the input is a valid email format
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // Password should not be null
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true, // Location can be optional
    },
});

const bcrypt = require('bcrypt');

const createUser = async (username, email, password, location) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    User.create({
        username: username,
        email: email,
        password: hashedPassword,
        location: location,
    })
    .then(user => {
        console.log('User created:', user);
    })
    .catch(error => {
        console.error('Error creating user:', error);
    });
};
