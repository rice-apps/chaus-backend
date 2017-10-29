var mongoose = require('mongoose'),
    mongoosastic = require('mongoosastic')

const schedule = require('../models/scheduleModel').schedule
const user = require('../models/userModel').user

const getSchedule = (req, res) => {
    schedule.find({}).exec((err, r) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.send(r)
        }
    })
}

const getAvailable = (req, res) => {
  schedule.search({query_string: {query: "Monday"}}, {hydrate: true}, function (err, r) {
    if (err) {
        res.send('error has occured')
    } else {
        res.send(r)
    }
  })
}

const getNetId = (req, res) => {
  user.search({query_string: {query: "jhw5"}}, {hydrate: true}, function (err, r) {
    if (err) {
      res.send('error has occured')
    }
    else {
      res.send(r)
    }
  })
}
//
// const getMon = (req, res) => {
//     schedule.search({
//        query_string:{
//            query:{
//                match:{
//                    week:
//                }
//            }
//        }
//     }, function(err, results) {
//         console.log(results)
//         res.send(results)
//     });
// }

module.exports = app => {
    app.get('/master/schedule', getSchedule)
    app.get('/master/available', getAvailable)
    app.get('/master/netid', getNetId)
}
