(function () {
    angular.module('app.mainpage',['ngCookies'])
        .controller('MainPageController',function($scope,$http,$cookies){
        $http.post('/api/main')
        .then(
            function (response) {
                var respData=response.data;
                console.log(respData);
                console.log(typeof respData);
                $scope.articles=respData;
                $scope.userName=$cookies.userName;
            }
            );


            


    });

})();
