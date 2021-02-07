const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    // console.log(request.url, request.method);
    response.setHeader('Content-Type', 'text/html');

    // send to other html pages

    let path = './views/'

    // request.url gives you the url that is being requested
    console.log(request.url);

    // if else version
    //
    // if (request.url === '/'){
    //     path += 'index.html'
    // } else if (request.url === 'about.html'){
    //     path += 'about.html'
    // } else {
    //     path += '404.html'
    // }

    // Switch Version
    switch(request.url){
        case '/':
            path += 'index.html'
            response.statusCode = 200;
            break;
        case '/about':
            path += 'about.html'
            response.statusCode = 200;
            break;
        case '/about-us':
            response.statusCode = 301;
            response.setHeader('Location', '/about');
            response.end();
            break;
        default:
            path += '404.html'
            response.statusCode = 404;
            break;
    }

    //send html text
    // response.write('<h1>Hey man! This is super cool!</h1>');
    // response.write('<p>Super dope!</p>');
    // response.end();
    // send an html file

    fs.readFile(path, (err, data) => {
        if (err){
            console.log(err);
            response.end();
        } else {
            // response.write(data);
            response.end(data);
        }
    });

});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
})