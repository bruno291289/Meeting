var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        $scope.spaceIndex = null;
        $scope.phone = {};
        $scope.space = {};
        $scope.picture = {};
        $scope.company = {
            phones: [],
            spaces: [],
            pictures: []
        };
        $scope.windowState = 'description';

        $http.get('/userCompany').success(function(data) {
            $scope.company = data;

            if (!$scope.company) {
                $scope.company = {
                    phones: [],
                    spaces: [],
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
        $scope.stateMedia = function() {
            return $scope.windowState == 'perm_media'
        }
        $scope.changeToMedia = function() {
            $scope.windowState = 'perm_media'
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
        $scope.clearSpace = function() {
            $scope.space = {};
            $scope.spaceIndex = null;
        }
        $scope.addSpace = function() {
            $scope.company.spaces.push($scope.space);
            $scope.clearSpace();
        }
        $scope.removeSpace = function(s) {
            $scope.company.spaces.splice($scope.company.spaces.indexOf(s), 1);
        }
        $scope.viewSpace = function(s){
            $scope.spaceIndex = $scope.company.spaces.indexOf(s);
            $scope.space = s;
        }
        $scope.saveCompany = function() {
            $http.post('/company', $scope.company).success(function(data) {
                console.log('incluído com sucesso ' + data);
                $window.location.href = '/home';
            });
        }
    }
]);