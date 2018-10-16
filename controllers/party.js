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

router.get('/gallery', (req, res)=>{
    res.render('gallery.ejs');
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
router.get('/new', (req, res)=>{
    res.render('new.ejs');
})

router.post('/packages', (req, res)=>{
   Party.create(req.body, (error, createdParty)=>{
        res.redirect('/packages');
    })
});
/************* Show Route ********************/

router.get('/:id',(req,res)=>{
  Party.findById(req.params.id, (err, foundParty)=>{
    res.render('show.ejs',{
      party: foundParty
    });
  })
})

/************* Edit Route ********************/

router.put('/:id', (req,res)=>{
  Party.findByIdAndUpdate(req.params.id, req.body,{new:true},(err, updateParty)=>{
    res.redirect('/packages')
  })

})

router.get('/:id/edit', (req,res)=>{
  Party.findById(req.params.id, (err, foundParty) => {
      res.render('edit.ejs', {
          party: foundParty
      });
  })
});


/************* Delete Route ********************/
router.delete('/packages/:id', (req,res) =>{
  Party.findByIdAndRemove(req.params.id, (err, data)=>{
       res.redirect('/packages');//redirect back to packages page
   });
})

// =======================================
//             MODULE EXPORT
// =======================================
module.exports = router;
