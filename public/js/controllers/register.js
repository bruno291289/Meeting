var myApp = angular.module('myApp', ['validation.match']);
myApp.controller('AppCtrl', ['$scope', '$http', '$window',
    function($scope, $http, $window) {

        $scope.registerUser = function() {
            $http.post('/registeruser', $scope.user).success(function(data) {
                console.log('incluído com sucesso ' + data);
                $window.location.href = '/login';
            });
        }

    }
]);