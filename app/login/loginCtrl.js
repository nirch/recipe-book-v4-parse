
app.controller("loginCtrl", function($scope, $location, userSrv) {

    $scope.invalidLogin = false;
    $scope.email = "nir@nir.com";
    $scope.pwd = "123";



    $scope.login = function() {

        userSrv.login($scope.email, $scope.pwd).then(function(activeUser) {
            $location.path("/recipes");
        }, function() {
            $scope.invalidLogin = true;
        });

    }

})