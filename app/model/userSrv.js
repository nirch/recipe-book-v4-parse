
app.factory("userSrv", function($http, $q, $log) {

    var activeUser = null;

    function User(plainUser) {
        this.id = plainUser.id;
        this.fname = plainUser.fname;
        this.lname = plainUser.lname;
        this.email = plainUser.email;
    }

    function login(email, pwd) {
        var async = $q.defer();

        $http.get("app/model/data/users.json").then(function(response) {
            var users = response.data;
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === email && users[i].pwd === pwd) {
                    activeUser = new User(users[i]);
                    async.resolve(activeUser);

                }
            }

            if (!activeUser) {
                async.reject("");
            }
        }, function(error) {
            $log.error(error);
            async.reject(error);
        })

        return async.promise;
    }

    function isLoggedIn() {
        return activeUser ? true : false;
    }

    function logout() {
        activeUser = null;
    }

    function getActiveUser() {
        return activeUser;
    }

    return {
        login: login,
        isLoggedIn: isLoggedIn,
        logout: logout,
        getActiveUser: getActiveUser
    }

});