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
        if(itemsEx>1){
            code = `${codeinit}_${item}`;
        }else{
            code = `${codeinit}`;
        }
        requestcall(path,code,req,codeinit,itemsEx).then(()=>{
            shell.exec('./node_modules/.bin/wdio wdio.conf.js', function(stdout, stderr) {
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
                });
            });
        }));
    }
}

function requestcall(path_project,code,req,codeinit,itemsEx) {
    return new Promise(function(resolve, reject) {
        if(itemsEx>1){
            let insert = "INSERT INTO `hangover`.`EXECUTION_TESTS` (`code`, `id_application`, `type_application_name`, `level_name`, `type_name`, `type_execution_name`, `number_executions`, `execution_time`, `repetitions`, `status`,`parent`)" 
                     +  "VALUES ('" + `${code}` + "', '" + req.aplication + "', '" + req.typeAplication + "', '" + req.level + "', '" + req.type + "', '" + req.subType + "', '" + req.numberExecution + "', '" + req.executionTime + "', '" + req.repetitions + "', '" + req.status + "','" + codeinit + "');";
            console.log(insert);
            db.query(insert, (err, result) => {
                if (err) throw error;
                resolve("ok");
            });
        }else{
            resolve("ok");
        }                
    }); 
 }
