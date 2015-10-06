var myApp = angular.module('myApp', ['ngFileUpload']);
myApp.controller('AppCtrl', ['$scope', '$http', 'Upload', '$timeout',
    function($scope, $http, Upload, $timeout) {
        $scope.currentFile = {}


        $scope.company = {
            phones: [],
            spaces: [],
            pictures: []
        };

        reloadCompany = function() {
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
        };

        reloadCompany();

        $scope.$watch('files', function() {
            $scope.upload($scope.files);
        });
        $scope.$watch('file', function() {
            if ($scope.file != null) {
                $scope.files = [$scope.file];
            }
        });
        $scope.log = '';

        updateProgress = function(fileName, progress) {
            if ($scope.files && $scope.files.length > 0) {
                for (var i = 0; i < $scope.files.length; i++) {
                    var file = $scope.files[i];
                    if (file.name == fileName) {
                        file.progress = progress;
                        return;
                    }
                }
            }
        }

        isFileInProgress = function() {
            if ($scope.files && $scope.files.length > 0) {
                for (var i = 0; i < $scope.files.length; i++) {
                    var file = $scope.files[i];
                    if (file.progress && file.progress < 100) {
                        return true;
                    }
                }
            }

            return false;
        }

        $scope.uploading = function() {
            return $scope.files && $scope.files.length >= 0 && isFileInProgress();
        }

        companyId = function() {
            if ($scope.company) {
                return $scope.company._id.toString();
            }

            return 'SEM EMPRESA';
        }

        $scope.upload = function(files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    file.progress = 0;
                    if (!file.$error) {
                        $scope.username = 'USUARIO';
                        Upload.upload({
                            //url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                            url: '/company/photo',
                            data: {
                                company_id: companyId(),
                                file: file
                            }
                        }).progress(function(evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            updateProgress(evt.config.data.file.name, progressPercentage)
                            $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.data.file.name + '\n' + $scope.log;
                        }).success(function(data, status, headers, config) {
                            $timeout(function() {
                                $scope.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;


                                if (!$scope.uploading()) {
                                    $scope.files = {};
                                    reloadCompany();
                                }
                            });
                        });
                    }
                }
            }
        };

        $scope.selectImage = function(file) {
            $scope.currentFile = file;
        };

        $scope.imageSelected = function(){
            return $scope.currentFile && $scope.currentFile.src && $scope.currentFile.src.length > 0;
        }

        $scope.removeImage = function() {
            if ($scope.currentFile && $scope.company) {
                $http.post('/company/photo/remove/'+$scope.company._id+'/'+$scope.currentFile._id).success(function(data) {
                    $scope.company = data;

                    if (!$scope.company) {
                        $scope.company = {
                            phones: [],
                            spaces: [],
                            pictures: []
                        };
                    }
                });
            }
        };
    }
]);