var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        $scope.phone = {};
        $scope.picture = {};
        $scope.company = {
            phones: [],
            pictures: []
        };
        $scope.windowState = 'description';

        $http.get('/userCompany').success(function(data) {
            $scope.company = data;

            if (!$scope.company) {
                $scope.company = {
                    phones: [],
                    pictures: []
                };
            }
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
        $scope.statePicture = function() {
            return $scope.windowState == 'pictures'
        }
        $scope.changeToPicture = function() {
            $scope.windowState = 'pictures'
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
        $scope.saveCompany = function() {
            $http.post('/company', $scope.company).success(function(data) {
                console.log('incluído com sucesso ' + data);
                $window.location.href = '/home';
            });
        }
    }
]);