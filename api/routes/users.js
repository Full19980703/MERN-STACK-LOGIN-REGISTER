var express = require('express');
var router = express.Router();
var User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var passwordHash = require('bcrypt-node');
var salt = bcrypt.genSaltSync(10);

/* GET users listing. */
router.post('/register', function(req, res, next) {
  try {
    if (req.body && req.body.username && req.body.password && req.body.email && req.body.created_at) {
      User.find({ "username" : req.body.username }, (err, data) => {
        if (data.length == 0) {
          const pwd = bcrypt.hashSync(req.body.password, salt);

          let User = new user({
            username: req.body.username,
            email : req.body.email ,
			      password : pwd , 
            created_at : req.body.created_at
          });

          User.save((err, data) => {
            if (err) {
              res.json({
                message: err,
                status: 401,
              });
            } else {
              res.json({
                message: 'Registered Successfully.' ,
                status: 200,
              });
            }
          });

        } else {
          res.json({
            message: `UserName ${req.body.username} Already Exist!`,
            status: 401
          });
        }

      });

    } else {
      res.json({
        message: 'Add proper parameter first!',
        status: 401
      });
    }
  } catch (e) {
    res.json({
      message: 'Something went wrong!',
      status: 401
    });
  }
});

router.post("/login", (req, res) => {
    console.log("here");
    User.findOne({"username": req.body.username}, function(err, user_data){
			if(err || !user_data){
				return res.json({
					status : 402,
					message : "Invalid username and password.",
				});
			} else {
        if (bcrypt.compareSync( req.body.password , user_data.password)) {
            var token = jwt.sign({ user: user_data.username, id: user_data._id } , 'secret' , {expiresIn : 60*60*24}) ;
            res.json({
              	message : "Login Successfully",
              	token	: token ,
                id: user_data._id,
                status : 200 , 
            });
        } else {
          res.json({
            message : "Password isn't correct.",
            status : 401 , 
          });
        }
			}
		});
});

module.exports = router;
