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
const User = require('../models/users.js');

// =======================================
//              ROUTES
// =======================================

/************* Show Route***********************/
router.get('/packages', (req, res) => {
  Party.find({}, (error, allParty)=>{
      res.render('packages.ejs',{
        party:allParty,
        currentUser: req.session.currentUser
      })
    })
})

router.get('/gallery', (req, res)=>{
    res.render('gallery.ejs',{
      currentUser: req.session.currentUser
    });
})

router.get('/contact', (req, res)=>{
    res.render('contact.ejs',{
      currentUser: req.session.currentUser
    });
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
    res.render('new.ejs',{
      currentUser: req.session.currentUser
    });
})

router.post('/packages', (req, res)=>{
   Party.create(req.body, (error, createdParty)=>{
        res.redirect('/packages');
    })
});
/************* Login Route***********************/
router.post('/login', (req, res)=>{
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
          req.session.currentUser = foundUser
            res.redirect('/login')
        } else {
          res.send('<a href="/">wrong password</a>')
        }
    });
});

router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err)
    }
    console.log(createdUser);
    res.redirect('/login')
  })
})

router.get('/login', (req, res) => {
  res.render('login.ejs',{
      currentUser: req.session.currentUser
  })
})
/************* Logout Route***********************/
  router.delete('/login', (req, res)=>{
      req.session.destroy(() => {
          res.redirect('/login')
      })
  })
/************* Edit Route ********************/

router.put('/:id', (req,res)=>{
  Party.findByIdAndUpdate(req.params.id, req.body,{new:true},(err, updateParty)=>{
    res.redirect('/packages')
  })

})

router.get('/:id/edit', (req,res)=>{
  Party.findById(req.params.id, (err, editParty) => {
      res.render('edit.ejs', {
          party: editParty,
          currentUser: req.session.currentUser
      });
  })
});

router.get('/:id/buy', (req,res)=>{
  Party.findById(req.params.id, (err, buyParty) => {
      res.render('buy.ejs', {
          party: buyParty,
          currentUser: req.session.currentUser
      });
  })
});
/************* Show Route ********************/

router.get('/:id',(req,res)=>{
  Party.findById(req.params.id, (err, foundParty)=>{
    res.render('show.ejs',{
      party: foundParty,
      currentUser: req.session.currentUser
    });
  })
})

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
