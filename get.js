var http = require('http');
var url = require('url')
var util = require('util');
var querystring = require('querystring');
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    // var params = url.parse(req.url, true).query;

    // res.write('name :' + params.name);
    // res.end();
    //解析url
    var path = url.parse(req.url, true);
    if (path.pathname == '/postTest') {
        res.write('post...');
        //解析post数据
        var postdata = ''; //postdata 变量初始化必须为字符串类型
        req.on('data', function(pd) {
            postdata += pd;
        });
        req.on('end', function() {
            //解析参数
            postdatanew = querystring.parse(postdata);
            console.log(postdatanew);
            res.write('网站名：' + postdatanew.name);
            res.write('<br>');
            res.write('网站url：' + postdatanew.url);
            res.end()
        });
        return;
    }

    var postHTML =
        '<html><head><meta charset="utf-8"><title>hcoder</title></head>' +
        '<body>' +
        '<form method="post" action="/postTest">' +
        '网站名： <input name="name"><br>' +
        '网站 URL： <input name="url"><br>' +
        '<input type="submit">' +
        '</form>' +
        '</body></html>';
    res.write(postHTML);
    res.end();

}).listen(800)