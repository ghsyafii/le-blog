const Blog = require('../models/blog');

//blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    //.find() finds all stuff in collection
    //.sort() sorts it by some standard, same -1 +1 rule as JS
    Blog.find().sort( { createdAt: -1 })
        .then((result) => {
            //render to this route ie /blogs the index.ejs file and pass the title, and for the blogs, pass the result - refer to index html to see the relationships
            res.render('blogs/index', { title: 'All Blogs', blogs: result});
        })
        .catch((error) => {
            console.log(error)
        })
}

const blog_details = (req,res) => {
    //get id from req object (the last bit ".id in this case" corresponds to whatever comes after :)
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('blogs/details', { blog : result, title: 'Blog Details' });
        })
        .catch(err => {
            res.status(404).render('404', { title: 'Blog not found' })
            })
}

const blog_create_get = (req,res) => {
    res.render('blogs/create', { title: 'Create' });
}

const blog_create_post = (req,res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            //redirect to homepage that shows all blogs
            res.redirect('/blogs');
        })
        .catch(err => console.log(err))
}

const blog_delete = (req,res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => console.log(err))
}

//export above function so you have access to anywhere you import it
module.exports = { blog_index, blog_details, blog_create_get, blog_create_post, blog_delete }