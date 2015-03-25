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
		res.redirect('/login');
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
