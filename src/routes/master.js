const schedule = require('../models/scheduleModel').schedule;

const getSchedule = (req, res) => {
    schedule.find({}).exec((err, r) => {
        if (err) {
            res.send('error has occurred')
        } else {
            res.send(r[0])
        }
    })
}

const getDay = (req, res) => {
    schedule.find({}, {_id: 0, week: {$elemMatch: {day: req.params.day}}}).exec((err, r) => {
        if (err) {
            res.send('error has occurred')
        } else {
            res.send(r[0])
        }
    })
}

const getShift = (req, res) => {
    schedule.find({}).exec((err, r) => {
        if (err) {
            res.send('error has occurred')
        } else {
            res.send(
                r[0].week.filter(day => day.day == req.params.weekday)[0].shifts.filter(shift => shift.hour == req.params.hour)
            )
        }
    })
}

const getAvailable = (req, res) => {
    schedule.find({}).exec((err, r) => {
        if (err) {
            res.send('error has occurred')
        } else {
            res.send(
                r[0].week.map(
                    day => {
                        filteredShifts = day.shifts.map(
                            shift => {
                                var newShift = {};
                                if (shift.availability.indexOf(req.params.netid) != -1) {
                                    newShift['available'] = true
                                } else {
                                    newShift['available'] = false
                                }
                                newShift['hour'] = shift.hour
                                newShift['changed'] = false
                                newShift['status'] = true
                                return newShift
                            })
                        var res = {};
                        res[day.day] = filteredShifts
                        return res;
                    }))
        }
    })
}

const getScheduled = (req, res) => {
    schedule.find({}).exec((err, r) => {
        if (err) {
            res.send('error has occurred')
        } else {
            res.send(
                r[0].week.map(
                    day => {
                        filteredShifts = day.shifts.map(
                            shift => {
                                var newShift = {};
                                if (shift.schedule.indexOf(req.params.netid) != -1) {
                                    newShift['schedule'] = true
                                } else {
                                    newShift['schedule'] = false
                                }
                                newShift['hour'] = shift.hour
                                newShift['changed'] = false
                                newShift['status'] = true
                                return newShift
                            })
                        var res = {};
                        res[day.day] = filteredShifts
                        return res;
                    }))
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

const putShift = (req, res) => {
    // Used for testing purposes, can be removed
    let shifts = []
    for (let i = 0; i < 168; i++) {
      shifts.push({status: true, scheduled: ['ob10']})
    }
    let shift = new schedule({week: shifts})
    shift.save((err) => {if(err) {console.log("Error"); return err}})
    console.log(schedule.find({}));
    res.send("Done")
}

const getStuff = (req, res) => {
    // Used for testing purposes, can be removed
    schedule.find({}, (err, shifts) => {
      res.send(shifts)
    })
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
    app.get('/master/:day?', getDay)
    app.get('/master/available/:netid?', getAvailable)
    app.get('/master/schedule/:netid?', getScheduled)
    app.get('/master/shift/:weekday?/:hour?', getShift)
    app.put('/master/update/availability/:netid?', putAvailability)
    app.put('/master/update/:weekday?/:hour?', putSchedule)
}
