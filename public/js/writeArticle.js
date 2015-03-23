(function () {
    angular.module('app.postArticle',['ngRoute'])
        .controller('WriteArticleController',['$http','$scope',function ($http,$scope) {

        $scope.post=function (){
            var articleTitle = $scope.articleTitle;
            var articleContent = $scope.articleContent;
           
            $http.post('/api/post/article', {
                articleTitle:articleTitle,
                articleContent:articleContent
            })
            .then(function (response) {
                $scope.article = response.data;
                });
        }
    }]);
})();
