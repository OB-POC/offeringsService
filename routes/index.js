var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var cardDetails = require('../data/cardDetails');
var config = require('../data/config');

/* GET home page. */
router.get('/cardDetails', function(req, res, next) {
  var token = req.headers['x-access-token'];
  jwt.verify(token, config.secret , function(err, decodedObj){
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    var userName = decodedObj.username;
    var userObj = cardDetails.userData.filter((obj)=>{
      return obj.username == userName
    })[0]
    if(userObj){
      res.status(200).json(userObj.cardData)
    }
  });
});

module.exports = router;
