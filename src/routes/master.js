const schedule = require('../models/scheduleModel').schedule;

/*
app.get('/master/schedule', getSchedule)

Input: None
Output: Full schedule
*/
const getSchedule = (req, res) => {
    schedule.find({}).exec((err, r) => {
        if (err) {
            res.send('error has occurred')
        } else {
            res.send(r[0])
        }
    })
}

/*
app.get('/master/shift/:weekday?/:hour?', getShift)

Input: day and hour ints
Output: shift object showing:
-shift status (boolean open or closed)
-shift hour (int [0-17])
-lists of users with availabilities 1, 2, 3, and 4
*/
const getShift = (req, res) => {
  schedule.find({}).lean().exec((err, allShifts) => {
    if (err) {
        res.send('error has occurred')
    } 
    else {
        requestedShift = allShifts[0].week[parseInt((req.params.weekday * 18) + req.params.hour)];
        if (!requestedShift.status) {
            var newShift = {"status": false}
        }
        else {
            var newShift = {"status": true, "hour": req.params.hour, 1: [], 2: [], 3: [], 4: []}
            newShift.scheduled = requestedShift.scheduled
            Object.keys(requestedShift).map((key, index) => {
                if (!(key == "scheduled" || key == "status")) {
                    newShift[requestedShift[key]].push(key);
                }
            });
        }
        res.send(newShift);
    }
  })
}

/*
app.get('/master/hourtotal/:netid?', getHourTotal)

Input: user netid
Output: total number of hours given employee is currently scheduled

NOT FINISHED DOESN'T WORK
*/
const getHourTotal = (req, res) => {
  schedule.find({}).lean().exec((err, allShifts) => {
    if (err) {
        res.send('error has occurred')
    } 
    else {
        hoursum = 0
        allShifts[0].week.map(shift => {
            console.log(req.params.netid);
            console.log(shift.scheduled[1]);
            console.log(req.params.netid.toString() in shift.scheduled);
            /*if (shift.scheduled.includes(req.params.netid)) {
                hoursum++;
            }*/
        })
        res.send(hoursum.toString());
    }
  })
}


function updateShift(shifts, changedshift, netId) {
    var availableOriginal = shifts[changedshift.hour - 7].availability
    if (changedshift.available == true && availableOriginal.indexOf(netId) == -1) {
        availableOriginal.push(netId)
    } else if (changedshift.available == false) {
        const index = availableOriginal.indexOf(netId)
        if (index != -1) {
            availableOriginal.splice(index, 1)
        }
    }
    shifts[changedshift.hour - 7].availability = availableOriginal
    return shifts
}

const putAvailability = (req, res) => {
    const netId = req.params.netid;
    schedule.find({}).exec((err, schedules) => {
        schedules[0].week.map(
            day => {
                weekdayName = day.day
                req.body[weekdayName].filter(time => time.changed).forEach((changedshift) => {
                    day.day == weekdayName? day.shifts = updateShift(day.shifts, changedshift, netId) : day.shifts=day.shifts
                })
            })
        schedules[0].save((err) => {
            console.log('saved!')
            if (err) {
                console.log(err)
            }
        })
    })
    res.send("successfully updated !")
}

const putSchedule = (req, res) => {
    const weekday = req.params.weekday;
    const hour = req.params.hour;
    schedule.find({}).exec((err, schedules) => {
        schedules[0].week.map(
            day => {
                if (day.day == weekday) {
                    var shifttbChanged = day.shifts[hour - 7];
                    shifttbChanged.availability = req.body.availability;
                    shifttbChanged.schedule = req.body.schedule;
                    day[hour - 7] = shifttbChanged
                }
            })
        schedules[0].save((err) => {
            if (err) {
                console.log(err)
            }
        })
    })

    res.send("successfully updated !")
}

module.exports = app => {
    app.get('/master/schedule', getSchedule)
    app.get('/master/shift/:weekday?/:hour?', getShift)
    app.get('/master/hourtotal/:netid?', getHourTotal)
    app.put('/master/update/availability/:netid?', putAvailability)
    app.put('/master/update/:weekday?/:hour?', putSchedule)
}
