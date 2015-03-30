var db=require('./db').db();
db.exec({'sql':'select u_id from user where u_name="tom"'},function(err,result){
    if(err){
        console.log(err);
        return;
    }
    console.log(result);
});

