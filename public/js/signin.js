app.controller('GoogleCtrl', ($http) => {
    function onSignIn(googleUser) {

        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        $http({
            url: 'api/signin',
            method: "POST",
            data: { 'name': profile.getName(), 'email': profile.getEmail(), photo: profile.getImageUrl() }
        })
            .then(function (response) {
                // success
               // alert(response.data.msg);
            },
                function (response) { // optional
                    // failed
                    //alert(response.data.msgs);
                });



    }
    window.onSignIn = onSignIn;

});