var db=require('../lib/db').db();
var utile=require('util');
var self={};
self.getArticles=function(args,callback){
    var sql='select a_id,a_title,create_time from article where u_id=?';
    db.exec({
        sql:sql,
        args:args
    },function(err,data){
        callback(null,data);
        return ;
    });
}
self.getArticle=function(args,callback){
    var sql='select a_title,a_content,create_time from article where a_id=?';
    db.exec({
        sql:sql,
        args:args
    },function(err,data){
        if(err){
            callback(err,nil);
            return;
        }
        callback(null,data[0]);
    });
}
module.exports=self;
