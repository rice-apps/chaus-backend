var mongoose     = require('mongoose')
//    , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema
require('../db')

var UserSchema = new Schema({
    netid:{type: String},
    firstName: {type: String},
    lastName: {type: String},
    idealHours: Number,
    maxHour: Number,
    totalHours: Number
})


var User = mongoose.model("users", UserSchema)



exports.user = User
