'use strict'
var express = require('express')
var router = express.Router();
var cucumberService = require('../services/cucumber.srv.js');
var http = require('http');

router.get('/cucumber',function(req,res){
    //console.log("Request: ",req);
    //var url = req.body.url;
    cucumberService.generateCucumber(function(){
        res.statusCode = 200;
        res.send({ status: "OK" });
    },function(err){
        res.statusCode = 404;
        res.send(err);

    })
    return res;
});

module.exports = router;
