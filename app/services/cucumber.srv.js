'use strict'
const shell = require('shelljs');
const request = require('request');
const fs = require('fs');
const s3 = require('../../worker-sqs/s3Storage.js')


module.exports.generateCucumber = function(req,success,error){
    let itemsEx = req.numberExecution;
    let path = req.path_project;
    let code = req.code;
    const codeinit = req.code;
    var item = 1;
    for(var i = 0,p = Promise.resolve();i<itemsEx;i++){
        p= p.then(_ => new Promise(resolve => {
            code = `${codeinit}_${item}`;
            shell.exec('./node_modules/.bin/wdio wdio.conf.js', function(stdout, stderr) {
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
                        if(item == itemsEx){
                            success("ok");
                        }else{
                            item = item+1;
                            resolve();
                        }
                    });
                });
            });
        }));
    }
}
