const express = require('express');

//express app
const app = express();

//register view engine

app.set('view engine', 'ejs');

//listen for requests

app.listen(3000);

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
    // res.send('<h1>Yoooo</h1>');
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname });
    // res.send('<h1>About</h1>');
});

//redirects

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

//middleware - default if the others do not fire

app.use((req, res) => {
    res.status(404).sendFile('/views/404.html', { root: __dirname })
})