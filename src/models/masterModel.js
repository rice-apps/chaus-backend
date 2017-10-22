var mongoose     = require('mongoose')
    , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema
require('../db')
var User = new Schema({
    netid:String,
    name: String,
    minHour: Number,
    maxHour: Number
})

var dayShift =
    new Schema(
        {
            hour: Number,
            availability: [String],
            schedule: [String]
        }
    )

var schedule = new Schema({
    week : [
        {
            day: String,
            shifts: [dayShift]
        }
    ]
})

// var Mons = new Schema(day(1, 13))
// var Tues = new Schema(day(1, 24))
// var Weds = new Schema(day(1, 24))
// var Thus = new Schema(day(1, 24))
// var Fris = new Schema(day(1, 24))
// var Sats = new Schema(day(1, 24))
// var Suns = new Schema(day(1, 24))

// var schedule = new Schema({
//     Mon:Mons,
//     Tue:Tues,
//     Wed:Weds,
//     Thu:Thus,
//     Fri:Fris,
//     Sat:Sats,
//     Sun:Suns
// })
schedule.plugin(mongoosastic)
var Schedule = mongoose.model("schedule", schedule),stream = Schedule.synchronize(),count = 0;

stream.on('data', function(err, doc){
    count++;
});
stream.on('close', function(){
    console.log('indexed ' + count + ' documents!');
});
stream.on('error', function(err){
    console.log(err);
});

exports.schedule = Schedule

