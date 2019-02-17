const express = require('express');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true });
var port = process.env.PORT || 3000;
mongoose.connect('mongodb://sadh:sarthak01@ds237574.mlab.com:37574/stodos', { useNewUrlParser: true });
mongoose.connection.on("error", function(err) {
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
var datetime = new Date();
// var _post = new Posts({
//     "title" : "sarthak",
//     "summary" : "The $http service requests a page on the server, and the response is set as the value of the  variable.",
//     "full_text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     "photo" : "https://picsum.photos/1200/600/?image=1083",
//     "date" : datetime,
//     "__v" : 0
// }) ;
//  _post.save((err)=>{

//     if(err){
//         console.log(err);

//     }
//     else console.log("saved");
//  });

// var _carousel = new Carousel({
//     "title" : "title 3",
//     "full_text" : "blaaa",
//     "photo" : "https://picsum.photos/1200/600/?image-1039"
// });
// _carousel.save((err)=>{

// });

var _pin = new PinPost({
    "title" : "Daily Capsule",
    "summary" : "click below to read our daily tech news!",
    "full_text" : "bla bla",
    "photo" : "https://imagecdn.acast.com/dth/image.jpg?w=800&h=800",
});
_pin.save((err)=>{

});

app.get('/', (req, res, next) => {
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
