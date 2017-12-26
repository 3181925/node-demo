var express = require('express');
var path = require('path');
var app = express();
var swig = require('swig');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
//定义模板引擎
app.engine('html', swig.renderFile);
//设置模板目录
app.set('views', path.join(__dirname, 'views'));
//设置模板文件后缀
app.set('view engine', 'html');
//是设置模板编译无缓存（开发时关闭，上线打开）
app.set('view cache', false);
//静态文件设置
app.use(express.static(path.join(__dirname, 'statics')));
//关闭swig模板缓存
swig.setDefaults({ cache: false });
//入口页
app.get('/', function(req, res) {
    var data = { title: 'init-sss' }
    res.render('index', data);
})
app.post('/postTest', function(req, res) {
    console.log(req.body);
    res.send('Hello World');
});
var server = app.listen(800, function() {
    console.log('run...')
})