angular.module('library', ['ui.router', 'ui.bootstrap'])
    .run(function (editableOptions, $rootScope, $state, loginService) {
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toStateParams) {
                if (toStateParams.requireLogin && !loginService.isAuthenticated) {
                    $state.go("login");
                    event.preventDefault();
                }
            });

        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });

