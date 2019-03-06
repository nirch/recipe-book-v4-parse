
app.controller("recipesCtrl", function($scope, userSrv, $location, recipesSrv, $log) {

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

});