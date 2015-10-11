var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.companies = {};

        reloadCompany = function() {
            $http.get('/company/list').success(function(data) {
                $scope.companies = data;

                if (!$scope.companies) {
                    $scope.companies = {};
                }
            });
        };

        reloadCompany();
    }
]);