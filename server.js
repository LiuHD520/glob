const express=require('express');
const static=require('express-static');
const bodyParser=require('body-parser');
const multer=require('multer');
var path = require('path');
const mysql=require('mysql');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const consolidate=require('consolidate');
const expressRoute=require('express-route');
const pathLib = require('path');
const fs = require('fs');


var db = mysql.createPool({ host: '116.196.82.28', user: 'root', password: 'root', database: 'learn'});

var server=express();
server.listen(8080,()=>{
  console.log('server listening on port 8080')
});

// 上传文件
var objMulter = multer({dest: './static/upload/'}).any();

//设置跨域访问
server.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
//1.获取请求数据
//get自带
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));


//2.cookie、session
//cookie
server.use(cookieParser('wesdfw4r34tf'));
// session
(function (){
  var keys=[];
  for(var i=0;i<100000;i++){
    keys[i]='a_'+Math.random();
  }
  server.use(cookieSession({
      name: "admin_id",
      keys: keys,
      maxAge: 20 * 60 * 1000 //20min
    }));
})();

//3.模板
server.set('view engine', 'html');
server.set('views', 'template');
server.engine('html', consolidate.ejs);

//4.route
server.use('/', require('./route/web')());
server.use('/admin/', require('./route/admin')());

server.use(objMulter);

server.post('/uploadFile', function(req, res){
    var str = req.files[0].path + (pathLib.parse(req.files[0].originalname)).ext;
    var pic = '/upload/' + req.files[0].filename + (pathLib.parse(req.files[0].originalname)).ext;
    var picname = req.files[0].filename + (pathLib.parse(req.files[0].originalname)).ext;
    fs.rename(req.files[0].path, str, function(err){
        if (err) {
            console.log(err);
        } else {
            var successpic = {
                'code': '100',
                'msg': '请求成功',
                'result': {
                  'data': pic
                }
              }
            db.query(`INSERT INTO pic_save (pic_src, pic_name) VALUE('${pic}', '${picname}')`, (err, data)=>{
                if(err){
                    console.error(err);
                    res.status(500).send('database error').end();
                }else{
                //    console.data(data);
                    res.send(successpic).end();
                }
            });
        }
    })
})


//5.default：static
server.use(static('./static/'));
