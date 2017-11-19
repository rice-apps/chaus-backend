const schedule = require('../models/scheduleModel').schedule

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
    schedule.find({},{_id:0,week:{$elemMatch:{day:req.params.day}}}).exec((err, r) => {
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


const getAvailable = (req,res) => {
    schedule.find({}).exec((err, r) => {
        if (err) {
            res.send('error has occurred')
        } else {
            res.send(
                r[0].week.map(
                day=> {
                    filteredShifts = day.shifts.map(
                        shift=> {
                            var newShift = {};
                            if (shift.availability.indexOf(req.params.netid)!=-1) {
                                newShift['available']=true
                            } else {
                                newShift['available']=false
                            }
                            newShift['hour']=shift.hour
                            newShift['changed']=false
                            newShift['status'] = true
                            return newShift
                        })
                    var res = {};
                    res[day.day]=filteredShifts
                    return res;
                }))
        }
    })
}

const getScheduled = (req,res) => {
    schedule.find({}).exec((err, r) => {
        if (err) {
            res.send('error has occurred')
        } else {
            res.send(
                r[0].week.map(
                    day=> {
                        filteredShifts = day.shifts.map(
                            shift=> {
                                var newShift = {};
                                if (shift.schedule.indexOf(req.params.netid)!=-1) {
                                    newShift['schedule']=true
                                } else {
                                    newShift['schedule']=false
                                }
                                newShift['hour']=shift.hour
                                newShift['changed']=false
                                newShift['status'] = true
                                return newShift
                            })
                        var res = {};
                        res[day.day]=filteredShifts
                        return res;
                    }))
        }
    })
}

const putAvailability = (req,res) => {
    const netId = req.params.netid;
    var mon = req.body.M.filter(time => time.changed)
    var tue = req.body.T.filter(time => time.changed)
    var wed = req.body.W.filter(time => time.changed)
    var thu = req.body.R.filter(time=>time.changed)
    var fri = req.body.F.filter(time=>time.changed)
    var sat = req.body.S.filter(time=>time.changed)
    var sun = req.body.U.filter(time=>time.changed)
    schedule.find({}).exec((err,schedules)=> {
        schedules[0].week.map(
            day => {
                if (day.day == "M") {
                    mon.forEach( (changedshift) => {
                        var shift = day.shifts[changedshift.hour - 7]
                        var availableOriginal = shift.availability
                        if (changedshift.available == true && availableOriginal.indexOf(netId) == -1) {
                            availableOriginal.push(netId)
                        } else if (changedshift.available == false){
                             const index = availableOriginal.indexOf(netId)
                             if (index != -1) {
                                 availableOriginal.splice(index, 1)
                             }
                        }
                        day.shifts[changedshift.hour - 7].availability = availableOriginal
                    })

                }
                if (day.day == "T") {
                    tue.forEach( (changedshift) => {
                        var shift = day.shifts[changedshift.hour - 7]
                        var availableOriginal = shift.availability
                        if (changedshift.available == true && availableOriginal.indexOf(netId) == -1) {
                            availableOriginal.push(netId)
                        } else if (changedshift.available == false){
                            const index = availableOriginal.indexOf(netId)
                            if (index != -1) {
                                availableOriginal.splice(index, 1)
                            }
                        }
                        day.shifts[changedshift.hour - 7].availability = availableOriginal
                    })

                }
                if (day.day == "W") {
                    wed.forEach( (changedshift) => {
                        var shift = day.shifts[changedshift.hour - 7]
                        var availableOriginal = shift.availability
                        if (changedshift.available == true && availableOriginal.indexOf(netId) == -1) {
                            availableOriginal.push(netId)
                        } else if (changedshift.available == false){
                            const index = availableOriginal.indexOf(netId)
                            if (index != -1) {
                                availableOriginal.splice(index, 1)
                            }
                        }
                        day.shifts[changedshift.hour - 7].availability = availableOriginal
                    })

                }
                if (day.day == "R") {
                    thu.forEach( (changedshift) => {
                        var shift = day.shifts[changedshift.hour - 7]
                        var availableOriginal = shift.availability
                        if (changedshift.available == true && availableOriginal.indexOf(netId) == -1) {
                            availableOriginal.push(netId)
                        } else if (changedshift.available == false){
                            const index = availableOriginal.indexOf(netId)
                            if (index != -1) {
                                availableOriginal.splice(index, 1)
                            }
                        }
                        day.shifts[changedshift.hour - 7].availability = availableOriginal
                    })

                }
                if (day.day == "F") {
                    fri.forEach( (changedshift) => {
                        var shift = day.shifts[changedshift.hour - 7]
                        var availableOriginal = shift.availability
                        if (changedshift.available == true && availableOriginal.indexOf(netId) == -1) {
                            availableOriginal.push(netId)
                        } else if (changedshift.available == false){
                            const index = availableOriginal.indexOf(netId)
                            if (index != -1) {
                                availableOriginal.splice(index, 1)
                            }
                        }
                        day.shifts[changedshift.hour - 7].availability = availableOriginal
                    })

                }
                if (day.day == "S") {
                    sat.forEach( (changedshift) => {
                        var shift = day.shifts[changedshift.hour - 7]
                        var availableOriginal = shift.availability
                        if (changedshift.available == true && availableOriginal.indexOf(netId) == -1) {
                            availableOriginal.push(netId)
                        } else if (changedshift.available == false){
                            const index = availableOriginal.indexOf(netId)
                            if (index != -1) {
                                availableOriginal.splice(index, 1)
                            }
                        }
                        day.shifts[changedshift.hour - 7].availability = availableOriginal
                    })

                }
                if (day.day == "U") {
                    sun.forEach( (changedshift) => {
                        var shift = day.shifts[changedshift.hour - 7]
                        var availableOriginal = shift.availability
                        if (changedshift.available == true && availableOriginal.indexOf(netId) == -1) {
                            availableOriginal.push(netId)
                        } else if (changedshift.available == false){
                            const index = availableOriginal.indexOf(netId)
                            if (index != -1) {
                                availableOriginal.splice(index, 1)
                            }
                        }
                        day.shifts[changedshift.hour - 7].availability = availableOriginal
                    })

                }
            })
        //console.log(JSON.stringify(schedules[0].week))
        schedules[0].save((err) => {
            console.log('saved!')
             if (err) {
                 console.log(err)
             }
         })
    })

    res.send("successfully updated !")
}

const putSchedule = (req,res) => {
    const netId = req.params.netid;
    var mon = req.body.Monday.filter(time => time.changed)
    var tue = req.body.Tuesday.filter(time => time.changed)
    var wed = req.body.Wednesday.filter(time => time.changed)
    var thu = req.body.Thursday.filter(time=>time.changed)
    var fri = req.body.Friday.filter(time=>time.changed)
    var sat = req.body.Saturday.filter(time=>time.changed)
    var sun = req.body.Sunday.filter(time=>time.changed)
    schedule.find({}).exec((err,schedules)=> {
        schedules[0].week.map(
            day => {
                if (day.day == "M") {
                    mon.forEach( (changedshift) => {
                        var shift = day.shifts[changedshift.hour - 7]
                        var scheduleOriginal = shift.schedule
                        if (changedshift.schedule == true && scheduleOriginal.indexOf(netId) == -1) {
                            scheduleOriginal.push(netId)
                        } else if (changedshift.available == false){
                            const index = scheduleOriginal.indexOf(netId)
                            if (index != -1) {
                                scheduleOriginal.splice(index, 1)
                            }
                        }
                        day.shifts[changedshift.hour - 7].schedule = scheduleOriginal
                    })

                }
                if (day.day == "T") {
                    tue.forEach( (changedshift) => {
                        var shift = day.shifts[changedshift.hour - 7]
                        var scheduleOriginal = shift.schedule
                        if (changedshift.schedule == true && scheduleOriginal.indexOf(netId) == -1) {
                            scheduleOriginal.push(netId)
                        } else if (changedshift.available == false){
                            const index = scheduleOriginal.indexOf(netId)
                            if (index != -1) {
                                scheduleOriginal.splice(index, 1)
                            }
                        }
                        day.shifts[changedshift.hour - 7].schedule = scheduleOriginal
                    })

                }
                if (day.day == "W") {
                    wed.forEach((changedshift) => {
                        var shift = day.shifts[changedshift.hour - 7]
                        var scheduleOriginal = shift.schedule
                        if (changedshift.schedule == true && scheduleOriginal.indexOf(netId) == -1) {
                            scheduleOriginal.push(netId)
                        } else if (changedshift.available == false) {
                            const index = scheduleOriginal.indexOf(netId)
                            if (index != -1) {
                                scheduleOriginal.splice(index, 1)
                            }
                        }
                        day.shifts[changedshift.hour - 7].schedule = scheduleOriginal
                    })

                }
                if (day.day == "R") {
                    thu.forEach( (changedshift) => {
                        var shift = day.shifts[changedshift.hour - 7]
                        var scheduleOriginal = shift.schedule
                        if (changedshift.schedule == true && scheduleOriginal.indexOf(netId) == -1) {
                            scheduleOriginal.push(netId)
                        } else if (changedshift.available == false){
                            const index = scheduleOriginal.indexOf(netId)
                            if (index != -1) {
                                scheduleOriginal.splice(index, 1)
                            }
                        }
                        day.shifts[changedshift.hour - 7].schedule = scheduleOriginal
                    })

                }
                if (day.day == "F") {
                    fri.forEach( (changedshift) => {
                        var shift = day.shifts[changedshift.hour - 7]
                        var scheduleOriginal = shift.schedule
                        if (changedshift.schedule == true && scheduleOriginal.indexOf(netId) == -1) {
                            scheduleOriginal.push(netId)
                        } else if (changedshift.available == false){
                            const index = scheduleOriginal.indexOf(netId)
                            if (index != -1) {
                                scheduleOriginal.splice(index, 1)
                            }
                        }
                        day.shifts[changedshift.hour - 7].schedule = scheduleOriginal
                    })

                }
                if (day.day == "S") {
                    sat.forEach( (changedshift) => {
                        var shift = day.shifts[changedshift.hour - 7]
                        var scheduleOriginal = shift.schedule
                        if (changedshift.schedule == true && scheduleOriginal.indexOf(netId) == -1) {
                            scheduleOriginal.push(netId)
                        } else if (changedshift.available == false){
                            const index = scheduleOriginal.indexOf(netId)
                            if (index != -1) {
                                scheduleOriginal.splice(index, 1)
                            }
                        }
                        day.shifts[changedshift.hour - 7].schedule = scheduleOriginal
                    })

                }
                if (day.day == "U") {
                    sun.forEach( (changedshift) => {
                        var shift = day.shifts[changedshift.hour - 7]
                        var scheduleOriginal = shift.schedule
                        if (changedshift.schedule == true && scheduleOriginal.indexOf(netId) == -1) {
                            scheduleOriginal.push(netId)
                        } else if (changedshift.available == false){
                            const index = scheduleOriginal.indexOf(netId)
                            if (index != -1) {
                                scheduleOriginal.splice(index, 1)
                            }
                        }
                        day.shifts[changedshift.hour - 7].schedule = scheduleOriginal
                    })

                }

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

module.exports = app => {
    app.get('/master/schedule', getSchedule)
    app.get('/master/:day?', getDay)
    app.get('/master/available/:netid?', getAvailable)
    app.get('/master/schedule/:netid?', getScheduled)
    app.get('/master/shift/:weekday?/:hour?',getShift)
    app.put('/master/update/availability/:netid?',putAvailability)
    app.put('/master/update/schedule/:netid?',putSchedule)
}
