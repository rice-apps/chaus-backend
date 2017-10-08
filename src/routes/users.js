/**
 * Created by Jeffr on 7/22/2017.
 */
const User = require('../models/userModel').User
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');

const getUsers = (req, res) => {
    User.find({}).exec((err, users) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.json(users)
        }
    })
}
const getUser = (req, res) => {
    const netid = req.params.netid
    User.find({netid: netid}).exec((err, user) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.json(user)
        }
    })
}

const getNetIDs = (req, res) => {
    var netids = []
    User.find({}).exec((err, user) => {
        if (err) {
            res.send('error has occured')
        } else {
            user.map(x => netids.push(x.netid))
            res.send(netids)
        }
    })
}

const updateUser = (req, res) => {


}

module.exports = app => {
    app.get('/users', getUsers)
    app.get('/user/:netid?', getUser)
    app.get('/netids', getNetIDs)
    app.put('/user/:netid?', updateUser)
}