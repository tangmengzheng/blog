(function () {
var Path=require('path');
var Login=require('../module/login');
var util=require('util');
var article=require('../module/article');

module.exports=function(app){
    /* GET home page. */
    app.get('/', function(req, res) {
        res.render('mainpage');
    });
    app.get('/sign',function(req,res){
        res.render('sign');
    });
    app.post('/sign',function(req,res){
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
                res.render('mainpage', {articles:articles});
            }
            res.render('mainpage', {articles: articles});
        });
    });
    app.get('/write/article/', function(req, res) {
        res.render('edit',{article:null});
    });

    app.get('/about',function(req,res){
        res.render('about');
    });

}

})();
