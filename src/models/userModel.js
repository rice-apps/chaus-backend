var mongoose     = require('mongoose')
//    , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema
require('../db')

var UserSchema = new Schema({
    netid:{type: String},
    firstName: {type: String},
    lastName: {type: String},
    minHour: Number,
    maxHour: Number,
    totalHours: Number
})


var User = mongoose.model("User", UserSchema)



exports.user = User
