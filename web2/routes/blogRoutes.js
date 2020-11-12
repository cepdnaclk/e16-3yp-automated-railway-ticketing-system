const express = require('express'); //here also have to add express as ue use router here
const blogController = require('../controllers/blogController'); //I used the 'mvc' architecture here therefore the handlers implementatins are in the controller file

const router = express.Router(); //this is the router implementation
/**
 * here we use root notation as in app file it is clearly mentioned that we use /blog for this route
 */
//here all the routing paths are given if the given paths are getting then send to the controller function with the METHOD
router.get('/create', blogController.blog_create_get);
router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/:id', blogController.blog_details); //this is not use here upto now
router.delete('/:id', blogController.blog_delete);

module.exports = router;