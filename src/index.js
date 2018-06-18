/**
 * Welcome to our index page. This is the main file that connects our
 * entire backend database.
 * We will declare our dependencies and connect our backend
 * routes in this file. 
 */

// Declaring our dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

// Enable cross orgin resource sharing
const enableCORS = function(req, res, next) {
     res.header("Access-Control-Allow-Origin", req.headers.origin);
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     res.header("Access-Control-Allow-Credentials", "true");
     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
     if (req.method === "OPTIONS") {
          res.status(200).send('OK')
     } else {
          next();
     }
}

/**
 * dotenv is a dependency that parses for a locally stored .env file 
 * and stores the variables to be accessed via process.env.
 * You need to set up a local .env file which contains the following 
 * environment variables:
      secret: 
      db_uri: 
      CASValidateURL: 
      thisServiceURL: 
      frontendURL: 
 */
const result = dotenv.config()
if (result.error) {
  throw result.error
}
console.log(result.parsed)


const app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(enableCORS);


// Connecting our declared routes in to our express app
require('./routes/users')(app)
require('./routes/master')(app)
require('./routes/employee')(app)
require('./routes/schedule')(app)
require('./routes/auth')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000

// Run our express app
const server = app.listen(port, () => {
    const addr = server.address()
    console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
