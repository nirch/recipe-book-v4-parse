
app.controller("loginCtrl", function($scope, $location, userSrv) {

    $scope.invalidLogin = false;
    $scope.email = "nirch.work@gmail.com";
    $scope.pwd = "recipeBook123";



    $scope.login = function() {

        userSrv.login($scope.email, $scope.pwd).then(function(activeUser) {
            $location.path("/recipes");
        }, function() {
            $scope.invalidLogin = true;
        });

    }

})