'use strict'
const shell = require('shelljs');
const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const s3 = require('../../worker-sqs/s3Storage.js')

//const { exec } = require('child_process');


module.exports.generateCucumber = function(req,success,error){
    var child = shell.exec('./node_modules/.bin/wdio wdio.conf.js', function(code, stdout, stderr) {
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
    });
    //shell.exec('npm install');
    let itemsEx = req.numberExecution;
    let path = req.path_project;
    let code = req.code;
    const codeinit = req.code;
    var item = 1;
      /*
    //return shell.exec('npm test', function(res){
      fs.readdir(`${path}/test/report`,function(err, items) {
          let file;
          for(var i=0;i<items.length;i++){
              if(items[i].includes('html')){
                  file = items[i];
                  break;
              }
          }
          const content = fs.readFileSync(`${path}/test/report/${file}`);
          s3.saveFileToS3(`${code}`,content,()=>{
              for(var i=0;i<items.length;i++){
                  if(items[i].includes('html')){
                      fs.unlinkSync(`${path}/test/report/${items[i]}`);
                  }
              }
          });
      });
      if(res == 0){
          success('ok');
      }else {
        success('Test fails');
        console.error('Test fails');
      }
    });*/
}
