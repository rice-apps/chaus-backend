var mongoose = require('mongoose'),
    mongoosastic = require('mongoosastic')

const schedule = require('../models/masterModel').schedule

const getMon = (req, res) => (req, res) => {
    schedule.find({}).exec((err, mon) => {
        
        if (err) {
            res.send('error has occured')
        } else {
            res.send(mon)
        }
    })
}

module.exports = app => {
    app.get('/master/mon', getMon)
}
