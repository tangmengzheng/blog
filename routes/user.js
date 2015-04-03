(function () {
var path = require('path');
var User = require('../module/user');
var util = require('util');
var crypto = require('crypto');

    module.exports = function(app) {

        app.get('/login',function(req,res){
            if (req.session.user) {
                req.session.user = null;
            }
            res.render('login',{
                user:null,
				error: req.flash('error').toString(),
				success: req.flash('success').toString()
				});
        });
        app.post('/login',function(req, res){
            var name = req.body.name;
            var password = req.body.password;

            if(!name|| name.length===0){
				req.flash('error', "name is null");
				return res.redirect('/login');
            }
            if(!password||password.length===0){
                req.flash('error', "password is null");
				return res.redirect('/login');
            }

            var md5 = crypto.createHash('md5');
            password = md5.update(password).digest('base64');

            var params={'name': name};
            User.login(params,function(err,data){
                if(err){
                    console.log(err);
                    req.flash('error', "system busy");
					return res.redirect('/login');
                }
                if(!data || data.u_pwd != password){
                    console.log("name or password fault");
                    req.flash('error', "name or password fault");
					return res.redirect('/login');
                }
                req.session.user = name;
                res.cookie('user', name);
                res.redirect('/');
            });

        });

        app.get('/sign',function(req, res){
            if (req.session.user) {
                req.session.user = null;
            }
            res.render('sign',{
                user : null,
                error: req.flash('error').toString()
            });
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

            var params = { user : name};
            User.getUser(params, function (err, data) {
                if (err) {
                    console.log(err);
                    return res.status(400).send('system error');
                }
                console.log('the data is '+ util.inspect(data[0]));
                if (data[0].count > 0) {
                    req.flash('error',"sorry, the name has already be signed"); 
                    return res.redirect('/sign');
                }

                var md5 = crypto.createHash('md5');
                password = md5.update(password).digest('base64');

                var params={'name': name,'password': password, 'email': email };

                User.sign(params, function(err, data){
                    if(err){
                        req.flash('error', "system busy");
                        return res.redirect('/sign');
                    }
                    req.flash('success', "sign success, please login");
                    res.redirect('/login');
                });
            });


        });

        app.get('/logout', function (req, res) {
            req.session.user = null;
            res.redirect('/');
        });

    }
})();
