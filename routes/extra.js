(function () {
    var extra = require('../module/extra');
    var util = require('util');

    module.exports = function (app) {

        app.get('/favour/:a_id', function (req, res) {

            var articleId = req.params.a_id;
            var favour_amount = parseInt(req.query.favour_amount);
            console.log("the amount is "+favour_amount);

            if(!req.session.user) {
                req.flash('error', "please login first");
                return;
            }
            if(!articleId || !articleId.length) {
                return;
            }
            var params = {articleId:articleId, user : req.session.user};

            extra.queryFavour(params, function (err, data) {
                console.log(data);
                if (err) {
                    console.log(err);
                    return;
                }else if (data.count != 0) {
                    return;
                }
                extra.favour(params, function (err, data) {
                    if(err) {
                        console.log(err);
                    }
                });
                extra.recordFavour(params, function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                });
                var str = String(favour_amount+1);
                return res.send(str);
            });
        });
        app.post('/post/comment/:a_id', function (req, res) {

            console.log(util.inspect(req.body)+util.inspect(req.params));
            var articleId = req.params.a_id;
            var commentContent = req.body.comment;
            if (!articleId || !articleId.length) {
                console.log('article id is null');
                return res.status(400).send('paramete error');
            }

            if (!commentContent || !commentContent.length) {
                console.log('comment is null');
                res.status(400).send('paramete error');
                return;
            }

            if (!req.session.user ) {
                console.log('user not log in');
                return ;
            }
            var params = {articleId : articleId,user:req.session.user,commentContent:commentContent};
            extra.postComment(params, function (err, data) {
                if (err) {
                    console.log(err);
                    return  res.status(400).send('system busy');
                }
                return res.send("success");
            });
        });
    }
})();
