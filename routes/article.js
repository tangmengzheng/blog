(function () {
var Path=require('path');
var util=require('util');
var article=require('../module/article');

    module.exports=function(app){
        app.get('/article/:a_id',function(req, res){
            var articleId=req.params.a_id;
            article.getArticle(articleId,function(err,article) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.render('article' ,{article:article ,user:req.session.userId});
            });
        });
        app.get('/edit/:a_id', function (req, res) {
            var articleId=req.params.a_id;
            article.getArticle(articleId,function(err,article) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.render('edit' ,{article:article ,user: req.session.userId});
            });
        });

        app.post('/post/article', function (req, res) {
            var userId = req.session.userId;
            var articleTitle = req.body.title;
            var articleContent = req.body.content;
            
            //userId is a number
            if (!userId ) {
                console.log("session is out of day");
                return;
            }
            if (!articleTitle || !articleTitle.length) {
                console.log("the articleTitle is null") 
                return;
            }
            if (!articleContent || !articleContent.length) {
                console.log("the articleContent is null");
                return;
            }

            var params = {userId : userId, articleTitle : articleTitle, articleContent : articleContent };

            article.post(params, function (err,respData) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.redirect('/main');
            });

        });
        app.post('/post/article/:a_id', function (req, res) {
            var articleId = req.params.a_id;
            var userId = req.session.userId;
            var articleTitle = req.body.title;
            var articleContent = req.body.content;

            if (!articleId) {
                console.log("articleId is null");
                return;
            }
            
            //userId is a number
            if (!userId ) {
                console.log("session is out of day");
                return;
            }
            if (!articleTitle || !articleTitle.length) {
                console.log("the articleTitle is null") 
                return;
            }
            if (!articleContent || !articleContent.length) {
                console.log("the articleContent is null");
                return;
            }

            var params = {articleId : articleId, articleTitle : articleTitle, articleContent : articleContent };


            article.rePost(params, function (err,respData) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.redirect('/main');
            });

        });
        app.get('/delete/article/:a_id', function (req, res) {
            var articleId = req.params.a_id;
            var userId = req.session.userId;

            if (!articleId) {
                console.log("articleId is null");
                return;
            }
            
            //userId is a number
            if (!userId ) {
                console.log("session is out of day");
                return;
            }

            var params = {articleId : articleId };


            article.delet(params, function (err,respData) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.redirect('/main');
            });

        });
    }
})();
