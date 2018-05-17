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

/*
Set the MinHour Property for a User
url: /minHour/:netid?

PUT REQUEST

Payload format: (req.body)
e.g. {minHour: 8}
*/
const setUserMinHour = (req, res) => {
    // Get netid from url params
    let netid = req.params.netid
    // Get minHour from request body
    let minHour = req.body.minHour
    // Mongoose Call findOneAndUpdate; use {new: true} to send back the altered document
    // Search for user by netid first, then change the minHour attribute
    User.findOneAndUpdate({netid: netid}, {minHour: minHour}, {new: true}, (err, user) => {
        if (err) {
            res.send("Error Occurred.")
        }
        else {
            // Altered docu
            res.send(user)
        }
    })
}

/*
Set the MaxHour Property for a User
url: /maxHour/:netid?

Payload format: (req.body)
e.g. {maxHour: 8}
*/
const setUserMaxHour = (req, res) => {
    let netid = req.params.netid
    let maxHour = req.body.maxHour
    User.findOneAndUpdate({netid: netid}, {maxHour: maxHour}, {new: true}, (err, user) => {
        if (err) {
            res.send("Error Occurred.")
        }
        else {
            res.send(user)
        }
    })
}

/*
Create a user entry in the database:
url: /add/:netid?

Payload format:  (req.body)
 e.g. {firstName: Will, lastName: Mundy, minHour: 8, maxHour: 16}

 */
const addUser = (req, res) => {
    console.log("starting");
    //Adding new document into the Model.

    //1. Check if the user with the netid is already in the model
    User.find({netid: req.params.netid}).exec((err, user) => {
        if (err) {
            res.send("Error occurred")
        } else {
            console.log("length " + user.length);
            if (user.length === 0) {
                //2. Create user if not already in database
                let minHour = parseInt(req.body.minHour)
                let maxHour = parseInt(req.body.maxHour)
                //TODO: do i need to check if the payload is the correct format?
				var user = new User(
				  {netid:req.params.netid,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					minHour: minHour,
					maxHour: maxHour,
					totalHours: 0 });
                console.log(user);
                User.create(user, function (err, user) {
                    if (err) {
                        res.send('error in creating');
                    } else {
                        User.find({}).exec((err, users) => {
                            if (err) {
                                res.send('error has occured')
                            } else {
                                res.json(users)
                            }
                        })
                    }
                });
            } else {
                res.send("Already in database")
            }
        }
    });
};


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
                new_week = new_week.toObject()

                for (i = 0; i < new_week.length; i++){
                    new_week[i].scheduled = new_week[i].scheduled.filter(x => x != netid)
                    var bool = 'da30' in new_week[i];

                    if (netid in new_week[i]){
                        delete new_week[i][netid]
                    }
                }
                allShifts[0].week = new_week
                allShifts[0].save(function(err) {
                    if (err) return handleError(err);
                    //res.send(allShifts[0]);
                })

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
    app.get('/api/users', getUsers)
    app.get('/api/user/:netid?', getUser)
    app.get('/api/netids', getNetIDs)
    app.get('/api/remove/:netid?', removeUser)
    app.put('/api/minHour/:netid?', setUserMinHour)
    app.put('/api/maxHour/:netid?', setUserMaxHour)
    app.put('/api/add/:netid?', addUser)
    // app.get('/user/hours/:netid', getTotalHours)
    // app.put('/user/:netid?', updateUser)
}
