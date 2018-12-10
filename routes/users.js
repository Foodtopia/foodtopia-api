var express = require('express');
var router = express.Router();
var mysql = require("mysql");
//session
// var cookieParser = require('cookie-parser');
// var session = require('express-session');
// var app = express(); 
// app.use(cookieParser());
// app.use(session({ secret: "Shh, its a secret!" }));
//session


//建立連線
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'foodtopia',
  password: '',
  database: 'foodtopia',
  // port: 3306
});
// connection.connect();
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


router
  .route("/login")
  .post(function (req, res) {//註冊用
    // 
    function IsEmail(email) {
      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!regex.test(email)) {
        return false;
      } else {
        return true;
      }
    };
    // 
    console.log(req.body.email);
    var email = req.body.email;
    if (!IsEmail(email)) {
      res.send('Email格式不正確!!');
    } else {
      connection.query("select * from members WHERE email=?", email, function (error, rows) {
        if (error) throw error;
        if (rows != '') {
          res.send('此Email信箱已經有人註冊了!!');
        } else {
          res.send('此Email信箱尚未註冊過');
        }
      })
    }
  });
router
  .route("/account")
  .post(function (req, res) {//登入判斷與儲存
    var email = req.body.email;
    var password = req.body.password;
    connection.query("SELECT * FROM `members` WHERE email = ? AND password = ?", [email, password], function (error, rows) {
      if (error) throw error;
      if (rows == "" ) {
        res.send('wrong');
        console.log('wrong');
        console.log(rows);
      } else if (rows[0].account != 1) {
        res.send('inactive');
      } else {
        res.send('ok');
        console.log('ok');
        console.log(rows);
      }
    })
  })
  .get(function (req, res) {//取訂單
    var sid = req.query.sid;
    connection.query("SELECT * FROM `orders` WHERE member_sid = ?", [sid], function (error, rows) {
      if (error) throw error;
      res.send(rows);
    })
  });
router
  .route("/orderDetail")
  .get(function (req, res) {//取訂單詳細資料
    var order_num = req.query.order_num;
    connection.query("SELECT * FROM `orders_details` WHERE order_num = ?", [order_num], function (error, rows) {
      if (error) throw error;
      res.send(rows);
      console.log(rows)
    })
  })



module.exports = router;
