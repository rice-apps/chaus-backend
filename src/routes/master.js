var mongoose = require('mongoose'),
    mongoosastic = require('mongoosastic')

const schedule = require('../models/masterModel').schedule

const getSchedule = (req, res) => {
    schedule.find({}).exec((err, r) => {
        if (err) {
            res.send('error has occured')
        } else {
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
    app.get('/master/monday', getMon)
}
