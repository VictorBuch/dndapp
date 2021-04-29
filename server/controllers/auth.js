const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
   createJWT,
} = require("../utils/auth");
const { json } = require('body-parser');


// method for signing up
exports.signup = (req, res, next) => {
  let { userName, password, password_confirmation } = req.body;
  let errors = [];
  if (!userName) { //check if username input is not empty
    errors.push({ userName: "required" });
  }
  if (!password) { //check if password input is not empty
    errors.push({ password: "required" });
  }
  if (!password_confirmation) { //check if password confirmation input is not empty
    errors.push({ 
     password_confirmation: "required",
    });
  }
  if (password != password_confirmation) { //this part is to ensure that the user typed in the password they wanted to
    errors.push({ password: "Password and password confirmation does not match!" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
 User.findOne({userName: userName}) //check if the username already exists in the database, to avoid having two users with the same username
    .then(user=>{
       if(user){
          return res.status(422).json({ errors: [{ user: "username taken" }] }); 
       }else {
         const user = new User({ //create a new user from the data
           userName: userName,
           password: password,
         });
 bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) { //turn the password into a hash, so that it is stored securely
         if (err) throw err;
         user.password = hash;
         user.save()
             .then(response => {
                res.status(200).json({
                  success: true,
                  result: response
                })
             })
             .catch(err => {
               res.status(500).json({
                  errors: [{ error: err }]
               });
            });
         });
      });
     }
  }).catch(err =>{
      res.status(500).json({
        errors: [{ error: 'Something went wrong' }]
      });
  })
}

// method for signing in
exports.signin = (req, res) => {
     let { userName, password } = req.body;
     let errors = [];
     if (!userName) { //check if username input is not empty
       errors.push({ userName: "required" });
     }
     if (!password) { //check if password input is not empty
       errors.push({ passowrd: "required" });
     }
     if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
     }
     User.findOne({ userName: userName }).then(user => { //look for the user in the database based on userName
        if (!user) {
          return res.status(404).json({
            errors: [{ user: "not found" }], 
          });
        } else {
           bcrypt.compare(password, user.password).then(isMatch => { //if the user is found in the database, check if the hash of the input password matches the hash stored in the database
              if (!isMatch) {
               return res.status(400).json({ errors: [{ password:
"incorrect" }] 
               });
              }
       let access_token = createJWT( 
          user.userName,
          user._id,
          3600
       );
       jwt.verify(access_token, "secret", (err,
decoded) => {
         if (err) {
            res.status(500).json({ erros: err });
         }
         if (decoded) { //log the user in if everything went well
             return res.status(200).json({
                success: true,
                token: access_token,
                message: user
             });
           }
         });
        }).catch(err => {
          res.status(500).json({ errors: err });
        });
      }
   }).catch(err => {
      res.status(500).json({ errors: err });
   });
}

// method for adding a spell
exports.addSpell = (req, res) => {
  let { userName, spellUrl } = req.body;
  let errors = [];
    User.updateOne( //find the user in the database based on the userName input, and update it with the new spell
      {userName : userName},
      { $push: {addedSpells: spellUrl}}, //add the spell to the addedSpells array
    ).then(response => {
      res.status(200).json({
        success: true,
        result: response
      })
   })
    .catch(err => {
      res.status(500).json({errors:err});
    })
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
   }
  
}

// method for getting all spells for a user
exports.getSpells = (req, res, next) => {
  let { userName } = req.body;
  var projection = {addedSpells: true, _id: false};
  User.find({userName : userName}, projection, function(err, spells){ //find the user in the database, and access the addedSpells array, which is put into the spells variable
    if (err) return next(err);
    res.json(spells); //return the spells from the array
  })
}