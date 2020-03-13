const express = require('express')
const router = express.Router()
const Shift = require("../models/shifts.js");

// |   NAME   |     PATH       |   HTTP VERB     |            PURPOSE                   |
// |----------|----------------|-----------------|--------------------------------------| 
// | Index    | /shift          |      GET        | Displays all shifts                  |
// | New      | /shift/new      |      GET        | Shows new form for new shift entry   |
// | Create   | /shift          |      POST       | Creates a new shift                  |
// | Show     | /shift/:id      |      GET        | Shows one specified shift            |
// | Edit     | /shift/:id/edit |      GET        | Shows edit form for one shift        |
// | Update   | /shift/:id      |      PUT        | Updates a particular shift           |
// | Destroy  | /shift/:id      |      DELETE     | Deletes a particular shift           |

// NEW
router.get("/new", (req, res) =>{
  if(req.session.currentUser){
  res.render("shifts/new.ejs", {currentUser: req.session.currentUser});
  } else {
    res.redirect("/sessions/new");
  }
});


// DELETE
router.delete("/:id", (req, res) =>{
  //res.send('deleting');
  Shift.findByIdAndRemove(req.params.id, (err, data) =>{
    res.redirect('/')
  })
})

// EDIT
router.get('/:id/edit', (req,res) =>{
  Shift.findById(req.params.id, (err, chosenShift) => {
    console.log("chosenShift", chosenShift);
    res.render('edit.ejs',
      {
        shifts: chosenShift,
      }
    )
  })
})


// PUT
router.put('/:id', (req, res)=>{
  Shift.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updateModel) =>{
    res.redirect('/')
  })
})

// Create
router.post("/", (req,res) =>{
    Shift.create(req.body, (err, createdShift)=>{
      res.redirect("/");
});
});

// Index
router.get("/", (req,res) => {
      Shift.find({}, (error, shifts) => {
        res.render("index.ejs", {currentUser: req.session.currentUser, shifts: shifts});
      });
  
})

//SEED DATA
router.get('/seed', (req, res) => {
  console.log("whatever")
  Shift.create( 
  [
      {
        name: "Ron",
        date: 492020,
        time: 95,
        position: "Shift Supervisor"
      }, 
      {
        name: "Veronica",
        date: 412020,
        time: 812,
        position: "barista"
      }
    ], (err, data)=>{
      res.redirect('/');
  })
});


//SHOW
router.get('/:id',(req,res)=>{
  Shift.findById(req.params.id, (err, chosenShift) => { 
      res.render("show.ejs", {
        shifts: chosenShift,
      });
    });
});

module.exports = router;