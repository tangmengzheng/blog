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
                res.render('article' ,{article:article ,user:req.session.user});
            });
        });
        app.get('/write/article/', function(req, res) {
            res.render('edit',{article:null ,user: req.session.user});
        });
        app.get('/edit/:a_id', function (req, res) {
            var articleId=req.params.a_id;
            article.getArticle(articleId,function(err,article) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.render('edit' ,{article:article ,user: req.session.user});
            });
        });

        app.post('/post/article', function (req, res) {
            var user = req.session.user;
            var articleTitle = req.body.title;
            var articleContent = req.body.content;
            
            //user is a number
            if (!user ) {
                console.log("session is out of day");
                return res.redirect('/login');
            }
            if (!articleTitle || !articleTitle.length) {
                console.log("the articleTitle is null") 
                return;
            }
            if (!articleContent || !articleContent.length) {
                console.log("the articleContent is null");
                return;
            }

            var params = {user : user, articleTitle : articleTitle, articleContent : articleContent };

            article.postArticle(params, function (err,respData) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.redirect('/home');
            });

        });
        app.post('/post/article/:a_id', function (req, res) {
            var articleId = req.params.a_id;
            var user = req.session.user;
            var articleTitle = req.body.title;
            var articleContent = req.body.content;

            if (!articleId) {
                console.log("articleId is null");
                return;
            }
            
            //user is a number
            if (!user ) {
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


            article.rePostArticle(params, function (err,respData) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.redirect('/home');
            });

        });
        app.get('/delete/article/:a_id', function (req, res) {
            var articleId = req.params.a_id;
            var user = req.session.user;

            if (!articleId) {
                console.log("articleId is null");
                return;
            }
            
            //user is a number
            if (!user ) {
                console.log("session is out of day");
                return;
            }

            var params = {articleId : articleId };


            article.deleteArticle(params, function (err,respData) {
                if (err) {
                    console.log(err);
                    return;
                }
               return  res.redirect('/home');
            });

        });
    }
})();
