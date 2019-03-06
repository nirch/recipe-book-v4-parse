
app.factory("recipesSrv", function($http, $q, $log, userSrv) {

    // In this object we will save an array of recipes per user id
    // If a user id doesn't have an entry in this object it means that
    // the data for this user was never loaded
    var recipes = {};

    function Recipe(plainRecipe) {
        this.id = plainRecipe.id;
        this.name = plainRecipe.name;
        this.description = plainRecipe.description;
        this.imgUrl = plainRecipe.imgUrl;
        this.ingredients = plainRecipe.ingredients;
        this.steps = plainRecipe.steps;
        this.duration = plainRecipe.duration;
        this.userId = plainRecipe.userId;
    }

    function getActiveUserRecipes() {
        var async = $q.defer();
        var activeUserId = userSrv.getActiveUser().id;

        // Loading the recipes from JSON only in first time, for the rest of calls returning the array
        if (recipes[activeUserId]) {
            async.resolve(recipes[activeUserId]);
        } else {
            recipes[activeUserId] = [];
            // getting all recipes from JSON and then pushing to the array only those that 
            // were created by the active user
            $http.get("app/model/data/recipes.json").then(function(res) {
                var jsonRecipes = res.data;
                for(var i = 0; i < jsonRecipes.length; i++) {
                    if (jsonRecipes[i].userId === activeUserId) {
                        recipes[activeUserId].push(new Recipe(jsonRecipes[i]));
                    }
                }
                async.resolve(recipes[activeUserId]);
            }, function(err) {
                async.reject(err);
            });
        }

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