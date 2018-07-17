const express=require('express');
const mysql=require('mysql');
const common = require("../../libs/common.js");
const querystring = require('querystring');

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


// index_nav-数据接口
router.get('/index_nav', (req, res)=>{
  db.query('SELECT * FROM index_nav', (err, data)=>{
    if(err){
      console.error(err);
      res.status(500).send('database error').end();
    }else{
      // 数据库查询成功
      var successmainnav = {
        'code': '100',
        'msg': '请求成功',
        'result': {
          'data': data
        }
      }
      res.send(successmainnav).end();
    }
  });
});

  // index_nav-文章详情数据查询
  router.get('/index_nav_read', (req, res) => {
    db.query(`SELECT * FROM index_nav WHERE id=${req.query.id}`, (err, data) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send("database error")
            .end();
        } else {
          // 数据库查询成功
          var successcontent = {
            code: "100",
            msg: "请求成功",
            result: {
              data: data
            }
          };
          res.send(successcontent).end();
        }
      }
    );
  });

  // index_main_artcle-数据接口
  router.get('/index_main_artcle', (req, res)=>{
    db.query('SELECT * FROM index_main_artcle', (err, data)=>{
      if(err){
        console.error(err);
        res.status(500).send('database error').end();
      }else{
        // 数据库查询成功
        var successmainartcle = {
          'code': '100',
          'msg': '请求成功',
          'result': {
            'data': data
          }
        }
        res.send(successmainartcle).end();
      }
    });
  });

// index_bottom-文章详情数据查询
router.get('/index_bottom_read', (req, res) => {
  db.query(`SELECT * FROM index_bottom WHERE id=${req.query.id}`, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("database error").end();
      } else {
        // 数据库查询成功
        var successcontent = {
          code: "100",
          msg: "请求成功",
          result: {
            data: data
          }
        };
        res.send(successcontent).end();
      }
    }
  );
});
// index_bottom数据接口
router.get('/index_bottom', (req, res)=>{
  db.query('SELECT * FROM index_bottom', (err, data)=>{
    if(err){
      console.error(err);
      res.status(500).send('database error').end();
    }else{
      // 数据库查询成功
      var successbottom = {
        'code': '100',
        'msg': '请求成功',
        'result': {
          'data': data
        }
      }
      res.send(successbottom).end();
    }
  });
});

// index_bottom数据接口--分页select count(*) from test;
router.get('/index_bottom_item', (req, res)=>{
  db.query('SELECT count(*) FROM index_bottom', (err, data)=>{
    if(err){
      console.error(err);
      res.status(500).send('database error').end();
    }else{
      // 数据库查询成功
      var items = data;
      // console.log(items)
      var nth = req.query.item || 1;
      db.query(`select * from index_bottom limit ${(nth-1)*5},5`, (err, data)=>{
        if(err){
          console.error(err);
          res.status(500).send('database error').end();
        }else{
          // 数据库查询成功
          var successitem = {
            'code': '100',
            'msg': '请求成功',
            'result': {
              'data': data,
              'item': items
            }
          }
          res.send(successitem).end();
        }
      });
    }
  });
});

// 查询select * from table1 where field1 like ’%value1%’
// where tel like '137%' 查以137 开头的
// where tel like '%137'查以137 结尾头的
// where tel like '%137%' 只要包含137的都查出来
// 查询user表中姓名中没有“王”字的：
// select * from user where name not like '%王%'
router.post('/indexbottomrefer', (req, res)=>{
  // post传值接受 
  var searchValue = (req.body.searchValue).toString();
  // console.log(searchValue);
  db.query(`SELECT * FROM index_bottom where title like '%${searchValue}%'`, (err, data)=>{
    if(err){
      console.error(err);
      res.status(500).send('database error').end();
    }else{
      // console.log(data);
      // 数据库查询成功
      var successSearch = {
        'code': '100',
        'msg': '请求成功',
        'result': {
          'data': data
        }
      }
      res.send(successSearch).end();
    }
  });
});

  // about_me数据接口
  router.get('/about_me', (req, res)=>{
  db.query('SELECT * FROM about_me', (err, data)=>{
    if(err){
      console.error(err);
      res.status(500).send('database error').end();
    }else{
      // 数据库查询成功
      var successme = {
        'code': '100',
        'msg': '请求成功',
        'result': {
          'data': data
        }
      }
      res.send(successme).end();
    }
  });
});

// 联系提交
router.post('/contactSubmit', (req, res)=>{
  // post传值接受 
  var name = (req.body.name).toString();
  var qq = (req.body.qq).toString();
  var tel = (req.body.tel).toString();
  var email = (req.body.email).toString();
  var wx = (req.body.wx).toString();
  var msg = (req.body.msg).toString();
  db.query(`INSERT INTO contact_me (name, tel, qq, email, wx, msg) VALUE('${name}', '${tel}', '${qq}', '${email}', '${wx}', '${msg}')`, (err, data)=>{
    if(err){
      console.error(err);
      res.status(500).send('database error').end();
    }else{
        // 数据库查询成功
        var successsubit = {
        'code': '100',
        'msg': '请求成功',
        'result': {
          'data': data,
          'reminder': '提交成功'
        }
      }
      res.send(successsubit).end();
    }
  });
})
 // 图片读取数据接口
 router.get('/picSave', (req, res)=>{
  db.query('SELECT * FROM pic_save', (err, data)=>{
    if(err){
      console.error(err);
      res.status(500).send('database error').end();
    }else{
      // 数据库查询成功
      var successpic = {
        'code': '100',
        'msg': '请求成功',
        'result': {
          'data': data
        }
      }
      res.send(successpic).end();
    }
  });
});
  
  return router;
};
