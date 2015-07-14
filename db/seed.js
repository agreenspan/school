var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '192.168.1.20',
    port     : '5432',
    user     : 'node',
    password : 'demo',
    database : 'school',
    charset  : 'utf8'
  }
});
var bookshelf = require('bookshelf')(knex);

var Student = bookshelf.Model.extend({
  tableName: 'students',
  contact: function() {
    return this.hasOne(contact);
  }
})

var Contact = bookshelf.Model.extend({
  tableName: 'contacts',
  student: function() {
    return this.belondsTo(student);
  }
})

fs = require('fs');
var parse = require('csv-parse');
var parser = parse( function(err, data) {
  for ( i=0 ; i < data.length ; i++ ) {
    var info = data[i];
    var name = info[1]+", "+info[0];
    var address = info[3];
    var city = info[4];
    var state = info[6];
    var zip = info[7];
    var phone = parseInt(info[8].replace(/-/g,""));
    var s = new Student({ name: name }).save();
    var c = new Contact({
      student_id: s.id,
      address: address,
      city: city,
      state: state,
      zip: zip,
      phone: phone
    }).save();
  };
});

fs.createReadStream(__dirname+'/us-500.csv').pipe(parser);


console.log("finished");