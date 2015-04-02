'use strict'
var db = require('../lib/db').db();
var util =require('util');
var user={};
user.login=function(args, callback){
    var sql='select u_pwd from user where u_name=?';
    db.exec({
        'sql':sql,
        'args':args.name
    },function(err,data){ callback(err, data);});
}
user.sign = function(args, callback){
    var sql='insert into user(u_name, u_pwd , u_email) values (?, ?, ? )';
    db.exec({
        'sql':sql,
        'args':[args.name, args.password, args.email]
    },function (err, data) { callback(err, data); });
}
user.getUser = function (args, callback) {
    var sql = 'select count(0) as count from user where u_name = ?';
    db.exec({
        'sql':sql,
        'args':[args.user]
    },function (err, data) { callback(err, data); });
}
module.exports=user;
