/**
 * Created by Jeffr on 7/26/2017.
 */
/**
 * Created by Jeffr on 7/22/2017.
 */
var express = require('express')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');

const Mon = require('../models/weekModel').mon
const Tues = require('../models/weekModel').tues
const Wed = require('../models/weekModel').wed
const Thurs = require('../models/weekModel').thurs
const Fri = require('../models/weekModel').fri
const Sat = require('../models/weekModel').sat
const Sun = require('../models/weekModel').sun





var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');


const getMon = (req, res) => {
    Mon.find({}).exec((err, mon) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.send({mon:mon[0]})
        }
    })
}

const getTues = (req, res) => {
    Tues.find({}).exec((err, tues) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.send({tues:tues[0]})
        }
    })
}

const getWed = (req, res) => {
    Wed.find({}).exec((err, wed) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.send({wed:wed[0]})
        }
    })
}

const getThurs = (req, res) => {
    Thurs.find({}).exec((err, thurs) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.send({thurs:thurs})
        }
    })
}

const getFri = (req, res) => {
    Fri.find({}).exec((err, fri) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.send({fri:fri[0]})
        }
    })
}
const getSat = (req, res) => {
    Sat.find({}).exec((err, sat) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.send({sat:sat[0]})
        }
    })
}
const getSun = (req, res) => {
    Sun.find({}).exec((err, sun) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.send({sun:sun[0]})
        }
    })
}


module.exports = app => {
    app.get('/mon', getMon),
    app.get('/tues', getTues),
    app.get('/wed', getWed),
    app.get('/thurs', getThurs),
    app.get('/fri', getFri),
    app.get('/sat', getSat),
    app.get('/sun', getSun)
}