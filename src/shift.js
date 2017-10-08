/**
 * Created by Jeffrey on 2/5/2017.
 */
const User = require('./model.js').User;
const Preference = require('./model.js').Preference;

const putPreference = (req, res) => {
    const day = req.body.DAY
    const shift = req.body.SHIFT
    const preference = req.body.PREFERENCE
    const netid = req.body.NETID
    console.log("NETID: " + netid)
    console.log("DAY: " + day)
    console.log("PREFERENCE: " + preference)
    console.log("SHIFT: " + shift)
   
    User.update({"NETID": netid, "DAY": day, "SHIFT": shift}, 
        {$set: {"NETID":netid, "DAY":day, "SHIFT":shift, "PREFERENCE":preference }})
        .exec(function(err, item) {
            res.send(item[0])
        })
   
}




const getUser = (req, res) => {
    const users = req.username

    Profile.find({username: users}).exec( function(err, items) {
        res.send({"username": req.username})
    })
}
const putUser = (req, res) => {
    const NETID = req.body.NETID
    const STARTDATE = req.body.STARTDATE
    const FRIENDS = req.body.FRIENDS
    console.log('NETID: ' + NETID)
    console.log('STARTDATE: ' + STARTDATE)
    console.log('FRIENDS: ' + FRIENDS)

    User.update({"NETID":NETID}, {$set: {"NETID": NETID, "STARTDATE":STARTDATE, "FRIENDS" : FRIENDS}}
        .exec(function(err, item) {
            res.send(item[0])
    }))
}

const isLoggedIn = function(req, res, next) {
    req.username = 'foo'
}

module.exports = app => {
    app.post('/preference', putPreference)
    app.put('/user', putUser)
    app.get('/user', getUser)
    app.use(isLoggedIn)


}