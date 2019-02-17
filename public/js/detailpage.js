app.controller('postController', function ($scope, $routeParams, $http) {
    $http.get("/api/singlepost/" + $routeParams.id + "")
        .then(function (response) {
            $scope.post = response.data;
        });

    $http.get("/api/comments/" + $routeParams.id + "")
        .then(function (response) {
            $scope.comments = response.data;
        });
    //  if($scope.commenttext.length>250)$scope.commenttext = "";
    $scope.postComment = function () {
        $http({
            url: 'api/postcomment',
            method: "POST",
            data: { 'text': $scope.commenttext, 'post_id': $routeParams.id }
        })
            .then(function (response) {
                if (response.data.msg != "comment posted!") {
                    alert(response.data.msg);


                }
                else {
                    $http.get("/api/comments/" + $routeParams.id + "")
                        .then(function (response) {
                            $scope.comments = response.data;
                        });
                    $scope.commenttext = "";
                }

                // success
                // alert(response.data.msg);
            },
                function (response) { // optional
                    // failed
                    //  alert(response.data.msgs);
                });

    };

    



});