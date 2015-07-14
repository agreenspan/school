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
    return this.hasOne(Contact);
  }
})

var Contact = bookshelf.Model.extend({
  tableName: 'contacts',
  student: function() {
    return this.belondsTo(Student);
  }
})

var Path = require('path');
var Hapi = require('hapi');
var Handlebars = require('handlebars');

var server = new Hapi.Server();
server.connection({ port: 3210 });


var index_handler = function (request, reply) {
    var context = {
        title: 'Student Index',
        list: new Student().fetch()
    };
    return reply.view('index', context);
};

var student_handler = function (request, reply) {
    var student_id = parseInt(request.params.student_id);
    var context = {
        title: 'Student View',
        name: new Student({'id': student_id}).fetch(),
        contact: new Contact({'student_id': student_id}).fetch()
    };
    return reply.view('student', context);
};

server.route([
  { method: 'GET', path: '/', handler: index_handler } ,
  { method: 'GET', path: '/students/{student_id}', handler: student_handler }
]);

server.views({
    engines: {
        html: require('handlebars')
    },
    relativeTo: __dirname,
    path: './views',
    helpersPath: './views/helpers'
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
