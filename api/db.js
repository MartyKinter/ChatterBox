const { Client } = require("pg");
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
    connectionString: process.env.DB_URI
    });

client.connect();

module.exports = client;
