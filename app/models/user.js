var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  // initialize: function() {
  //   this.on('creating', function(model, attrs, options) {
  //     var shasum2 = bcrypt.hash('sha2');
  //     bcrypt.compare(model.get('user'), hash, function(err, res) {res == true});
  //     model.set('code', shasum2.digest('hex').slice(0, 5));
  //   });
  // }
});


module.exports = User;