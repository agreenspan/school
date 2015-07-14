//create contact table

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://node:demo@192.168.1.20:5432/school';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE Contacts('+
  'id SERIAL PRIMARY KEY, '+
  'student_id integer not null, '+
  'address varchar(100) not null, '+
  'city varchar(100) not null, '+
  'state varchar(2) not null, '+
  'zip integer not null, '+
  'phone bigint not null)');
query.on('end', function() { client.end(); });



