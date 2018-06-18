var mongoose = require('mongoose')
var config = require('./config');

// replace this "localhost" value with the one from heroku/mlab
// var url = 'mongodb://heroku_wx63m5mq:6lghcsjvtmpfmc73quboc0jo41@ds159217.mlab.com:59217/heroku_wx63m5mq'
// var url = 'mongodb://jhw5:jhw5@ds047355.mlab.com:47355/heroku_k19dzfdh'

// var url = 'mongodb://jhw5:jhw5@ds143449.mlab.com:43449/chaus'
// var url = 'mongodb://localhost:27017/chaus_test'
var url = config.db_uri

if (process.env.MONGOLAB_URI) {
	url = process.env.MONGOLAB_URI;
}

mongoose.connect(url)

///////////////////////////////////////////////////
mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + url)
})
mongoose.connection.on('error', function(err) {
	console.error('Mongoose connection error: ' + err)
})
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected')
})


process.once('SIGUSR2', function() {
	shutdown('nodemon restart', function() {
		process.kill(process.pid, 'SIGUSR2')
	})
})
process.on('SIGINT', function() {
	shutdown('app termination', function() {
		process.exit(0)
	})
})
process.on('SIGTERM', function() {
	shutdown('Heroku app shutdown', function() {
		process.exit(0)
	})
})
function shutdown(msg, callback) {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through ' + msg)
		callback()
	})
}
///////////////////////////////////////////////////

