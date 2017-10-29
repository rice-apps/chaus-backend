var mongoose     = require('mongoose')
    , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema
require('../db')

var DayShiftSchema =
    new Schema(
        {
            hour: Number,
            availability: [String],
            schedule: [String]
        }
    )

var ScheduleSchema = new Schema({
    week: [
        {
            day: String,
            shifts: {
              type: [DayShiftSchema],
              es_indexed: true,
              es_type: 'nested',
              es_include_in_parent: true
            }
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

ScheduleSchema.plugin(mongoosastic)

var Schedule = mongoose.model("Schedule", ScheduleSchema), stream = Schedule.synchronize(),count = 0;

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
