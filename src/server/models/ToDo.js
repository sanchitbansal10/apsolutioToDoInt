'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ToDOSchema = new Schema ({
    toDo:[{
        id: String,
        task: String,
        complete: String
    }]
})

module.exports = mongoose.model('todos',ToDOSchema)