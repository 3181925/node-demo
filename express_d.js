var express = require('express');
var path = require('path');
var app = express();
var swig = require('swig');
var bodyParser = require('body-parser');
var util = require('util');
//npm install mysql 安装mysql
function getDb() {
    var mysqlHost = 'localhost';
    var mysqlUser = 'root';
    var mysqlPwd = '6693166';
    var mysqlDb = 'test';
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '6693166',
        database: 'test'
    });
    connection.connect();
    return connection;
}
app.use(bodyParser.urlencoded({ extended: false }));
//定义模板引擎
app.engine('html', swig.renderFile);
//设置模板目录
app.set('views', path.join(__dirname, 'views'));
//设置模板文件后缀
app.set('view engine', 'html');
//设置模板编译无缓存(开发时关闭，上线后开启)
app.set('view cache', false);
//静态文件设置
app.use(express.static(path.join(__dirname, 'statics')));
//关闭swig模板缓存
swig.setDefaults({ cache: false });

//删除数据
app.get('/delete', function(req, res) {
    var connection = getDb();
    connection.query(
        'delete from students where st_id = ?;', [req.query.id],
        function(error, results, fields) {
            if (results) {
                res.send('<script>alert("删除成功"); location.href="/";</script>');
            }
        }
    );
});
//入口页（数据列表）
app.get('/', function(req, res) {
    var connection = getDb();
    connection.query(
        'select * from students order by st_id desc;',
        null,
        function(error, results, fields) {
            if (results) {
                res.render('index', { data: results });
            }
        }
    );
});
//增加数据
app.get('/add', function(req, res) {
    res.render('add');
});
app.post('/add', function(req, res) {
    var connection = getDb();

    connection.query(
        'insert into students (`st_name`, `st_age`, `st_gender`) values (?, ?, ?);', [req.body.name, req.body.age, req.body.gender],
        function(error, results, fields) {
            console.log(error)
            if (results) {
                res.send('<script>alert("ok"); location.href="/";</script>');
            }
        }
    );
});
app.get('/test', function(req, res, cb) {
    var db = getDb();
    db.query('select * from students order by st_id desc', null, function(err, result) {
        //console.log(err);
      
         cb(err)
        res.json(result);
    });

});
var server = app.listen(800, function() {
    console.log("run......");
});