(function(){
    'use strict';
    angular.module('app.login',[])
    .controller('loginController',['$scope','$http','$window',function($scope,$http,$window){
        $scope.login=function(){
            $http.post('/api/login',{
                userName:$scope.userName,
                password:$scope.password
            }).then(function(response){
                console.log(response);
                if(response.status!=200){
                    $scope.err=response.data.err;
                    return;
                }
                console.log(response);
                $scope.flag="success";
                $window.location.href='/user/main';
                console.log("hello");
            });

                /*
            }).success(function(data,status,headers,config){
                console.log(data);
                $scope.flag="success";
                $window.location.href='/user/main/'+data.userId;
            }).error(function(data,status,headers,config){
                console.log(data);
                $scope.errReason=data;
                $timeout(function(){
                    $scope.errReson=null;
                },5000);
            });
            */
        }
        
    }]);
})();

