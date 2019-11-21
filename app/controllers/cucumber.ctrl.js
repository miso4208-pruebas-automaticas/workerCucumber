'use strict'
var express = require('express')
var router = express.Router();
var cucumberService = require('../services/cucumber.srv.js');
var http = require('http');
var cron = require('node-cron'); // CAMBIO:ADICIONAR DEPENDENCIA
var sqs = require('../../worker-sqs/sqs.js') //CAMBIO: ADICIONAR DEPENDENCIA

const execute = () => {
    sqs.getSqs(function(apps){
        console.log("Ejecucion cucumber test");
    });
  }

var task = cron.schedule('2 * * * *', execute, {scheduled:true});
router.get('/start', (req,res) => {
    execute();
    task.start();
    res.send('Cron iniciado')
})



router.get('/stop', (req,res) => {
    task.stop()
    res.send('Worker detenido')
  })

/*
router.get('/cucumber',function(req,res){

    cucumberService.generateCucumber(function(){
        res.statusCode = 200;
        res.send({ status: "OK" });
    },function(err){
        res.statusCode = 404;
        res.send(err);

    })
    return res;
});
*/
module.exports = router;
