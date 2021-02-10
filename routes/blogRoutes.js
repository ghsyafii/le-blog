const express = require('express');
const Blog = require('../models/blog');
//create new express router - which is like a mini app
const router = express.Router();

//blog routes
router.get('/', (req,res) => {
    //.find() finds all stuff in collection
    //.sort() sorts it by some standard, same -1 +1 rule as JS
    Blog.find().sort( { createdAt: -1 })
        .then((result) => {
            //render to this route ie /blogs the index.ejs file and pass the title, and for the blogs, pass the result - refer to index html to see the relationships
            res.render('index', { title: 'All Blogs', blogs: result});
        })
        .catch((error) => {
            console.log(error)
        })
});

//POST request: save new blog entry to database

router.post('/', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            //redirect to homepage that shows all blogs
            res.redirect('/blogs');
        })
        .catch(err => console.log(err))
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

//GET: Post by ID (include : in front of route parameter

router.get('/:id', (req,res) => {
    //get id from req object (the last bit ".id in this case" corresponds to whatever comes after :)
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog : result, title: 'Blog Details' });
        })
        .catch(err => console.log(err))
});

//delete
router.delete('/:id', (req,res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => console.log(err))
})

//export router

module.exports = router;