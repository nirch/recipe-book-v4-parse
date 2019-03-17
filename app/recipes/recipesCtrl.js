
app.controller("recipesCtrl", function($scope, userSrv, $location, recipesSrv, $log, $interval) {

    if (!userSrv.isLoggedIn()) {
        $location.path("/");
        return;
    }

    $scope.activeUser = userSrv.getActiveUser();


    recipesSrv.getActiveUserRecipes().then(function(recipes) {
        $scope.recipes = recipes;
    }, function(err) {
        $log.error(err);
    });


    $scope.animateIndex = 0;
    var animationInterval = $interval(function() {
        ++$scope.animateIndex;
        console.log($scope.animateIndex);
        if ($scope.animateIndex > $scope.recipes.length) {
            $interval.cancel(animationInterval);
        }
    }, 3000);

});