var module = angular.module('library');

module.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('books', {
            url: '/',
            template: "<book-container></book-container>",
            params: {
                requireLogin: true
            }
        })

        .state('borrowers', {
            url: "/borrowers",
            template: "<borrower-container></borrower-container>",
            params: {
                requireLogin: true
            }
        })
        
        .state('bookCopy', {
            url: '/bookCopy',
            templateUrl: '../templates/bookCopy',
            controller: 'bookCopyCtrl',
            controllerAs: '$ctrl',
            params: {
                requireLogin: true
            }
        })
        
        .state('report', {
            url: "/report",
            templateUrl: "../templates/report",
            controller: "reportCtrl",
            params: {
                requireLogin: true
            }
        })
        
        .state('login', {
            url: "/login",
            templateUrl: "../templates/login",
            controller: "loginCtrl",
            params: {
                requireLogin: false
            }
        })

});