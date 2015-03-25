(function () {
var Path=require('path');
var Login=require('../module/login');
var util=require('util');
var article=require('../module/article');

    module.exports=function(app){
        app.get('/login',function(req,res){
            res.render('login',{
				error: req.flash('error').toString(),
				success: req.flash('success').toString()
				});
        });

        app.get('/logout', function (req, res) {
            req.session.user = null;
            res.redirect('/home');
        });

        app.post('/login',function(req, res){
            var name=req.body.name;
            var password=req.body.password;

            if(!name|| name.length===0){
				req.flash('error', "name is null");
				return res.redirect('/login');
            }
            if(!password||password.length===0){
                req.flash('error', "password is null");
				return res.redirect('/login');
            }

            var params={'name': name,'password':password};
            Login.login(params,function(err,data){
                if(err){
                    console.log(err);
                    req.flash('error', "system busy");
					return res.redirect('/login');
                }
                if(!data||data.u_pwd!=password){
                    console.log("name or password fault");

                    req.flash('error', "name or password fault");
					return res.redirect('/login');
                }
                var user = data.u_id; 
                req.session.user = user;
                res.cookie('user', user);
                res.cookie('name', name);
                res.redirect('/home');
            });

        });
    }
})();
