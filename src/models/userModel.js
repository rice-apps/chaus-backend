var mongoose     = require('mongoose')
    , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema
require('../db')

var UserSchema = new Schema({
    netid:{type: String, es_indexed: true},
    name: {type: String, es_indexed: true},
    minHour: Number,
    maxHour: Number
})


var User = mongoose.model("User", UserSchema)



exports.user = User
