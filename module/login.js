'use strict'
var db = require('../lib/db').db();
var util =require('util');
var self={};
self.login=function(args,callback){
    var sql='select u_id,u_pwd from user where u_name=?';
    db.exec({
        'sql':sql,
        'args':args.userName
    },function(err,data){
        if(err){
            callback(err,null);
            return;
        }
        console.log("the db returns "+util.inspect(data));
        callback(null,data[0]);
    });
}
self.sign = function(args,callback){
    var sql='insert into user(u_name, u_pwd , u_email) values (?, ?, ? )';
    db.exec({
        'sql':sql,
        'args':[args.userName, args.password, args.email]
    },function(err,data){
        if(err){
            callback(err,null);
            return;
        }
        console.log("the db returns "+util.inspect(data));
    });
}
module.exports=self;
