'use strict'
const shell = require('shelljs');
const report = require('multiple-cucumber-html-reporter');


module.exports.generateCucumber = function(req,success,error){

    shell.exec('npm install');
    return shell.exec('npm test', function(res){
      //console.log("Shell Response: ",res);
      //shell.exec('allure generate ./allure-results');
      //shell.exec('allure open');
      console.log("Reporte: ",report.generate({
      	jsonDir: './test/json',
      	reportPath: './test/report'
      }));
      if(res == 0){
          success('ok');
      }else {
        success('Test fails');
        console.error('Test fails');
      }
    });

}
