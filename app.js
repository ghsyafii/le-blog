const express = require('express');
const morgan = require('morgan');

//express app
const app = express();

//register view engine

app.set('view engine', 'ejs');

//listen for requests

app.listen(3000);

//middleware to log get requests

// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method', req.method);
//     next();
// });

//morgan middleware

app.use(morgan('tiny'));

app.get('/', (req, res) => {
    const blogs = [
        {title: 'The Land Before Time', snippet: 'This is the deal, Holyfield.'},
        {title: 'The Land Before Space', snippet: 'This is the deal, Tyson.'},
        {title: 'The Land Before Nothing', snippet: 'This is the deal, Douglas.'},
        {title: 'The Land Before Matter', snippet: 'This is the deal, Ziggurat.'},
        {title: 'The Land Before Peanut Butter', snippet: 'This is the deal, Tan.'}
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
})

//middleware 404 - default if the others do not fire

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})