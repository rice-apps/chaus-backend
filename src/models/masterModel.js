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
            availability: [User],
            schedule: [User]
        }
    )

var day = new Schema({shifts:[dayShift]})

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

exports.schedule = mongoose.model('monsa', day)