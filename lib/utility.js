var request = require('request');



exports.getUrlTitle = function(url, cb) {
  request(url, function(err, res, html) {
    if (err) {
      console.log('Error reading url heading: ', err);
      return cb(err);
    } else {
      var tag = /<title>(.*)<\/title>/;
      var match = html.match(tag);
      var title = match ? match[1] : url;
      return cb(err, title);
    }
  });
};

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

/************************************************************/
// Add additional utility functions below
/************************************************************/


//UPDATES from DhiMalo:

//TO DO : Create an isLoggedIn boolean.  It flips to true once a user logs in.  It flips to false at logout.

exports.checkIfLoggedIn = function(user, cb) {
    //if user has a session attached, then next
      // TO DO: See if the users name is located in the users "user column"
    // To do this, use a database query
    // db.query using mySqLite? Figure out how to do that.
}

exports.isLoggedIn = function () {
  var bool = false;
  if (true) { // replace 'true' here with checkIfLoggedIn to test functionality.
    bool = true;
  }
  // TO DO: Add results descending from the checkIfLoggedIn function.  Return a boolean.
    return bool; // !!ATTENTION!! Temporarily making this true until we need to ACTUALLY validate users.
}

exports.getValidUser = function(user, cb) {
  request(user, function(err, res) {
    if (err) {
      console.log('You are not a registered Shortly user.', err);
      return cb(err);
    } else {
      bcrypt.compare(model.get('user'), hash, function(err, res) {res == true});
      (User.get('password')) //this returns the password of the user.
      var validUser = user;
      return validUser;
      // var isValidUser = match ? match[1] : console.log (''); // if match exists, return match[1], or if it does not exist, then...
      //...not sure how to continue here.  Want to compare existing DB with current user.
    }   
  });
}

exports.isValidUser = function(user) {
  return user.match(/*something here*/);
};

