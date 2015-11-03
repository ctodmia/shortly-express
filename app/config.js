var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'password',
    database: 'shortlydb',
    charset: 'utf8',
    filename: path.join(__dirname, '../db/shortly.sqlite')
  }
});

db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.string('url', 255);
      link.string('base_url', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.integer('user_id') // Team AFRIKA : 'added foreign key.'
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
        // console.log('This is URLs Table:', table);

});

db.knex.schema.hasTable('clicks').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('clicks', function (click) {
      click.increments('id').primary();
      click.integer('link_id');
      click.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
        // console.log('This is Clicks Table:', shortlydb);

});

/************************************************************/
// Add additional schema definitions below
/************************************************************/


db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 255);
      user.string('password', 255);
      user.string('base_url', 255);
      // There are many links for each user, so the foreign key should sit on LINKS.  Surprise!: It already does.  
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
      // console.log('This is shortlydb:');

});


module.exports = db;


//THIS may be useful:

/*
HasTablem as above, checks for a table's existence by tableName, resolving with a boolean to signal if the table exists.

knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('users', function(t) {
      t.increments('id').primary();
      t.string('first_name', 100);
      t.string('last_name', 100);
      t.text('bio');
    });
  }
});

hasColumnknex.schema.hasColumn(tableName, columnName) 
Checks if a column exists in the current table, resolves the promise with a boolean, true if the column exists, false otherwise.*/