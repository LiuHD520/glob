const express=require('express');
const common=require('../../libs/common');
const mysql = require('mysql');

var db = mysql.createPool({ host: '116.196.82.28', user: 'root', password: 'root', database: 'learn' });

module.exports=function (){
var router=express.Router();
// 登录
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
        res.send(userNo).status(400).end();
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
          res.cookie("username", data[0].username);
          // console.log(req.session["admin_id"]);
          // console.log("签名cookie：", req.signedCookies);
          // console.log("无签名cookie：", req.cookies);
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

// 查询用户信息
router.use('/look_up_userinfo', (req, res) => {
  var username = req.body.username;
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
        res.send(userNo).status(400).end();
      } else {
          // 数据库查询成功
          var userinfo = {
            'code': '100',
            'msg': '请求成功',
            'result': {
              'data': data
            }
          }
          res.send(userinfo).end();
      }
    }
  });
});
// 修改密码
router.post('/amendpass', (req, res) => {
  var oldpassword = common.md5(req.body.oldpassword + common.MD5_SUFFIX);
  var newpassword = common.md5(req.body.newpassword + common.MD5_SUFFIX);
  db.query(`SELECT * FROM admin_table WHERE password='${oldpassword}'`,(err, data) => {
      if (err) {
        console.error(err);
        res.send("database error").status(500).end();
      } else {
        if (data.length == 0) {
          // 数据库查询成功
          var userNo = {
            'code': '101',
            'msg': '请求成功',
            'result': {
              'data': '原始密码错误'
            }
          }
          res.send(userNo).status(400).end();
        } else if (data[0].password == oldpassword) {
              db.query( `UPDATE admin_table SET password='${newpassword}' WHERE ID=${data[0].ID}`,
                (err, data) => {
                  if (err) {
                    console.error(err);
                    res.status(500).send("database error").end();
                  } else {
                    var successmainnav = {
                      code: "100",
                      msg: "请求成功",
                      result: {
                        data: "修改成功"
                      }
                    };
                    res.send(successmainnav).end();
                  }
                }
              );
          } else {
            var oldpassworderr = {
              code: "101",
              msg: "请求成功",
              result: {
                data: "原始密码错误"
              }
            };
            res.send(oldpassworderr).status(400).end();
          }
      }
    }
  );
});


// 修改banners '/'折行
router.post('/bannersEdit', (req, res)=>{
    db.query(`UPDATE banner_table SET \
    title='${req.body.title}',\
    description='${req.body.des}',\
    article='${req.body.art}',\
    src='${req.body.src}' \
    WHERE id=${req.body.id}`,
    (err, data)=>{
      if(err){
        console.error(err);
        res.status(500).send('database error').end();
      }else{
        var successmainnav = {
          'code': '100',
          'msg': '请求成功',
          'result': {
            'data': '修改成功'
          }
        }
        res.send(successmainnav).end();
      }
  });
});

// 新增banner
router.post('/addbanners', (req, res) => {
  // post传值接受
  var title = req.body.title;
  var des = req.body.des;
  var art = (req.body.art).toString();
  var src = req.body.src;
  db.query(
    `INSERT INTO banner_table (title, description, article, src) VALUE('${title}', '${des}', '${art}', '${src}')`,
    (err, data) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send("database error")
          .end();
      } else {
        // 数据库查询成功
        var successsubit = {
          code: "100",
          msg: "请求成功",
          result: {
            data: data,
            reminder: "添加成功"
          }
        };
        res.send(successsubit).end();
      }
    }
  );
});

// 删除一条banner
router.post('/deletebanners', (req, res) => {
  // post传值接受
  db.query(`DELETE FROM banner_table WHERE id=${req.body.id}`,(err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("database error").end();
      } else {
        // 数据库查询成功
        var successdelete = {
          code: "100",
          msg: "请求成功",
          result: {
            data: data,
            reminder: "删除成功"
          }
        };
        res.send(successdelete).end();
      }
    }
  );
});


// 修改banner_table
router.post('/index_bottomEdit', (req, res)=>{
  db.query(`UPDATE index_bottom SET \
  title='${req.body.title}',\
  intro='${req.body.intro}',\
  src='${req.body.src}',\
  href='${req.body.href}' \
  WHERE id=${req.body.id}`,
  (err, data)=>{
    if(err){
      console.error(err);
      res.status(500).send('database error').end();
    }else{
      var successindexbottom = {
        'code': '100',
        'msg': '请求成功',
        'result': {
          'data': '修改成功'
        }
      }
      res.send(successindexbottom).end();
    }
  });
});


// 新增index_bottom
router.post('/addbindex_bottom', (req, res) => {
  // post传值接受
  var id = req.body.id;
  var title = req.body.title;
  var intro = req.body.intro;
  var src = req.body.src;
  var href = req.body.href;
  db.query(`INSERT INTO index_bottom (id,title, intro, src, href) VALUE('${id}','${title}', '${intro}', '${src}', '${href}')`,(err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("database error").end();
      } else {
        // 数据库查询成功
        var successsubit = {
          code: "100",
          msg: "请求成功",
          result: {
            data: data,
            reminder: "添加成功"
          }
        };
        res.send(successsubit).end();
      }
    }
  );
});

// 删除一条banner
router.post('/deleteindex_bottom', (req, res) => {
  // post传值接受
  db.query(`DELETE FROM index_bottom WHERE id=${req.body.id}`,(err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("database error").end();
      } else {
        // 数据库查询成功
        var successdelete = {
          code: "100",
          msg: "请求成功",
          result: {
            data: data,
            reminder: "删除成功"
          }
        };
        res.send(successdelete).end();
      }
    }
  );
});


// 留言--contact_me数据接口--分页select count(*) from test;
router.get('/contact_me_list', (req, res)=>{
  db.query('SELECT count(*) FROM contact_me', (err, data)=>{
    if(err){
      console.error(err);
      res.status(500).send('database error').end();
    }else{
      // 数据库查询成功
      var items = data;
      // console.log(items)
      var nth = req.query.item || 1;
      var list = req.query.list || 5;
      db.query(`select * from contact_me limit ${(nth-1)*list},${list}`, (err, data)=>{
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

// 删除一条contact_me
router.post('/deletecontact_me', (req, res) => {
  // post传值接受
  db.query(`DELETE FROM contact_me WHERE id=${req.body.id}`,(err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("database error").end();
      } else {
        // 数据库查询成功
        var successdelete = {
          code: "100",
          msg: "请求成功",
          result: {
            data: data,
            reminder: "删除成功"
          }
        };
        res.send(successdelete).end();
      }
    }
  );
});


// contact_me数据查询
router.get('/contact_me_read', (req, res) => {
  db.query(`SELECT * FROM contact_me WHERE id=${req.query.id}`, (err, data) => {
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

// 获取用户信息数据查询
router.get('/getuserinfo', (req, res) => {
  db.query(`SELECT * FROM admin_table`, (err, data) => {
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

  //检查登录状态
  // router.use((req, res, next
  //       res.send(successlist).end();
  //     }
  // });)=>{
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
