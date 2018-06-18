var mongoose     = require('mongoose')
//    , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema
require('../db')

var UserSchema = new Schema({
    netid:{type: String},
    firstName: {type: String},
    lastName: {type: String},
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    idealHour: Number,
    maxHour: Number,
    totalHours: Number
})


var User = mongoose.model("users", UserSchema)



exports.user = User
