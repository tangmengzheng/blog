(function () {
    var util = require('util');
    var db = require('../lib/db').db();

    var extra = {};

    extra.getComments = function (args, callback) {
        var sql = 'select c_content, u_name, create_time from comment where a_id = ?';
        db.exec({
            sql : sql,
            args : [args.articleId]
        }, function (err, data) {callback(err, data)})
    };

    extra.postComment = function(args, callback) {
        var sql = 'insert into comment(c_content, a_id, u_name) values(?,?,?)';
        db.exec({
            sql : sql,
            args : [args.commentContent, args.articleId, args.user]
        }, function (err, data) {callback(err, data)})
    };

    extra.queryFavour = function (args, callback) {
        var sql = 'select count(0) as count from favour where a_id = ? and u_name = ?';
        db.exec({
            sql : sql,
            args : [args.articleId, args.user]
        }, function (err, data) { callback(err, data[0]) });

    };

    extra.favour = function (args, callback) {
        var sql = 'update article set a_favour = a_favour + 1 where a_id = ?';
        db.exec({
            sql : sql,
            args : [args.articleId]
        }, function (err, data) {callback(err, data)});
    };

    extra.recordFavour = function (args, callback) {
        var sql = 'insert into favour(a_id, u_name) values (?, ?)';
        db.exec({
            sql : sql,
            args : [args.articleId, args.user]
        }, function (err, data) { callback(err, data) });
    };

    extra.read = function (args, callback) {
        var sql = 'update article set a_read = a_read + 1 where a_id = ?';
        db.exec({
            sql : sql,
            args : [args.articleId]
        }, function (err, data) {callback(err, data)})
    }

    module.exports = extra;
})();

