var module = angular.module('library');

function controller($scope, $http, $uibModal) {
    var that = this;
    this.searchForBorrowers = function () {
        $http.get("/api/borrowers/" + that.searchText)

            .then(function (res) {
                that.borrowers = res.data.borrowers;
            });
    }

    this.addBorrowers = function () {

        event.preventDefault();
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '../templates/addBorrower',
            controller: 'BorrowersModalCtrl',
            controllerAs: '$ctrl'
        });
    };
}

module.component("borrowerContainer", {
    templateUrl: "templates/borrowers.comp",
    controllerAs: "model",
    controller: ["$scope", "$http", "$uibModal", controller]
})

    .controller("BorrowersModalCtrl", function ($http, $uibModalInstance) {

        var ctrl = this;
        ctrl.borrower = {
            ID: "",
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            address: ""
        }

        ctrl.addBorrower = function () {
            $http.post("/api/borrowers", { data: { ID: ctrl.borrower.ID, name: ctrl.borrower.firstName + " " + ctrl.borrower.lastName, email: ctrl.borrower.email, phone: ctrl.borrower.phone, address: ctrl.borrower.address, borrowedBooks: [] } })

                .then(function () {
                    $uibModalInstance.dismiss('cancel');
                })
        };
        ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    })