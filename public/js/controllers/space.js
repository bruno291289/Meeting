var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.spaces = {};
        $scope.company = {};
        $scope.space = {
            company: $scope.company
        };

        reloadSpaces = function() {
            $http.get('/userCompany').success(function(data) {
                $scope.company = data;

                if (!$scope.company) {
                    $scope.company = {};
                } else {
                    $http.get('/space/' + $scope.company._id).success(function(data) {
                        if (data) {
                            $scope.spaces = data;
                        } else {
                            $scope.spaces = {};
                        }
                    });
                }
            });
        };

        reloadSpaces();

        $scope.newSpace = function() {
            $scope.space = {
                company: $scope.company
            };
        };

        $scope.save = function(){
            $http.post('/space', $scope.space).success(function(){
                reloadSpaces();
            });
        };
    }
]);