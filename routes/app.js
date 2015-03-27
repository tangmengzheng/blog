(function () {
var path = require('path');
var util = require('util');
var article = require('../module/article');
var formidable = require('formidable');

    module.exports=function(app){
        /* GET home page. */
        app.get('/', function(req, res) {
            res.redirect('/home');
        });
        app.get('/home', function(req, res){
            var user;
            if(!req.session.user){
                user = 1;
            }else {
                user=req.session.user;
            }
            article.getArticles(user, function (err, articles) {
                if(err){
                    console.log(err);
                }
                res.render('home', {articles: articles, user: req.session.user});
            });
        });

        app.get('/about', function(req, res){
            res.render('about',{user:req.session.user});
        });
        app.post('/uploadImg', function(req, res) {
            var form = new formidable.IncomingForm();
            form.keepExtensions = true;
            form.uploadDir = path.join(__dirname , '../public/upload/');
            form.parse(req, function (err, fields, files) {
                if (err) {
                    throw err;
                }
                var image = files.imgFile;
                var imagePath = image.path;
                var url = '/upload/' + path.basename(imagePath);
                var info = {
                    "error": null,
                    "url": url
                };
                res.send(info);
            });
        });
        app.get('/upload/:file', function (req, res ) {
            var fileName = req.parames.file;
            res.sendFile(path.join(__dirname, '../public/upload/' + fileName));
        });

    }

})();
