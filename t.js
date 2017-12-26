//使用 require函数获取 http模块

var http = require('http');

// 使用url模块获取浏览器地址信息
var url = require('url');

//文件内容读取

var fs = require('fs');

//调用 演示
// var common = require('./common.js')

// common.sayHi()
// common.sayHello()
//或者
// common['sayHi']();
// common['sayHello']();

// var person = require('./person.js');

// var zhangsan = new person('张三');
// zhangsan.say();

//调用继承
// var teacher = require('./teacher.js');
// var lisi = new teacher('李四')
// lisi.say();
// lisi.teacher()
http.createServer(function(req, res) {
    //不处理 favicon.ico
    // if (req.url == "/favicon.ico") { return; }
    //发送http头部
    //http状态值：200：ok;
    //内容类型：text/html,解决中文乱码
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    // //设置编码类型
    // res.write('<head><meta charset="utf-8"/></head>');
    // //发送相应数据
    // myfunc()
    // 异步读取
    fs.readFile('input.txt', function(err, data) {
            if (err) {
                return console.log(err)
            }
            console.log('异步读取：' + data.toString())
        })
        //创建文件
        // fs.open('test.txt', 'w+', function(err, fd) {
        //         if (err) {
        //             res.write('创建文件失败:' + err)
        //             res.end()
        //             return false
        //         }
        //         res.write('文件创建成功');
        //         res.end()
        //     })

    // 创建目录
    // fs.mkdir('/工作软件/lst', function(err) {
    //         if (err) {
    //             return console.log(err)
    //         }
    //         console.log('目录创建成功')
    //     })
    //    //向文件写入内容
    //    fs.writeFile('input.txt','花痴',function(){
    //        console.log('ok');
    //        console.log('写入完毕')
    //    }) 
    // 同步读取
    // var data = fs.readFileSync('input.txt');
    // console.log('同步读取:' + data.toString());
    // console.log('程序执行完毕')

    var pathname = url.parse(req.url).pathname;
    res.write(pathname)

    switch (pathname) {
        case '/facicon.ico':
            break;
        case '/news':

            res.write('新闻');

            break;
        case '/login':
            res.write('登录');
            break;
    }

    // res.write("中文");
    res.end();
}).listen('8891');

//本页面函数调用
function myfunc() {
    console.log('myfunc')
}
//函数动态调用
function say(word) {
    console.log('word')
}

function execute(someFunction, value) {
    someFunction(value)
}

// console.log('Server running at http://127.0.0.1:8891/')
//     //_filename 当前执行的脚本的文件名
// console.log(__filename)
//     //_dirname 当前执行脚本所在的目录
// console.log(__dirname)