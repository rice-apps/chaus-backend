var mongoose     = require('mongoose')
//    , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema
require('../db')

var UserSchema = new Schema({
    netid:{type: String},
    firstName: {type: String},
    lastName: {type: String},
    idealHour: Number,
    maxHour: Number,
    totalHours: Number
})

console.log("Creating user model");
var User = mongoose.model("users", UserSchema, "users")
console.log("User model created.");



exports.user = User
