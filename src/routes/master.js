const schedule = require('../models/scheduleModel').schedule;

//++++++++++++++++++++++++++++++COMPLETED GET REQUESTS+++++++++++++++++++++++++++++++++++++++++
/*
GET call for app.get('/master/schedule', getSchedule)

Input: None
Output: Full schedule as specified in ScheduleModel
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
GET call for app.get('/master/shift/:weekday?/:hour?', getShift)
Effect: Get the shift specified by :weekday? and :hour?

Inputs:
- :weekday? -> 1-7 representing days in the week.
- :hour? ->  0-17 representing hour of the day.
Output: Shift JSON object showing:
- shift status (boolean open or closed)
- shift hour (int [0-17])
- lists of users with availabilities (on scale 1, 2, 3, and 4)
*/
const getShift = (req, res) => {
  //.lean() for quick mongoose query
  //allShifts is what is returned from find({})
  schedule.find({}).lean()
    .exec((err, allShifts) => {
    if (err) {
        res.send('error has occurred')
    }
    else {
        //parseInt since all params are strings
        const shiftNum = parseInt(req.params.weekday * 18) + parseInt(req.params.hour);
        requestedShift = allShifts[0].week[shiftNum];
        console.log("requested shft " + requestedShift);
        //if no one is scheduled, just return placeholder JSON.
        if (!(requestedShift.status)) {
            var newShift = {"status": false}
        }
        //construct "nice" JSON to return to frontend
        else {
            var newShift = {"status": true, "hour": req.params.hour, 1: [], 2: [], 3: [], 4: []}
            newShift.scheduled = requestedShift.scheduled
            Object.keys(requestedShift).map((key, index) => {
                if (!(key === "scheduled" || key === "status" || key === "_id")) {
                    newShift[requestedShift[key]].push(key);
                }
            });
        }
        res.send(newShift);
    }
  })
}

/*
Call: app.get('/master/hourtotal/:netid?', getHourTotal)
Effect: gets the total hours worked by user with ID :netid?

Input: users NetId
Output: total number of hours the given employee is currently scheduled

test: jhw5 has 27 instances.

*/
const getHourTotal = (req, res) => {
  schedule.find({}).lean().exec((err, allShifts) => {
    if (err) {
        res.send('error has occurred')
    }
    else {
        const netId = "" + req.params.netid; //"" +... converts to string.
        //1. get all the shifts.
        var numIDInstances = allShifts[0].week.map(shift => {
           return shift.scheduled;
        });
        //2. find all the shifts that contain the id specified
        //   , mapping to 1 if containing shift, 0 otherwise.
        var reduced = numIDInstances.map(netids => {
            if (netids.indexOf(netId) > -1) {
                return 1;
            } else {
                return 0;
            }
			//3. sum up the array by reducing.
		}).reduce(getSum);
        res.send(reduced.toString());
    }
  })
};

/*
Effect: helper to reduce over array
Input:
- total = accumulator
- num = next number to add to accumulator.
 */
function getSum(total, num) {
    return total + num;
}


/*
PUT CALL
/master/update/:weekday?/:hour?

Front end call that calls this PUT call:

 const payload = {"p1": p1, "p2": p2, "p3": p3, "p4": p4, "schedule": schedule, "weekday": weekday, "hour": hour}

 */
const putSchedule = (req, res) => {
	const shiftNum = parseInt(req.params.weekday * 18) + parseInt(req.params.hour);
	const p1 = req.body.p1;
	const p2 = req.body.p2;
	const p3 = req.body.p3;
	const p4 = req.body.p4;
	const new_sched = req.body.schedule;
	schedule.find({}).exec((err, schedules) => {
		console.log("new scheduled people:", new_sched);
		var shift = schedules[0].week[shiftNum];
		console.log("SHIFT before updates", shift);
		//update scheduled people
		shift.scheduled = new_sched;
		//update priorities
		for(i = 0; i < p1.length; i++) {
			shift[p1[i]] = 1;
		}
		for(i = 0; i < p2.length; i++) {
			shift[p2[i]] = 2;
		}
		for(i = 0; i < p3.length; i++) {
			shift[p3[i]] = 3;
		}
		for(i = 0; i < p4.length; i++) {
			shift[p4[i]] = 4;
		}
		console.log("SHIFT AFTER updates", shift);
		// schedules[0].week[shiftNum].map(
		//    shift => {
		//        console.log("SHIFT:", shift);
		//        if (day.day == weekday) {
		//            var shifttbChanged = day.shifts[hour - 7];
		//            shifttbChanged.availability = req.body.availability;
		//            shifttbChanged.schedule = req.body.schedule;
		//            day[hour - 7] = shifttbChanged
		//        }
		//    });
		schedules[0].save((err) => {
			if (err) {
				console.log(err)
			}
		})
	})

	res.send("successfully updated !")
}


//++++++++++++++++++++++++++++++UNFINISHED+++++++++++++++++++++++++++++++++++++++++

/*
Put call:'/master/update/availability/:weekday?/:hour?/:netid?'
Effect: Given netid, weekday, hour, schedule netid at the appropriate shift.
CONSIDER:
- payload from front-end? What form will it be?
Input:
- :netid? => user netid
- :hour? => hour to schedule at
- :weekday? => day to schedule at
- need unique identifier for each shift!!!!
 */
const putScheduled = (req, res) => {
	schedule.find({}).lean()
	  .exec((err, schedule) => {
		  if (err) {
			  res.send('error has occurred')
		  }
		  else {
			  const shiftNum = parseInt(req.params.weekday * 18)
				+ parseInt(req.params.hour);

			  schedule[0].week[shiftNum]
		  }
	  });
}

//OLD CALLS:
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

module.exports = app => {
    app.get('/api/master/schedule', getSchedule)
    app.get('/api/master/shift/:weekday?/:hour?', getShift)
    app.get('/api/master/hourtotal/:netid?', getHourTotal)
    app.put('/api/master/update/:weekday?/:hour?', putSchedule)
}
