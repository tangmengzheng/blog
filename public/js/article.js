(function () {
    angular.module('app.article',['ngRoute'])
        .controller('ArticleController',['$http','$scope','$routeParams',function ($http,$scope,$routeParams) {
           $scope.a_id=$routeParams.a_id;

           $http.post('/api/article/'+$scope.a_id)
           .then(function (response) {
               $scope.article=response.data;
               });
        }]);

})();
