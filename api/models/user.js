var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	username: String,
	email : String ,
	password: String ,
	created_at : String 
}),
user = mongoose.model('user', userSchema);

module.exports = user;