var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http',
    function($scope, $http) {

    	   $scope.user = {email: '123@123', password:'123'};

        $scope.login = function() {
            $http.post('/login', $scope.user).success(function(){console.log('sucess');});
        }
    }
]);