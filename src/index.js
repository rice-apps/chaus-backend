const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

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
const app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(enableCORS);

require('./routes/users')(app)
require('./routes/master')(app)
require('./routes/employee')(app)
require('./routes/schedule')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    const addr = server.address()
    console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
