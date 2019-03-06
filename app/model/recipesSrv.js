
app.factory("recipesSrv", function($http, $q, $log, userSrv) {

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


    function createRecipe(name, description, img, ingredients, steps, duration) {
        var async = $q.defer();

        const RecipeParse = Parse.Object.extend('Recipe');
        const newRecipe = new RecipeParse();
        
        newRecipe.set('name', name);
        newRecipe.set('description',description);
        newRecipe.set('image', new Parse.File(name+".jpg", { base64: img }));
        newRecipe.set('ingredients', ingredients);
        newRecipe.set('steps', steps);
        newRecipe.set('duration', duration);
        newRecipe.set('userId', Parse.User.current());
        
        newRecipe.save().then(
          function(result) {
            $log.info('Recipe created', result);
            var newRecipe = new Recipe(result);
            async.resolve(newRecipe);
          },
          function(error) {
            $log.error('Error while creating Recipe: ', error);
            async.reject(error);
          }
        );        

        return async.promise;
    }

    return {
        getActiveUserRecipes: getActiveUserRecipes,
        createRecipe: createRecipe
    }

})