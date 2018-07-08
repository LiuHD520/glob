const express=require('express');
const mysql=require('mysql');
const common = require("../../libs/common.js");

var db = mysql.createPool({ host: '116.196.82.28', user: 'root', password: 'root', database: 'learn'});


module.exports=function (){
  var router=express.Router();
  // banners背景图片-数据接口
  router.get('/get_banners_backgroundsrc', (req, res) => {
    db.query('SELECT * FROM mainbackground', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('database error').end();
      } else {
        // 数据库查询成功
        var successbannerssrc = {
          'code': '100',
          'msg': '请求成功',
          'result': {
            'data': data
          }
        }
        res.send(successbannerssrc).end();
      }
    });
  });
// banners-数据接口
  router.get('/get_banners', (req, res)=>{
    db.query('SELECT * FROM banner_table', (err, data)=>{
      if(err){
        console.error(err);
        res.status(500).send('database error').end();
      }else{
        // 数据库查询成功
        var successbanners = {
          'code': '100',
          'msg': '请求成功',
          'result': {
            'data': data
          }
        }
        res.send(successbanners).end();
      }
    });
  });
  // banners-文章详情数据查询
  router.get('/get_banners_content', (req, res) => {
    db.query(`SELECT * FROM banner_table WHERE id=${req.query.id}`, (err, data) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send("database error")
            .end();
        } else {
          // 数据库查询成功
          var successbannerscontent = {
            code: "100",
            msg: "请求成功",
            result: {
              data: data
            }
          };
          res.send(successbannerscontent).end();
        }
      }
    );
  });
// 
  router.get('/get_custom_evaluations', (req, res)=>{
    db.query('SELECT * FROM custom_evaluation_table', (err, data)=>{
      if(err){
        console.error(err);
        res.status(500).send('database error').end();
      }else{
        // 数据库查询成功
        var successData = {
          'code': '100',
          'msg': '请求成功',
          'result': {
            'data': data
          }
        }
        res.send(successData).end();
      }
    });
  });
  // router.use('/login', (req, res) => {
  //   var username = req.body.username;
  //   var password = common.md5(req.body.password + common.MD5_SUFFIX);
  //   console.log(req.body)
  //   db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).send('database error').end();
  //     } else {
  //       if (data.length == 0) {
  //         // 数据库查询成功
  //         var userNo = {
  //           'code': '101',
  //           'msg': '请求成功',
  //           'result': {
  //             'data': '该用户不存在'
  //           }
  //         }
  //         res
  //           .send(userNo)
  //           .status(400)
  //           .end();
  //       } else {
  //         if (data[0].password == password) {
  //           // 数据库查询成功
  //           var successData = {
  //             'code': '100',
  //             'msg': '请求成功',
  //             'result': {
  //               'data': '登录成功'
  //             }
  //           }
  //           res.send(successData).end();
  //         } else {
  //           // 数据库查询成功
  //           var passworderr = {
  //             'code': '101',
  //             'msg': '请求成功',
  //             'result': {
  //               'data': '密码错误'
  //             }
  //           }
  //           res.send(passworderr).status(400).end();
  //         }
  //       }
  //     }
  //   });
  // });
  return router;
};
