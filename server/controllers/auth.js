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
  if (!userName) {
    errors.push({ userName: "required" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (!password_confirmation) {
    errors.push({
     password_confirmation: "required",
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: "Password and password confirmation does not match!" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
 User.findOne({userName: userName})
    .then(user=>{
       if(user){
          return res.status(422).json({ errors: [{ user: "username taken" }] });
       }else {
         const user = new User({
           userName: userName,
           password: password,
         });
 bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
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
     if (!userName) {
       errors.push({ userName: "required" });
     }
     if (!password) {
       errors.push({ passowrd: "required" });
     }
     if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
     }
     User.findOne({ userName: userName }).then(user => {
        if (!user) {
          return res.status(404).json({
            errors: [{ user: "not found" }],
          });
        } else {
           bcrypt.compare(password, user.password).then(isMatch => {
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
         if (decoded) {
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
  /*if(!userName){
    errors.push({userName: "missing username"})
  }
  /*if(!spellUrl){
    errors.push({spellUrl: "missing url"})
  } else { */
    User.updateOne(
      {userName : userName},
      { $push: {addedSpells: spellUrl}},
    ).then(response => {
      res.status(200).json({
        success: true,
        result: response
      })
   })
    .catch(err => {
      res.status(500).json({errors:err});
    })
  //}
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
   }
  
}

// method for getting all spells for a user
exports.getSpells = (req, res, next) => {
  let { userName } = req.body;
  var projection = {addedSpells: true, _id: false};
  User.find({userName : userName}, projection, function(err, spells){
    if (err) return next(err);
    res.json(spells);
  })
}