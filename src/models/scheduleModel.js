var mongoose     = require('mongoose')
    , Schema       = mongoose.Schema
require('../db')

// New Schedule Model

var ShiftSchema =
    new Schema({

      scheduled: [String],
      status: Boolean, // Is it open or closed at the time
      // NetIDs will be assigned to values 1-4, 1 meaning least preferred and 4 meaning most preferred
      // ex: 'wsm3: 4'
      // wsm3: Number

    },
    {strict: false} // Allows us to continue adding properties
  )

  var ScheduleSchema =
      new Schema({
        week: {type: [ShiftSchema], validate: [(val) => {return val.length == 126}, "Number of shifts is incorrect"]}, // Array of Shifts
        // Validate ensures that number of shifts in array is equivalent to 18*7 (126)
				//index [0 - 125]

      })


var Schedule = mongoose.model("schedules", ScheduleSchema, "schedules")

exports.schedule = Schedule
