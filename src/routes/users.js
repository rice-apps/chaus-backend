/**
 * Created by Jeffr on 7/22/2017.
 */
const User = require('../models/userModel').user
const schedule = require('../models/scheduleModel').schedule;
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
// Calls from employee.js
const getEmployeeScheduled = require('./employee').getEmployeeScheduled

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

/*
Call: Helper function checkUser(jhw5)
Effect: checks whether IDP logged user is in DB
Input: users NetId
Output: whether user is in our DB or not
test: jhw5 has 27 instances.
*/
const checkUser = (netid) => {
    User.find({netid: netid}).exec((err, user) => {
      if (err) {
        return "Error";
      }
      else {
        if (user == {}) {
          return "User Not Found";
        }
        else {
          return user;
        }
      }
    });
}

// const getTotalHours = (req, res) => {
//   const netid = req.params.netid
//   let counter = 0
//   // Get entire schedule
//   S.find({}).exec((err, shifts) => {
//     // Array of shifts
//     let week = shifts[0].week
//     if (err) {
//       res.send("error has occurred")
//     }
//     else {
//       // Iterate through each shift
//       for (let i = 0; i < week.length; i++) {
//         let shift = week[i]
//         // Get array of people scheduled
//         let scheduled = shift.scheduled
//         // Add to array a value of True or False; True if employee is scheduled, False otherwise
//         if (scheduled.indexOf(netid) > -1) {
//           counter += 1
//         }
//       }
//       res.send(counter)
//     }
//   })
// }
const removeUser = (req, res) => {
    const netid = req.params.netid



    User.remove({netid:netid}).exec((err, user) => {
        if (err) {
            return "Error";
        }
        // user deleted

        // delete from schedule
        // take from availability and scheduled list

        schedule.find({}).exec((err, allShifts) => {
            if (err) {
                res.send('error has occurred')
            }
            else {
                new_week = allShifts[0].week
                console.log("Allshifts: " + allShifts[0]);
                for (i = 0; i < new_week.length; i++){
                    console.log("new_week[i] before: " + new_week[i]);
                    new_week[i].scheduled = new_week[i].scheduled.filter(x => x != netid)
                    console.log("net id to remove: " + netid)
                    var bool = 'da30' in new_week[i];
                    console.log("new_week[i]: " + new_week[i]);
                    console.log("bool : " + bool );
                    if (netid in new_week[i]){
                        console.log(new_week[i][netid])
                        delete new_week[i][netid]
                    }
                }
                // allShifts[0].week = new_week
                // allShifts[0].save(function(err) {
                //     if (err) return handleError(err);
                //     //res.send(allShifts[0]);
                // })
                // console.log(new_week)
                allShifts[0].week.set(new_week)

            }
        })

        User.find({}).exec((err, users) => {
            if (err) {
                res.send('error has occured')
            } else {
                res.json(users)
            }
        })
    })

}
module.exports = app => {
    app.get('/users', getUsers)
    app.get('/user/:netid?', getUser)
    app.get('/netids', getNetIDs)
    app.get('/remove/:netid?', removeUser)
    // app.get('/user/hours/:netid', getTotalHours)
    // app.put('/user/:netid?', updateUser)
}
