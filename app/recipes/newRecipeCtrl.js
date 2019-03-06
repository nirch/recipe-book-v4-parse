
app.controller("newRecipeCtrl", function($scope, recipesSrv, $location, $log) {
    
    $scope.createRecipe = function() {
        // call service createRecipe
        recipesSrv.createRecipe($scope.name, $scope.description, $scope.img.src, $scope.ingredients, 
            $scope.steps, $scope.duration).then(function() {
            $location.path("/recipes");
        }, function(err) {
            $log.error(err);
        })
    };

});