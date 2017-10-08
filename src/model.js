// this is model.js 
var mongoose = require('mongoose')
require('./db.js')



var userSchema = new mongoose.Schema({
	// NETID: String,
	// STARTDATE: Date,
	// FRIENDS: [{String}],
	id: String,
	token: String,
	email: String,
	name: String

})

var preferenceSchema = new mongoose.Schema({
	NETID: String,
	DAY: String,
	SHIFT: Number,
	PREFERENCE: String
})



var hoursSchema = new mongoose.Schema({
	DAY: String,
	OPEN: Number,
	CLOSE: Number
})

var assignedSchema = new mongoose.Schema({
	DAY: String,
	SHIFT: Number,
	ID: String
})



exports.User = mongoose.model('users', userSchema)
exports.Preference = mongoose.model('preference', preferenceSchema)
exports.Assigned = mongoose.model('assigned', assignedSchema)
exports.Hours = mongoose.model('hours', hoursSchema)

