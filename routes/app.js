(function () {
var Path=require('path');
var Login=require('../module/login');
var util=require('util');
var article=require('../module/article');

module.exports=function(app){
    /* GET home page. */
    app.get('/', function(req, res) {
        res.redirect('/home');
    });
    app.get('/sign',function(req, res){
        res.render('sign',{ error: req.flash('error').toString() });
    });
    app.post('/sign',function(req,res){
        var name = req.body.name;
        var password = req.body.password;
        var email = req.body.email;

        if (!name || !name.length){
            req.flash('error', "name is null");
            return res.redirect('/sign');
        }
        if (!password || !password.length){
            req.flash('error', "password is null");
            return res.redirect('/sign');
        }

        if (!email || !email.length) {
            req.flash('error', "email is null");
            return res.redirect('/sign');
        }

        var params={'name': name,'password': password, 'email': email };
        Login.sign(params,function(err,data){
            if(err){
                req.flash('error',"system busy");
                return res.redirect('/sign');
            }
            req.flash('success', "sign success, please login");
            res.redirect('/login');
        });

    });
    app.get('/home',function(req,res){
        var user;
        if(!req.session.user){
            user = 1;
        }else {
            user=req.session.user;
        }
        article.getArticles(user, function (err,articles) {
            if(err){
                console.log(err);
            }
            res.render('home', {articles: articles, user: req.session.user});
        });
    });
    app.get('/write/article/', function(req, res) {
        res.render('edit',{article:null ,user: req.session.user});
    });

    app.get('/about',function(req,res){
        res.render('about',{user:req.session.user});
    });

}

})();
