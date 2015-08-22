var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        $scope.phone = {};
        $scope.space = {};
        $scope.company = {
            phones: [],
            spaces: []
        };
        $scope.windowState = 'description';

        $http.get('/userCompany').success(function(data) {
            $scope.company = data
        });

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
        var clearSpace = function() {
            $scope.space = {};
        }
        $scope.addSpace = function() {
            $scope.company.spaces.push($scope.space);
            clearSpace();
        }
        $scope.removeSpace = function(s) {
            $scope.company.spaces.splice($scope.company.spaces.indexOf(s), 1);
        }
        $scope.saveCompany = function() {
            $http.post('/company', $scope.company).success(function(data) {
                console.log('incluído com sucesso ' + data);
                $window.location.href = '/home';
            });
        }
    }
]);