
var app = angular.module("recipeBook", ["ngRoute", "ngImageInputWithPreview"]);

app.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "app/home/home.html"
    }).when("/login", {
        templateUrl: "app/login/login.html",
        controller: "loginCtrl"
    }).when("/signup", {

    }).when("/recipes", {
        templateUrl: "app/recipes/recipes.html",
        controller: "recipesCtrl"
    }).when("/recipe/:recipeId", {

    }).when("/new" , {
        templateUrl: "app/recipes/newRecipe.html",
        controller: "newRecipeCtrl"
    }).otherwise({
        redirectTo: "/"
    })
})
