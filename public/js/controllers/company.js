var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.phone = {};
        $scope.company = {phones:[]};
        $scope.windowState = 'description';

        $scope.stateDescription = function() {
            return $scope.windowState == 'description'
        }
        $scope.changeToDescription = function() {
            $scope.windowState = 'description'
        }
        $scope.statePhone = function() {
            return $scope.windowState == 'phone'
        }
        $scope.changeToPhone = function() {
            $scope.windowState = 'phone'
        }
        $scope.stateMedia = function() {
            return $scope.windowState == 'perm_media'
        }
        $scope.changeToMedia = function() {
            $scope.windowState = 'perm_media'
        }

        var clearPhone = function() {
            $scope.phone = {};
        }

        $scope.addPhone = function() {
            $scope.company.phones.push($scope.phone);
            clearPhone();
        }

        $scope.removePhone = function(p) {
		$scope.company.phones.splice($scope.company.phones.indexOf(p), 1);
        }
    }
]);