//------ modules----
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();


//---- port-------
const port = 3000;

// -- for port difference in client and server side
app.use(cors());

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));


//---setting routes--------
const route = require('./routes/route');

//-- connecting database----
mongoose.connect('mongodb://localhost:27017/contactlist');


//--- checking succssful connection
mongoose.connection.on('connected', () => {
    console.log("database connected");
})

//--- if error occurred.-------

mongoose.connection.on('error', (err) => {
    console.log("Connection failed " + err);
})

//---- redirecting to route page whenever url contains /api 
app.use('/api', route);


// testing server---
app.get('/', (req, res) => {
    // res.send("surver running at port " + port);
    res.send('index.html');
});

//---running server---
app.listen(port, () => {
    console.log("surver running at port " + port);
})