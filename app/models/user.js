var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      var shasum2 = bcrypt.createHash('sha2');
      shasum2.update(model.get('user'));
      model.set('code', shasum2.digest('hex').slice(0, 5));
    });
  }
});


module.exports = User;