(function () {
    var extra = require('../module/extra');
    var util = require('util');

    module.exports = function (app) {

        app.get('/favour/:a_id', function (req, res) {

            var articleId = req.params.a_id;

            if(!req.session.user) {
                req.flash('error', "please login first");
                return  res.redirect('/login');
            }
            if(!articleId || !articleId.length) {
                return req.status(400).send('invalidate articleId error');
            }
            var params = {articleId:articleId, user : req.session.user};

            extra.favour(params, function (err, data) {
                if (err) {
                    console.log(err);
                    return req.status(400).send('system busy');
                }
                res.redirect('/article/'+articleId);
            });
        });
        app.post('/post/comment/:a_id', function (req, res) {
            var articleId = req.params.a_id;
            var commentContent = req.body.content;
            if (!articleId || !articleId.length) {
                return res.status(400).send('paramete error');
            }

            if (!commentContent || !commentContent.length) {
                res.status(400).send('paramete error');
                return;
            }

            if (!req.session.user ) {
                req.flash('error',"please login first");
                return res.redirect('/login');
            }
            var params = {articleId : articleId,user:req.session.user,commentContent:commentContent};
            extra.postComment(params, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(400).send('system busy');
                }
                res.redirect('/article/'+articleId);
            });
        });
    }
})();
