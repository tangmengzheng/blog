(function () {
var Path=require('path');
var Login=require('../module/login');
var util=require('util');
var article=require('../module/article');

    module.exports=function(app){
        app.get('/login',function(req,res){
            res.render('login');
        });

        app.post('/login',function(req,res){
            var userName=req.body.name;
            var password=req.body.password;

            if(!userName||userName.length===0){
                res.status(400).send("invalid user name");
                return;
            }
            if(!password||password.length===0){
                res.status(400).send("invalid pass word");
                return;
            }

            var params={'userName':userName,'password':password};
            Login.login(params,function(err,data){
                if(err){
                    console.log(err);
                    res.status(400).send("system busy");
                    return;
                }
                console.log("the data is :",util.inspect(data));
                if(!data||data.u_pwd!=password){
                    console.log("userName or password fault");

                    res.status(400).send("userName or password fault");
                    return;
                }
                var userId=data.u_id; 
                req.session.userId=data.u_id;
                res.cookie('userId',userId);
                res.cookie('userName',userName);
                res.redirect('/main');
            });

        });
    }
})();
