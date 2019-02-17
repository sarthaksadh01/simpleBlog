app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/pages/main.html"
        })
        .when("/post/:id", {

            templateUrl: "/pages/postView.html",
            controller: "postController"
        })
});