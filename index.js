/*
This code will create a backend server which will direct the client to:-
forms page - by opening localhost:8080 or 127.0.0.1:8080
links page - by opening localhost:8080/forms or 127.0.0.1:8080/forms
tables page - by opening loalhost:8080/tables or 127.0.0.1:8080/tables .
*/
let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer(function(req, res) {
    fs.appendFile('./404.html', '404 Page not Found!', function(err, data) {
        if (err) throw err;
        console.log('Created!');
    });
    let q = url.parse(req.url, true);
    let filename;
    if ( q.pathname === '/') {
        filename = './Forms.html';
    } else {
        filename = '.' + q.pathname + '.html';
    }
    fs.readFile(filename, function(err, data) {
        if (err) {
            fs.readFile('./404.html', function(err, data) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        };
    });
}).listen(8080);