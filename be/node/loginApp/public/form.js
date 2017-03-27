var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.send = function() {
        $http({
            method: 'POST',
            url: '/login',
            data: { username: $scope.username, password: $scope.password }
        }).then(function successCallback(response) {
            location.replace(response.data);
        }, function errorCallback(response) {
                alert('Sorry, try again later');
        });
    }

});