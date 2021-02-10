const Blog = require('../models/blog');

//blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
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
}

module.exports = { blog_index }