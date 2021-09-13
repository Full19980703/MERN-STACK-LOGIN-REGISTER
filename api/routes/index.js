var express = require('express');
var router = express.Router();

/* GET home page. */
// router.use(function(req,res,next){
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//   if(token){
//     jwt.verify(token, app.get('superSecret'), function(err,decoded){
//       if(err){
// 		    return res.json({status : 403,success:false, message:'Failed to authenticate token.'});
//       } else {
// 		    req.decoded = decoded;
// 		    next();
//       }
//     });
//   } else {
//     return res.json({
//       status : 403,	
//       message: 'No token provided.'
//     });
//   }
// });
module.exports = router;
