(function () {
var Path = require('path');
var util = require('util');
var article = require('../module/article');
var extra = require('../module/extra');

    module.exports=function(app){
        app.get('/article/:a_id',function(req, res){
            var articleId=req.params.a_id;
            if (!articleId) {
                console.log('articleId is null');
                return res.status(400).send('parame error');
            }
            extra.read({articleId:articleId}, function (err, data) {
                if (err) {
                    console.og(err);
                    return;
                }
            });

            article.getArticle(articleId,function(err,article) {
                if (err) {
                    console.log(err);
                    return res.status(400).send('system busy');
                }

                var params = { articleId : articleId};
                extra.getComments(params, function(err, comments) {
                    if (err) {
                        console.log(err);
                        return res.status(400).send('system busy');
                    }
                    res.render('article' ,{article : article, comments : comments, user:req.session.user});
                });
            });
        });

        app.get('/write/article/', function(req, res) {
            //非法请求 
            if (!req.session.user || req.session.user != 'root') {
                return res.render('404');
            }
            res.render('edit',{article:null ,user: req.session.user});
        });
        app.get('/edit/:a_id', function (req, res) {

            var articleId=req.params.a_id;
            if (!articleId || !articleId.length) {
                return res.status(400).send("parame error");
            }

            //非法请求 
            if (!req.session.user) {
                return res.render('404');
            }else {
                article.getArticleUser({articleId : articleId}, function (err, data) {
                    if (err) {
                        console.log(err);
                        res.status(400).send("system busy");
                    }else if (data.u_name != req.session.user) {
                        return res.render("404");
                    }else {
                        article.getArticle(articleId,function(err,article) {
                            if (err) {
                                console.log(err);
                                return res.status(400).send('parame error');
                            }
                            res.render('edit' ,{article:article ,user: req.session.user});
                        });
                    }
                });
            }
        });

        app.post('/post/article', function (req, res) {
            var user = req.session.user;
            var articleTitle = req.body.title;
            var articleContent = req.body.content;
            
            //user is a number
            if (!user || user != 'root' ) {
                console.log("session is out of day");
                return res.render('404');
            }
            if (!articleTitle || !articleTitle.length) {
                console.log("the articleTitle is null") 
                return res.status(400).send('parame error');
            }
            if (!articleContent || !articleContent.length) {
                console.log("the articleContent is null");
                return res.status(400).send('parame error');
            }

            var params = {user : user, articleTitle : articleTitle, articleContent : articleContent };
            article.postArticle(params, function (err,data) {
                if (err) {
                    console.log(err);
                    return res.status(400).send('system busy');
                }
                res.redirect('/');
            });

        });
        app.post('/post/article/:a_id', function (req, res) {
            var articleId = req.params.a_id;
            var user = req.session.user;
            var articleTitle = req.body.title;
            var articleContent = req.body.content;

            if (!articleId) {
                console.log("articleId is null");
                return res.status(400).send('parame error');
            }
            if (!user ) {
                console.log("session is out of day");
                return res.redirect('/login');
            }
            if (!articleTitle || !articleTitle.length) {
                console.log("the articleTitle is null") 
                return res.status(400).send('parame error');
            }
            if (!articleContent || !articleContent.length) {
                console.log("the articleContent is null");
                return res.status(400).send('parame error');
            }

            article.getArticleUser({articleId:articleId}, function (err, data) {
                if (err) {
                    console.log(err);
                    return res.status(400).send("system busy");
                }else if (data.u_name != req.session.user) {
                    return res.render(404);
                }else {
                    var params = {articleId : articleId, articleTitle : articleTitle, articleContent : articleContent };

                    article.rePostArticle(params, function (err,data) {
                        if (err) {
                            console.log(err);
                            return res.status(400).send('system busy');
                        }
                        res.redirect('/');
                    });
                }
            });
        });

        app.get('/delete/article/:a_id', function (req, res) {

            var articleId = req.params.a_id;

            if (!articleId) {
                console.log("articleId is null");
                return res.status(400).send('parame error');
            }

            //非法请求 
            if (!req.session.user) {
                return res.render('404');
            }else {
                article.getArticleUser({articleId:articleId}, function (err, data) {
                    if (err) {
                        console.log(err);
                        return res.status(400).send("system busy");
                    }else if (data.u_name != req.session.user) {
                        return res.render(404);
                    }else {
                        var params = {articleId : articleId };
                        article.deleteArticle(params, function (err, data) {
                            if (err) {
                                console.log(err);
                                return res.status(400).send('system busy');
                            }
                           return  res.redirect('/');
                        });
                    }
                });

            }
        });
    }
})();
