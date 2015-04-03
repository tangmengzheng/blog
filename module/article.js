(function () {
    var db = require('../lib/db').db();
    var util = require('util');
    var article = {};

    article.getArticles = function (args, callback) {
        var sql='select a_id,a_title,create_time from article where u_name = ? and a_status = 0 order by create_time desc';
        db.exec({
            sql:sql,
            args:args
        }, function(err, data){
            callback(err, data);
        });
    }

    article.getArticle = function(args, callback) {
        var articleSql = 'select a_id, a_read, a_favour, a_title,a_content,u_name, create_time from article where a_id=? ';
        db.exec({
            sql:articleSql,
            args:args
        },function(err,data){
            callback(err,data[0]);
        });
    }

    article.getArticleUser = function (args, callback) {
        var sql = 'select u_name from article where a_id = ?';
        db.exec({
            sql : sql,
            args : args.articleId
        }, function (err, data) {
            callback(err, data[0]); 
        });

    }

    article.postArticle = function (args,callback) {
        var sql = 'insert into article(a_title,a_content,u_name) values (?,?,?)';
        db.exec({
            sql:sql,
            args:[args.articleTitle, args.articleContent, args.user],
        },function (err, data) {
            callback(err, data);
        });
    }

    article.rePostArticle = function (args,callback) {
        var sql = 'update  article set a_title = ?, a_content = ? where a_id = ?';
        db.exec({
            sql:sql,
            args:[args.articleTitle, args.articleContent, args.articleId],
        },function (err, data) {
            callback(err,data);
        });
    }
    article.deleteArticle = function (args,callback) {
        var sql = 'update  article set a_status = 1 where a_id = ?';
        db.exec({
            sql:sql,
            args:[args.articleId],
        },function (err, data) {
            callback(err,data);
        });
    }

    module.exports=article;
})();
