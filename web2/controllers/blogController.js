const Blog = require('../models/blog'); //this is where I defined the documentation architecture for the database
//I discribe one method
//this is called when the user give the request and from client request->app.js->routes/blogRoutes.js->controllers/blogControllers.js
//this is how methods are defined in javascript and give it to a variable
const blog_index = (req, res) => {
    Blog.BlogTrains.find().sort({ createdAt: -1 }) //here find() and sort are inbuilt functions in the mongoose
        .then(result => {
            res.render('index', { blogs: result, title: 'All Train Details' }); //if find then goto the index page
        })
        .catch(err => {
            console.log(err);
        });
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.BlogTrains.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Full Train Details' });
        })
        .catch(err => {
            console.log(err);
            res.render('404', { title: 'Something went wrong' });
        });
}

const blog_create_get = (req, res) => {
    res.render('add_new_client', { title: 'Create a new blog for trains' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            res.redirect('/blogs/create'); //redirecting to index page
        })
        .catch(err => {
            console.log(err);
        });
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' }); //redirecting to index page
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = { //export all the methods for usage in another file
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}