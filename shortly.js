var express = require('express');
var util = require('./lib/utility');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var session = require('express-session');


var db = require('./app/config');
var Users = require('./app/collections/users');
var User = require('./app/models/user');
var Links = require('./app/collections/links');
var Link = require('./app/models/link');
var Click = require('./app/models/click');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret:'this is secret',
  resave: false,
  saveUninitialized: true
}))

app.get('/', // TO DO: Attach authentication for conditional access. 
function(req, res) {
   if (session.loggedIn) {
    res.render('index'); // Responds with the index.ejs page.
   } else{
    res.redirect('/login');
   }
   // Example: if(userIsAuthenticated) {res.render('index')};
});

app.get('/create', // TO DO: Attach authentication for conditional access.
function(req, res) { 
app.use(session({
    secret:'this is secret',
    resave: false,
    saveUninitialized: true
  }))
   if (session.loggedIn) {
    res.render('index'); // Responds with the index.ejs page.
   } else {
    res.redirect('/login');
   }
  //  Example: if(userIsAuthenticated) {res.render('index')};
});

app.get('/login', //All Links sub-page
function(req, res) {
  res.render('login'); 
});

app.get('/signup', //All Links sub-page
function(req, res) {
  res.render('signup'); 
});

app.get('/links', 
function(req, res) {
  app.use(session({
    secret:'this is secret',
    resave: false,
    saveUninitialized: true
  }))
   if (session.loggedIn) {
    res.render('index'); // Responds with the index.ejs page.
    Links.reset().fetch().then(function(links) {
      res.send(200, links.models);
    });
   } else{
    res.redirect('/login');
   }
});

// app.post('/signup', function (req, res){
//   var userName = req.body.username;
//   var userPassword = req.body.password;
//   console.log('username and password are:', userName, userPassword);
//     res.send(200);
// })


app.post('/links', 
function(req, res) {
  var uri = req.body.url;
  console.log('Here I am!!!')

  if (!util.isValidUrl(uri)) {
    // console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  new Link({ url: uri }).fetch().then(function(found) {
    if (found) {
      res.send(200, found.attributes);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }

        var link = new Link({
          url: uri,
          title: title,
          base_url: req.headers.origin
        });
        link.save().then(function(newLink) {
          Links.add(newLink);
        // console.log('newLink is: ', newLink);
          res.send(200, newLink);
        });
      });
    }
  });
});

//NEW and experimental!:

app.post('/signup', 
  function(req, res) {
    var userName = req.body.username;
    var userPassword = req.body.password;
    console.log('Doin it!!!');

  new User( { username: userName } ) //checked the database
  .fetch() 
  .then( function (req, res, user) { // let's make promises!
    if (!user) {
      var user = new User({
        username: userName,
        password: userPassword,
      });
      // req.session.regenerate(function (err) {
      //   console.log(req.session);
      // }
      //console.log('re:', user);
      res.redirect('/create');
      user.save()
      .then(function(newUser) {
      //User.add(newUser);
      res.send(200, newUser);
    })
    } else {
      
      // TODO: maybe check that the password matches a db password...
      res.redirect('/create');
    }
  })
});

/************************************************************/
// Write your dedicated authentication routes here
// e.g. login, logout, etc.
/************************************************************/




//if( login data authenticated) {
  //use Bookshelf to Render the linksView}
//} else {
  // render signup form
//   }
  
//if( user clicks logout button) {
  //user is re-directed to ./login page
//}


//save username and pwd in database
//when the user makes a GET request they should be served, 
//layout.ejs/login.ejs
//

/************************************************************/
// Handle the wildcard route last - if all other routes fail
// assume the route is a short code and try and handle it here.
// If the short-code doesn't exist, send the user to '/'
/************************************************************/

app.get('/*', function(req, res) {
  new Link({ code: req.params[0] }).fetch().then(function(link) {
    if (!link) {
      res.redirect('/');
    } else {
      var click = new Click({
        link_id: link.get('id')
      });

      click.save().then(function() {
        db.knex('urls')
          .where('code', '=', link.get('code'))
          .update({
            visits: link.get('visits') + 1,
          }).then(function() {
            return res.redirect(link.get('url'));
          });
      });
    }
  });
});

console.log('Shortly is listening on 4568');
app.listen(4568);
