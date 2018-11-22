var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'foodtopia' //資料庫名稱
});

connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
});

router
  .route("/upload_date") //資料表名稱
  .get(function(req, res) {
    connection.query("SELECT * FROM upload_date ORDER BY `id` DESC LIMIT 6", function(error, results) {
      if (error) throw error;
      res.json(results);
    });
  });

  router
  .route("/menu/:upload_time_sid")
  .get(function(req, res) {
    connection.query("select * from menu where upload_time_sid=?", req.params.upload_time_sid,function(error,row){
      if(error) throw error;
      res.json(row);
    });
  }) 
  

module.exports = router;