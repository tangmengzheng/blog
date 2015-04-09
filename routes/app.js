(function () {
var path=require('path');
var util=require('util');
var article=require('../module/article');
var formidable = require('formidable');
var Captcha = require('../lib/captcha');

module.exports=function(app){
    /* GET home page. */
    app.get('/', function(req, res) {
        var user = 'root';
        /*
        if(!req.session.user){
            user = 'root';
        }else {
            user = req.session.user;
        }
        */
        article.getArticles(user, function (err,articles) {
            if(err){
                console.log(err);
            }
            res.render('home', {articles: articles, user: req.session.user});
        });
    });

    app.get('/about', function(req, res) {
        res.render('about',{user:req.session.user});
    });

	app.post('/uploadimg', function (req, res) {
		var form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.uploadDir = path.join(__dirname,'../public/upload/');
		form.parse(req, function (err, fields, files) {
			if (err) {
				throw err;
			}
			var image = files.imgFile;
			var imgPath = image.path;
			var url = path.join('/upload/', path.basename(imgPath));
			var info = {
				"error": 0,
				"url": url
			};
			res.send(info);
		});
	});
	app.get('/upload/:file', function (req, res) {
		var img = req.params.file;
		res.sendFile(path.join(__dirname,'../public/upload/'+img));
	});

    app.get('/robots.txt', function (req, res ) {
       res.sendFile(path.join(__dirname,"../public/robots.txt"));
    });
    app.get('/sitemap.xml', function (req, res ) {
        res.sendFile(path.join(__dirname,"../public/sitemap.xml"));
    });
    app.get('/captcha', function (req, res) {
        var arry = Captcha.getCaptcha();
        if (!arry) {
            res.send(null);
            return;
        }
        req.session.captcha = arry[0];
        res.send(arry[1]);
        return;
    });

}

})();
