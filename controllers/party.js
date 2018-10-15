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

/************* Show Route***********************/
router.get('/packages', (req, res) => {
  Party.find({}, (error, allParty)=>{
      res.render('packages.ejs',{
        party:allParty
      })
    })
})


/************* Seed Route ********************/

router.get ('/packages/seed' , (req, res) => {
  Party.insertMany(partySeeds,(err, data) =>{
    if ( err ) { console.log( err ); }
    console.log( 'SEED: NEW PRODUCTS CREATED!' );
    res.redirect('/packages');
  })
});

/************* Create Route***********************/
router.get('/packages/new', (req, res)=>{
    res.render('addnew.ejs');
})

router.post('/packages', (req, res)=>{
   Party.create(req.body, (error, createdParty)=>{
        res.redirect('/packages');
    })
});

// =======================================
//             MODULE EXPORT
// =======================================
module.exports = router;
