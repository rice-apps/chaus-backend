/**
 * Created by Jeffr on 7/22/2017.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
require('../db')

var weekSchema = new Schema ({
    mon: [Number],
    tues: [Number],
    wed: [Number],
    thurs: [Number],
    fri: [Number],
    sat: [Number],
    sun: [Number]
})
var userSchema = new Schema ({
    first: String,
    netid: String,
    cap: Number,
    week: weekSchema
})

exports.User = mongoose.model('user', userSchema)