'use strict'
var db = require('../lib/db').db();
var util =require('util');
var user={};
user.login=function(args,callback){
    var sql='select u_id,u_pwd from user where u_name=?';
    db.exec({
        'sql':sql,
        'args':args.name
    },function(err,data){
        if(err){
            callback(err,null);
            return;
        }
        callback(null,data[0]);
    });
}
user.sign = function(args,callback){
    var sql='insert into user(u_name, u_pwd , u_email) values (?, ?, ? )';
    db.exec({
        'sql':sql,
        'args':[args.name, args.password, args.email]
    },function (err, data) {
        if(err) {
            callback(err, null);
            return;
        }
        callback(null, data);
    });
}
module.exports=user;
