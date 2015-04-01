(function () {
    var db = require('../lib/db').db();
    var util = require('util');
    var article = {};

    article.getArticles = function(args, callback){
        var sql='select a_id,a_title,create_time from article where and status = 0 order by create_time desc';
        db.exec({
            sql:sql,
            args:args
        }, function(err, data){
            if (err) {
                callbacke(err, null);
                return;
            }
            callback(null,data);
            return ;
        });
    }
    article.getArticle = function(args, callback){
        var articleSql = 'select a_id, a_read, a_favour, a_title,a_content,u_name, create_time from article where a_id=? ';
        var commentSql = 'select c_id, c_ontent
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
    article.postArticle = function (args,callback) {
        var sql = 'insert into article(a_title,a_content,u_name) values (?,?,?)';
        db.exec({
            sql:sql,
            args:[args.articleTitle, args.articleContent, args.user],
        },function (err, data) {
            if(err) {
                console.log(err);
                callback(err,null);
                return;
            }
            callback(null,data);
            return;
        });
    }

    article.rePostArticle = function (args,callback) {
        var sql = 'update  article set a_title = ?, a_content = ? where a_id = ?';
        db.exec({
            sql:sql,
            args:[args.articleTitle, args.articleContent, args.articleId],
        },function (err, data) {
            if(err) {
                console.log(err);
                callback(err,null);
                return;
            }
            callback(null,data);
            return;
        });
    }
    article.deleteArticle = function (args,callback) {
        var sql = 'update  article set status = 1 where a_id = ?';
        db.exec({
            sql:sql,
            args:[args.articleId],
        },function (err, data) {
            if(err) {
                console.log(err);
                callback(err,null);
                return;
            }
            callback(null,data);
            return;
        });
    }

    module.exports=article;
})();
