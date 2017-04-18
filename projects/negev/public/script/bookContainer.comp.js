var module = angular.module('library');
module.controller('ModalInstanceCtrl', function ($http, $uibModalInstance) {
    var $ctrl = this;
    $ctrl.copyId = "";
    $ctrl.author = "";
    this.filter = "All"
    $ctrl.book = {
        ISBN: "",
        authors: [],
        title: "",
        description: "",
        copies: [],
        price: "",
        imgSrc: ""
    },
        $ctrl.copy = {
            copyId: "",
            status: "Available",
            lastBorrowed: "",
            borrowedDate: ""
        }
    $ctrl.ok = function () {
        $ctrl.book.authors = $ctrl.author.split(",");
        $ctrl.copy.copyId = $ctrl.copyId;
        $ctrl.book.copies.push($ctrl.copy);
        $http.post("/api/books", { book: $ctrl.book })

            .then(function (success) {
                $uibModalInstance.dismiss('cancel');
            }, function (error) {
                $uibModalInstance.dismiss('cancel');
            })
    };

    this.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})

function controller($scope, $http, $uibModal) {
    var that = this;
    this.filter = 'All';
    this.filterSelected = function (event, filter) {
        event.preventDefault();
        this.filter = filter;
        this.searchForBooks(filter);
    };

    this.searchForBooks = function (filter) {
        $http.get("/api/books/" + that.searchText + "/" + this.filter).then(function (res) {
            that.books = res.data.books;
        });
    };

    this.addBook = function (event) {
        event.preventDefault();
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '../templates/addBook',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl'
        });
    };
}

module.component("bookContainer", {
    templateUrl: "templates/bookContainer.comp",
    controllerAs: "model",
    controller: ["$scope", "$http", "$uibModal", controller]
})
