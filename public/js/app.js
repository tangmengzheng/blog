(function () {
    'use strict';
    angular .module('app',['ngRoute',
            'app.mainpage',
            'app.article',
            'app.postArticle'
            ])
        .config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            }); 

            $routeProvider
                .when('/',{
                    templateUrl:'/html/mainpage.html'
                })
                .when('/about',{
                    templateUrl:'/html/about.html'
                })
                .when('/write/article',{
                    templateUrl:'/html/edit.html'
                })
                .when('/user/main',{
                    templateUrl:'/html/mainpage.html'
                })
                .when('/article/:a_id',{
                    templateUrl:'/html/article.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]);
})();
