
app.factory("recipesSrv", function($http, $q, $log, userSrv) {

    // In this object we will save an array of recipes per user id
    // If a user id doesn't have an entry in this object it means that
    // the data for this user was never loaded
    var recipes = {};

    function Recipe(parseRecipe) {
        this.id = parseRecipe.get("id");
        this.name = parseRecipe.get("name");
        this.description = parseRecipe.get("description");
        this.imgUrl = parseRecipe.get("image").url();
        this.ingredients = parseRecipe.get("ingredients");
        this.steps = parseRecipe.get("steps");
        this.duration = parseRecipe.get("duration");
        this.userId = parseRecipe.get("userId");
    }

    function getActiveUserRecipes() {
        var async = $q.defer();
        var activeUserId = userSrv.getActiveUser().id;

        var recipes = [];

        const RecipeParse = Parse.Object.extend('Recipe');
        const query = new Parse.Query(RecipeParse);
        query.equalTo("userId",  Parse.User.current());
        query.find().then(function(results) {

          for (var i = 0; i < results.length; i++) {
            recipes.push(new Recipe(results[i]));
          }

          async.resolve(recipes);

        }, function(error) {
            $log.error('Error while fetching Recipe', error);
            async.reject(error);
        });

        return async.promise;
    }


    function createRecipe(name, description, imgUrl, ingredients, steps, duration) {
        var async = $q.defer();
        
        var activeUserId = userSrv.getActiveUser().id;
        var newRecipeId = "3dddd";  // the id should be unique
        var newRecipeObject = {
            id: newRecipeId,
            name: name, 
            description: description,
            imgUrl: imgUrl,
            ingredients: ingredients,
            steps: steps,
            duration: duration,
            userId: activeUserId
        }
        var newRecipe = new Recipe(newRecipeObject);
        recipes[activeUserId].push(newRecipe);
        async.resolve(newRecipe, recipes[activeUserId]);

        return async.promise;
    }

    return {
        getActiveUserRecipes: getActiveUserRecipes,
        createRecipe: createRecipe
    }

})