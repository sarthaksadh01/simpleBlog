app.controller('myCtrl', function ($scope, $http) {
    $http.get("/api/blogs")
        .then(function (response) {

            $scope.myWelcome = response.data;
            $scope.sadh = "haha";
            //console.log(response.data);
        });
    $http.get("/api/daily")
        .then(function (response) {

            $scope.daily = response.data;
            //console.log($scope.daily[0]._id);

        });

    $http.get("/api/carousel")
        .then(function (response) {

            $scope.carousel = response.data;
            //console.log($scope.daily[0].summary);

        });


});