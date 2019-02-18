app.controller('postController', function ($scope,$sce, $routeParams, $http) {
    $scope.data=false;
    $scope.sbmt=true;
    $http.get("/api/singlepost/" + $routeParams.id + "")
        .then(function (response) {
            $scope.post = response.data;
           $scope.decodedHtml=$sce.trustAsHtml(response.data.full_text);
        });

    $http.get("/api/comments/" + $routeParams.id + "")
        .then(function (response) {
            $scope.comments = response.data;
            $scope.data=true;
        });
    //  if($scope.commenttext.length>250)$scope.commenttext = "";
    $scope.postComment = function () {
        $scope.sbmt=false;
        $http({
            url: 'api/postcomment',
            method: "POST",
            data: { 'text': $scope.commenttext, 'post_id': $routeParams.id }
        })
            .then(function (response) {
                if (response.data.msg != "comment posted!") {
                    alert(response.data.msg);
                    $scope.sbmt=true;


                }
                else {
                    $http.get("/api/comments/" + $routeParams.id + "")
                        .then(function (response) {
                            $scope.comments = response.data;
                            $scope.sbmt=true;
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