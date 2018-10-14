// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
var session = require('express-session')
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config()

// =======================================
//              MIDDLEWARE
// =======================================
app.use(express.urlencoded({extended:false}));


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))
// =======================================
//              PORT
// =======================================
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || process.env.DB_PORT;

// =======================================
//              GLOBAL CONFIG
// =======================================
const db = mongoose.connection;
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || process.env.DB_USER;

// Connect to Mongo
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
db.once('open', ()=>{
  console.log('Connected to Mongo');
})

// =======================================
//             ERROR/SUCCESS MESSAGES
// =======================================
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


// =======================================
//              STATIC
// =======================================
app.use(express.static('public'));
// =======================================
//              OVERRIDE
// =======================================
app.use(methodOverride('_method'));

// =======================================
//              CONTROLLERS
// =======================================
const partyController = require('./controllers/party.js')
app.use('/', partyController)

// =======================================
//            ROUTES
// =======================================

// Routes
app.get('/', (req, res) => {
  res.render('index.ejs')
})

// =======================================
//            LISTENER
// =======================================
app.listen(PORT, () => {
  console.log('Mongoose Store app listening on port: '+PORT)
});
