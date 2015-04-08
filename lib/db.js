(function (){
    'use strict';
    var mysql = require('mysql');
    var util = require('util');

    var Pool={};
    Pool.db=function(){
        var pool=mysql.createPool({
            'host':'localhost',         
            'port':'3306',             
            'user':'root',    
            'password':'root',    
            'database':'blog',        
            'connectionLimit':2      
        });
        var self={};
        createPool(self,pool);
        return self;
    }
    var createPool=function(self,pool){
        self.release=function(conn){
            conn.end(function(err){
                log.error('Database closed :',err);
                return;
            });
        };
        self.exec=function(options,callback){
            pool.getConnection(function(err,conn){
                if(err){
                    callback(err,null);
                    return;
                }
                var sql = options.sql;
                var args = options.args;

                if(!args){
                    conn.query(sql, function(err,result){
                        conn.release();
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if(callback){
                            callback(err,result);
                        }
                        return;
                    });
                }else {
                    conn.query(sql,args,function(err,result){
                        conn.release();
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if(callback){
                            callback(err,result);
                        }
                        return;
                    });
                }
            });
        }
    }
    module.exports=Pool;
})();
