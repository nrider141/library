angular.module('library').controller('bookCopyCtrl', function ($http, $uibModal) {
    this.copyId = "";
    var ctrl = this;
    this.editCopyFlag = false;
    this.editLabel = "Edit";

    this.editCopy = function (copy) {
        this.editCopyFlag = !this.editCopyFlag;
        if (this.editCopyFlag) {
            this.editLabel = "Done";
        } else {
            this.editLabel = "Edit";
        }
        if (!this.editCopyFlag) {
            $http.put("/api/books", { copy: copy });
        }
    };

    this.borrowBook = function (book, copy) {

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '../templates/borrowCopy',
            controller: 'borrowCopyCtrl',
            controllerAs: '$ctrl',
            resolve: {
                book: function () {
                    return book;
                },
                copy: function () {
                    return copy;
                }
            }
        })
    };

    this.searchCopy = function () {
        $http.get('/api/bookcopy/' + this.copyId).then(function (res) {
            ctrl.copies = res.data.copies;
            console.log(ctrl.copies);
        })
    };
})

    .controller('borrowCopyCtrl', function ($scope, $http, $uibModalInstance) {
        this.book = $scope.$resolve.book;
        this.copy = $scope.$resolve.copy;

        this.borrowerId = "";
        this.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        this.bookCopy = function () {
            this.copy.status = "borrowed";

            $http.post("/api/borrowBook", { data1: { id: this.borrowerId, copyId: this.copy.copyId } }).then(function () {
                $uibModalInstance.dismiss('cancel');
            }, function () {
                $uibModalInstance.dismiss('cancel');
            })
        };
    })
