const express=require('express');
const common=require('../../libs/common');
const mysql = require('mysql');

var db = mysql.createPool({ host: '116.196.82.28', user: 'root', password: 'root', database: 'learn' });

module.exports=function (){
  var router=express.Router();

   //检查登录状态
  // router.use((req, res, next)=>{
  //   if (!req.session["admin_id"] && req.url != "/admin/login.html") {
  //     //没有登录
  //     // res.render("admin/login.html", {});
  //   } else {
  //     next();
  //   }
  // });

  
  router.use('/login', (req, res) => {
    var username = req.body.username;
    var password = common.md5(req.body.password + common.MD5_SUFFIX);
    console.log(req.body)
    db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data) => {
      if (err) {
        console.error(err);
        res.send('database error').status(500).end();
      } else {
        if (data.length == 0) {
          // 数据库查询成功
          var userNo = {
            'code': '101',
            'msg': '请求成功',
            'result': {
              'data': '该用户不存在'
            }
          }
          res
            .send(userNo)
            .status(400)
            .end();
        } else {
          if (data[0].password == password) {
            // 数据库查询成功
            var successData = {
              'code': '100',
              'msg': '请求成功',
              'result': {
                'data': '登录成功'
              }
            }
            //成功
            req.session['admin_id'] = data[0].ID;
            req.secret = "wesdfw4r34tf";
            res.cookie("user", data[0].username, { signed: true });

            console.log(req.session["admin_id"]);
            console.log("签名cookie：", req.signedCookies);
            console.log("无签名cookie：", req.cookies);
            res.send(successData).end();
          } else {
            // 数据库查询成功
            var passworderr = {
              'code': '101',
              'msg': '请求成功',
              'result': {
                'data': '密码错误'
              }
            }
            res.send(passworderr).status(400).end();
          }
        }
      }
    });
  });
  //检查登录状态
  // router.use((req, res, next)=>{
  //   if(!req.session['admin_id'] && req.url!='/login'){ //没有登录
  //     res.redirect('/admin/login');
  //   }else{
  //     next();
  //   }
  // });

  // router.get('/', (req, res)=>{
  //   res.render('admin/index.ejs', {});
  // });

  // router.use('/login', require('./login')());
  // router.use('/banners', require('./banners')());
  // router.use('/custom', require('./custom')());

  return router;
};
