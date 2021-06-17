const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Import User Model
const User = require("../models/user");

// We dont store user information on server
// Building Signup route

router.post("/signup", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
          // For unique email address
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  });

  router.post('/login', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
      // Check if user length is less than 1, no user
      // 401 is unauthorised
      if(user.length < 1) {
           return res.status(401).json({
             message: "Auth failed"
           })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          })
        }
        if (result) {
          // Step1: What do we want to pass to the client
          //Step2: Add a secret key
          const token =  jwt.sign({
            email: user[0].email,
            userId: user[0]._id
          }, 
          process.env.JWT_KEY, 
          {
             expiresIn: "1h"
          })
          return res.status(200).json({
            message: "Auth Successful",
            token: token // token constant
          })
        }
        res.status(401).json({
          message: "Auth failed"
        })
      })

    })
    .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
    })
  })

// To delete
router.delete('/:userId', (req, res, next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User Deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})


module.exports = router;
