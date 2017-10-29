var mongoose     = require('mongoose')
    , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema
require('../db')

var UserSchema = new Schema({
    netid:{type: String, es_indexed: true},
    name: {type: String, es_indexed: true},
    minHour: Number,
    maxHour: Number
})

UserSchema.plugin(mongoosastic,{hosts:['localhost:9200']})

var User = mongoose.model("User", UserSchema), stream = User.synchronize(),count = 0;

stream.on('data', function(err, doc){
    count++;
});
stream.on('close', function(){
    console.log('indexed ' + count + ' documents!');
});
stream.on('error', function(err){
    console.log(err);
});

exports.user = User
