
const express = require('express');

const router = express.Router()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');




//controller import
const {fetchListFromDatabase} = require('./controller/controller')
const {updateDatabase} = require('./controller/controller')


//connect to mongodb (local)
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://allen:helloworld@ds231559.mlab.com:31559/absolutio");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
})

const jsonParser = bodyParser.json()
const app = express();

//routes
app.get('/api/appLoad', fetchListFromDatabase)
app.post('/api/appUnload', jsonParser, updateDatabase)



app.listen(8080, () => console.log('Listening on port 8080!'));
