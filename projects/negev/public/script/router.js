var module = angular.module('library');

module.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('books', {
            url: '/',
            template: "bookContainer.comp.pug",
            params: {
                requireLogin: false
            }
        })

        .state('borrowers', {
            url: "/borrowers",
            templateUrl: "/views/borrowers.comp.pug",
            params: {
                requireLogin: false
            }
        })

        .state('bookCopy', {
            url: '/bookCopy',
            templateUrl: '/views/bookCopy.pug',
            controller: 'bookCopyCtrl',
            controllerAs: '$ctrl',
            params: {
                requireLogin: true
            }
        })

        .state('report', {
            url: "/report",
            templateUrl: "/views/report.pug",
            controller: "reportCtrl",
            params: {
                requireLogin: true
            }
        })

        .state('login', {
            url: "/login",
            templateUrl: "/views/login.pug",
            controller: "loginCtrl",
            params: {
                requireLogin: false
            }
        })

});