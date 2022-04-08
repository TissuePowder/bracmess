const Sequelize = require('sequelize');
const db = require('../config/database')

const Meals = db.define('meals',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		date: {
			type: Sequelize.DATEONLY,
			allowNull: false,
			// unique: 'meals_unique',
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			// unique: 'meals_unique'
		},
		meal_half: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},

		meal_1: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
		meal_2: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 1,
		}

	},

	{
    	timestamps: false
	},

	
);

module.exports = Meals;