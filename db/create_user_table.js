//create user table

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://node:demo@192.168.1.20:5432/school';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE Students(id SERIAL PRIMARY KEY, name VARCHAR(100) not null)');
query.on('end', function() { client.end(); });
