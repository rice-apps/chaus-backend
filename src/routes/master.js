// var mongoose = require('mongoose'),
//     mongoosastic = require('mongoosastic')
//
// const schedule = require('../models/scheduleModel').schedule
// const user = require('../models/userModel').user
//
// const getSchedule = (req, res) => {
//     schedule.find({}).exec((err, r) => {
//         if (err) {
//             res.send('error has occured')
//         } else {
//             res.send(r)
//         }
//     })
// }
//
// const getAvailable = (req, res) => {
//   schedule.search({query_string: {
//       query: {
//           nested: {
//               path:"week",
//               query:{
//                   bool:{
//                       must:[
//                           {match:'week.day'}
//                       ]
//                   }
//               }
//           }}
//
//
//   }}, {hydrate: true}, function (err, r) {
//     if (err) {
//         res.send('error has occured')
//     } else {
//         res.send(r)
//     }
//   })
// }
//
// const getNetId = (req, res) => {
//   user.search({query_string: {query: "cer8"}}, {hydrate: true}, function (err, r) {
//     if (err) {
//       res.send('error has occured')
//     }
//     else {
//       res.send(r)
//     }
//   })
// }
// //
// // const getMon = (req, res) => {
// //     schedule.search({
// //        query_string:{
// //            query:{
// //                match:{
// //                    week:
// //                }
// //            }
// //        }
// //     }, function(err, results) {
// //         console.log(results)
// //         res.send(results)
// //     });
// // }
//
// module.exports = app => {
//     app.get('/master/schedule', getSchedule)
//     app.get('/master/available', getAvailable)
//     app.get('/master/netid', getNetId)
// }
var mongoose = require('mongoose'),
    mongoosastic = require('mongoosastic')

const schedule = require('../models/scheduleModel').schedule

const getSchedule = (req, res) => {
    schedule.find({}).exec((err, r) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.send(r[0])
        }
    })
}
//
const getDay = (req, res) => {
    schedule.find({},{_id:0,week:{$elemMatch:{day:req.params.day}}}).exec((err, r) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.send(r[0])
        }
    })
}

const getAvailable = (req,res) => {
    schedule.find({}).exec((err, r) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.send(r[0].week.map(
                day=> {

                    filteredShifts = day.shifts.filter(shift=>shift.availability.indexOf(req.params.netid)!=-1);
                    return {
                        day:day.day,
                        shifts:filteredShifts
                }}))
        }
    })
}

const getScheduled = (req,res) => {
    schedule.find({}).exec((err, r) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.send(r[0].week.map(
                day=> {

                    filteredShifts = day.shifts.filter(shift=>shift.schedule.indexOf(req.params.netid)!=-1);
                    return {
                        day:day.day,
                        shifts:filteredShifts
                    }}))
        }
    })
}

//
// const getAvailable = (req, res) => {
//     schedule.search({query_string:{query:"Monday"}}).exec((err, r) => {
//         if (err) {
//             res.send('error has occured')
//         } else {
//             res.send(r)
//         }
//     })
// }

module.exports = app => {
    app.get('/master/schedule', getSchedule)
    app.get('/master/:day?', getDay)
    app.get('/master/available/:netid?', getAvailable)
    app.get('/master/schedule/:netid?', getScheduled)
}
