'use strict'
const shell = require('shelljs');

module.exports.generateCucumber = function(req,success,error){

    shell.exec('npm install');
    return shell.exec('npm test', function(res){
      console.log("Shell Response: ",res);
      if(res == 0){
          success('ok');
      }else {

        console.error('Test fails');
      }
    });

}
