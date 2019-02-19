const express = require('express');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const path = require('path');

// mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true });
var port = process.env.PORT || 3000;
mongoose.connect('mongodb://sadh:sarthak01@ds237574.mlab.com:37574/stodos', { useNewUrlParser: true });
mongoose.connection.on("error", function (err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
});




app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }))
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




var Users = require('./models/users');
var Posts = require('./models/post');
var PinPost = require('./models/pinpost');
var Carousel = require('./models/carousel');
var Comments = require('./models/comments');


app.get('/', (req, res, next) => {
    res.send("admin.html");
});

app.get('/admin', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/admin.html'));
});


app.get('/api', (req, res, next) => {
    res.send("index.html");
});

app.get('/api/blogs', (req, res, next) => {
    Posts.find({}, (err, posts) => {
        res.send(posts);

    });
});

app.get('/api/daily', (req, res, next) => {
    PinPost.find({}, (err, pinPost) => {
        res.send(pinPost);

    });
});

app.get('/api/carousel', (req, res, next) => {
    Carousel.find({}, (err, carousel) => {
        res.send(carousel);

    });
});

app.get('/api/singlepost/:id', function (req, res) {
    var id = req.params.id;
    // console.log(id);
    Posts.findOne({ _id: id }, (err, post) => {
        res.send(post);
        // console.log(post);


    });
});

app.get('/api/comments/:post_id', function (req, res) {
    var id = req.params.post_id;
    Comments.find({ post_id: id }, (err, comments) => {
        res.send(comments);
        //  console.log(comments);


    });
});
app.post('/api/savepost/', function (req, res) {
    if (req.body.password == "SArthak01@") {


        var datetime = new Date();
        var _post = new Posts({
            "title": req.body.title,
            "summary": req.body.summary,
            "full_text": req.body.full_text,
            "photo": req.body.photo,
            "date": datetime,
        });
        _post.save((err) => {

            if (err) {
                res.send(`error: ${err}`);
            }
            else {
                res.send(`post ${req.body.title} saved`);
            }

        });
    }
    else{
        res.send('error: incorrect password!');
    }
});
app.post('/api/signin', function (req, res) {
    //console.log(req.session.email);

    if (req.session.email) {
        res.json({ msg: "already logged in!" });

    }
    else {
        Users.find({ email: req.body.email }, (err, user) => {

            if (user.length) {
                // console.log("user already exists!");
                req.session.email = req.body.email;
                req.session.save()
                res.json({ msg: req.session.email });

                //console.log(req.session.email);

            }
            else {

                let _user = new Users({
                    name: req.body.name,

                    email: req.body.email,
                    photo: req.body.photo
                });
                //console.log(req.body.name);
                _user.save((err, newUser) => {
                    if (err) {
                        res.json({ msg: "Error occured! " + err });
                    }
                    else {
                        req.session.email = req.body.email;
                        req.session.save()
                        res.json({ msg: req.session.email });
                    }

                });

            }
            // console.log(sess.email);



        });
    }





});

app.post('/api/postcomment', function (req, res) {


    if (req.session.email) {
        // console.log(`loged in user is ${req.session.email}`);
        var datetime = new Date();
        Users.findOne({ email: req.session.email }, (err, user) => {

            let _comment = new Comments({
                text: req.body.text,
                user_name: user.name,
                user_photo: user.photo,
                date: datetime,
                post_id: req.body.post_id
            });
            _comment.save((err) => {

                if (err) {
                    res.json({ msg: err });

                }
                else {
                    res.json({ msg: "comment posted!" });
                }

            });





        });

    }
    else {
        res.json({ msg: "please log in first!" });

    }

});


//console.log('app running on port 3000');
app.listen(port);
