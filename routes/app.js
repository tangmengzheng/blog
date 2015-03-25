(function () {
var Path=require('path');
var Login=require('../module/login');
var util=require('util');
var article=require('../module/article');

module.exports=function(app){
    /* GET home page. */
    app.get('/', function(req, res) {
        res.redirect('/main');
    });
    app.get('/sign',function(req, res){
        res.render('sign');
    });
    app.post('/sign',function(req,res){
        var userName = req.body.name;
        var password = req.body.password;
        var email = req.body.email;

        if (!userName || !userName.length){
            res.status(400).send("invalid user name");
            return;
        }
        if (!password || !password.length){
            res.status(400).send("invalid pass word");
            return;
        }

        if (!email || !email.length) {
            res.status(400).send("invalid email");
            return;
        }

        var params={'userName': userName,'password': password, 'email': email };
        Login.sign(params,function(err,data){
            if(err){
                console.log(err);
                res.status(400).send("system busy");
                return;
            }
            res.redirect('/main');
        });

    });
    app.get('/main',function(req,res){
        var userId;
        if(!req.session.userId){
            userId = 1;
        }else {
            userId=req.session.userId;
        }
        article.getArticles(userId, function (err,articles) {
            if(err){
                console.log(err);
                res.render('mainpage', {articles:articles,user:req.session.userId});
            }
            res.render('mainpage', {articles: articles, user: req.session.userId});
        });
    });
    app.get('/write/article/', function(req, res) {
        res.render('edit',{article:null ,user: req.session.userId});
    });

    app.get('/about',function(req,res){
        res.render('about',{user:req.session.userId});
    });

}

})();
