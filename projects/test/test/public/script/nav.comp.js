(function () {
    "use strict";

    var module = angular.module("library");

    function controller($http, $scope) {
        var that = this;
        this.options = ["books", "stuff"];
        this.searchForBook = function () {
            $http.get("/api/books/" + that.searchText).then(function (res) {
                $scope.$root.$broadcast("gotBooks", res.data.books);
            });
        }
    }

    module.component("navbar", {
        templateUrl: "templates/navbar.comp.html",
        controllerAs: "model",
        controller: ["$http", "$scope", controller]
    });
})();