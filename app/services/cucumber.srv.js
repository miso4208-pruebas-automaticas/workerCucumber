'use strict'
const shell = require('shelljs');
const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const s3 = require('../../worker-sqs/s3Storage.js')

module.exports.generateCucumber = function(req,success,error){

    shell.exec('npm install');
    let itemsEx = req.numberExecution;
    let path = req.path_project;
    let code = req.code;
    const codeinit = req.code;
    var item = 1;
    return shell.exec('npm test', function(res){
      //console.log("Shell Response: ",res);
      //shell.exec('allure generate ./allure-results');
      //shell.exec('allure open');
      /*console.log("Reporte: ",report.generate({
      	jsonDir: './test/json',
      	reportPath: './test/report'
      }));*/
      fs.readdir(`${path}/test/report`,function(err, items) {
          let file;
          for(i=0;i<items.length;i++){
              if(items[i].includes('html')){
                  file = items[i];
                  break;
              }
          }
          const content = fs.readFileSync(`${path}/test/report/${file}`);
          s3.saveFileToS3(`${code}`,content,()=>{
              for(i=0;i<items.length;i++){
                  if(items[i].includes('html')){
                      fs.unlinkSync(`${path}/test/report/${items[i]}`);
                  }
              }
              if(item == itemsEx){
                  success("ok");
              }else{
              item = item+1;
              resolve();
              }
          });
      });
      if(res == 0){
          success('ok');
      }else {
        success('Test fails');
        console.error('Test fails');
      }
    });

}
