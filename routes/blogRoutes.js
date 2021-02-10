const express = require('express');
//create new express router - which is like a mini app
const router = express.Router();
//import blog_index
const blogController = require('../controllers/blogController');

//blog routes
router.get('/', blogController.blog_index);

router.post('/', blogController.blog_create_post);

router.get('/create', blogController.blog_create_get);

//GET: Post by ID (include : in front of route parameter

router.get('/:id', blogController.blog_details);

//delete
router.delete('/:id', blogController.blog_delete)

//export router

module.exports = router;