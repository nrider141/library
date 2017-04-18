angular.module('library').controller('loginCtrl', function ($scope, loginService, $http, $state) {
	$scope.email;
	$scope.password;
	$scope.loginService == loginService;
	$scope.login = function (event) {
		event.preventDefault();
		$http.post("/api/login", { user: { email: $scope.email, password: $scope.password } })

			.then(function (res) {
				if (res.data.loginUser.password == $scope.password) {
					loginService.isAuthenticated = true;
					$state.go("books");
				} else {
					loginService.isAuthenticated = false;
				}
			})
	};
})

	.service('loginService', function () {
		this.isAuthenticated = false;
	})