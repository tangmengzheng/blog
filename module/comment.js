(function () {
    var util = require('util');
    var db = require('../lib/db').db();

    var comment = {};

    comment.getComments = function (args, callback) {
        var sql = 'select c_content, u_name, create_time from comment where a_id = ?';
        db.exec({
            sql : sql,
            args : args
        }, function (err, data) {callback(err, data)})
    }
    comment.postComment = function(args, callback) {
        var sql = 'insert into comment(c_content, a_id, u_name) values(?,?,?);
        db.exec({
            sql : sql,
            args : args
        }, function (err, data) {callback(err, data)})
    }

    module.exports = comment;
})();

