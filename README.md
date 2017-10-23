RiceChaus Backend Application
After cloning repo, run the following:
1. npm install
2. npm run start
3. navigate to http://localhost:8080 

If you have mongoDB installed, you can run the following to access the mlab database: 
- mongo ds143449.mlab.com:43449/chaus -u jhw5 -p jhw5
- show collections


Curl Commands:

// get all users
- curl -H 'Content-Type: application/json' http://localhost:3000/users

// getting specific users and putting in specific users don't work
- curl -H 'Content-Type: application/json' http://localhost:3000/netids



// get each day of the week:
- curl -H 'Content-Type: application/json' http://localhost:3000/mon

