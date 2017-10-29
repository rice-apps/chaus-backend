var mongoose     = require('mongoose')
    , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema
require('../db')

var DayShiftSchema =
    new Schema(
        {
            hour: Number,
            availability: [String],
            schedule: [String],
            status:Boolean
        }
    )
var weekSchema =
    new Schema({

    day: String,
    shifts: [DayShiftSchema]

    })
var ScheduleSchema = new Schema({
    week: [weekSchema]});


var Schedule = mongoose.model("testdata", ScheduleSchema)

exports.schedule = Schedule
