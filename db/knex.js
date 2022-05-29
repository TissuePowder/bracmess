require('dotenv').config({path: '../.env'});
const knex = require('knex');
const knexfile = require('./knexfile');

const mode = process.env.DEV_MODE;
module.exports = knex(knexfile[mode]);
