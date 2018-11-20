var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var request = require('request');

const { secret, serviceUrls } = require('../config');

router.get('/cardDetails', (req, res) => {
  var token = req.headers['x-access-token'];
  jwt.verify(token, secret, (err, decodedObj) => {
    if (err) {
      res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    }
    var userName = decodedObj.username;

    request
      .get(`${serviceUrls.dbUrl}/offers`, (err, response, body) => {
          if(err) {
              res.status(500).json({
                  errorMsg: 'Failed to load the available offers'
              }); 
          }
          let offers = JSON.parse(body);
          if(offers instanceof Array) {
              let offer = offers.filter(offer => offer.username == userName);
              if(offer.length>0) {
                res.status(200).json(offer[0]);
              }
          }
    });
  });
});

module.exports = router;
