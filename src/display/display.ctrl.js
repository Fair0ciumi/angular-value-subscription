(function(angular) {
    'use strict';

    angular
        .module('app.display')
        .controller('DisplayCtrl', DisplayCtrl);

    DisplayCtrl.$inject = ['$scope', 'RandomNumberService'];

    function DisplayCtrl($scope, RandomNumberService) {
        // Set $scope.randomNumber to the function getRandomNumber, not its return value!
        $scope.randomNumber = RandomNumberService.getRandomNumber;
    }
}(angular));
