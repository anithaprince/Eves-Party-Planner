// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
// =======================================
//              DATABASE
// =======================================
const Party = require('../models/party.js');
const partySeeds = require ('../models/seed.js');

// =======================================
//              ROUTES
// =======================================

router.get ('/seed' , (req, res) => {
  Party.insertMany(partySeeds,(err, data) =>{
    if ( err ) { console.log( err ); }
    console.log( 'SEED: NEW PRODUCTS CREATED!' );
    res.redirect('/');
  })
});

router.get('/packages', (req, res)=>{
    res.render('packages.ejs');
})
module.exports = router;
