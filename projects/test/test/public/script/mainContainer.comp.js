(function () {
    "use strict";

    var module = angular.module("library");

    function controller($scope) {
        var that = this;
        $scope.$on("gotBooks", function(scope, books){
            debugger;
            that.books = books;
        })
    }

    module.component("mainContainer", {
        templateUrl: "templates/main.comp.html",
        controllerAs: "model",
        controller: ["$scope", controller]
    });
})();