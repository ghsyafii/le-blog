const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//connect to MongoDB

const dbURI = 'mongodb+srv://syafii:flea311@cluster0.pqurf.mongodb.net/myblog?retryWrites=true&w=majority'

//below is an async operation, so it returns a promise that you can use .then and .catch with

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000);
        console.log('connected to db')
    })
    .catch((err) => console.log(err));

//register view engine

app.set('view engine', 'ejs');

//listen for requests (commented out and added to promise above, so it's connected only if the database is connected.

app.listen(process.env.PORT || 4000);

//middleware and static files

//express.static('public') - this is middleware that lets all static files placed in the directory 'public' to be accessible

app.use(express.static('public'));

//middleware to log get requests

// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method', req.method);
//     next();
// });

//morgan middleware

app.use(morgan('dev'))

//middleware to convert posts to right format

app.use(express.urlencoded({ extended: true }));

//mongoose and mongo sandbox routes

//use model to create new instance of a blog document

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 3',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });
//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((error) => console.log(error))
// });

//get all blogs

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => console.log(err))
// });
//
// //find single blog
//
// app.get('/single-blog', (req, res) => {
//     Blog.findById('60214b182151a28663e92cf8')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => console.log(err));
// });

//routes

app.get('/', (req, res) => {
    // this could be a totally unique homepage but now it just redirects
   res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//blog routes - link to blogRoutes.js, first argument isn't compulsory but it says it only applies to routes with /blogs. make sure to remove /blogs for the linked routes
app.use('/blogs', blogRoutes);

//middleware 404 - default if the others do not fire

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})

//dummy data for homepage or blogs to load:
// const blogs = [
//         {title: 'The Land Before Time', snippet: 'This is the deal, Holyfield.'},
//         {title: 'The Land Before Space', snippet: 'This is the deal, Tyson.'},
//         {title: 'The Land Before Nothing', snippet: 'This is the deal, Douglas.'},
//         {title: 'The Land Before Matter', snippet: 'This is the deal, Ziggurat.'},
//         {title: 'The Land Before Peanut Butter', snippet: 'This is the deal, Tan.'}
//     ];
//     res.render('index', { title: 'Home', blogs });