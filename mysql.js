var http = require('http');
var mysql = require('mysql');
http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html;  charset=utf-8' });
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '6693166',
        database: 'test'
    });
    connection.connect();
    
    connection.query('SELECT* FROM ZZZ', function(err, rows) {
        if (err) {
            throw err;
        } else {
            console.log(rows);
            response.write('The title is: ' + JSON.stringify(rows));
            response.end();
        }

    });
}).listen(800);