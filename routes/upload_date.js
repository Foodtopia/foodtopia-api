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
  .route("/menu")
  .get(function(req, res) {
    connection.query("Select * from menu", function(error, rows) {
      if (error) throw error;
      res.json(rows);
    });
  });

  router
  .route("/menu/:page")
  .get(function (req, res) {
    //先統計總共幾筆資料
    var query = "SELECT count(*) as TotalCount FROM `menu` WHERE `upload_time_sid`='12'"; //用SQL找總共多少筆
    var totalCount = 0;
    connection.query(query, function (error, row) {
      if (error) throw error;
      totalCount = row[0].TotalCount;

      //讀出分頁資料
      var LimitNum = 6;   //一次讀取6筆資料
      var startNum = 0;    //從第幾筆開始讀
      if (req.params.page) {                //?
        page = parseInt(req.params.page); //parseInt化
        startNum = (page - 1) * LimitNum; //依據頁數讀取第一筆的項目id
      }
      var query = "select * from menu ORDER BY `id` DESC limit ? OFFSET ?"; //每頁項目範圍
      var params = [LimitNum, startNum];
      query = mysql.format(query, params); //format -> 將query取得的項目轉化成params格式
      connection.query(query, function (error, row) {
        if (error) throw error;
        res.json({ "TotalCount": totalCount, "datas": row });
      });
    });
  })

  router
  .route("/menu/:page")
  .get(function (req, res) {
    //先統計總共幾筆資料
    var query = "SELECT count(*) as TotalCount FROM `menu` WHERE `upload_time_sid`='11'"; //用SQL找總共多少筆
    var totalCount = 0;
    connection.query(query, function (error, row) {
      if (error) throw error;
      totalCount = row[0].TotalCount;

      //讀出分頁資料
      var LimitNum = 6;   //一次讀取6筆資料
      var startNum = 0;    //從第幾筆開始讀
      if (req.params.page) {                //?
        page = parseInt(req.params.page); //parseInt化
        startNum = (page - 1) * LimitNum; //依據頁數讀取第一筆的項目id
      }
      var query = "select * from menu ORDER BY `id` DESC limit ? OFFSET ?"; //每頁項目範圍
      var params = [LimitNum, startNum];
      query = mysql.format(query, params); //format -> 將query取得的項目轉化成params格式
      connection.query(query, function (error, row) {
        if (error) throw error;
        res.json({ "TotalCount": totalCount, "datas": row });
      });
    });
  })

  router
  .route("/menu/:page")
  .get(function (req, res) {
    //先統計總共幾筆資料
    var query = "SELECT count(*) as TotalCount FROM `menu` WHERE `upload_time_sid`='10'"; //用SQL找總共多少筆
    var totalCount = 0;
    connection.query(query, function (error, row) {
      if (error) throw error;
      totalCount = row[0].TotalCount;

      //讀出分頁資料
      var LimitNum = 6;   //一次讀取6筆資料
      var startNum = 0;    //從第幾筆開始讀
      if (req.params.page) {                //?
        page = parseInt(req.params.page); //parseInt化
        startNum = (page - 1) * LimitNum; //依據頁數讀取第一筆的項目id
      }
      var query = "select * from menu ORDER BY `id` DESC limit ? OFFSET ?"; //每頁項目範圍
      var params = [LimitNum, startNum];
      query = mysql.format(query, params); //format -> 將query取得的項目轉化成params格式
      connection.query(query, function (error, row) {
        if (error) throw error;
        res.json({ "TotalCount": totalCount, "datas": row });
      });
    });
  })

  router
  .route("/menu/:page")
  .get(function (req, res) {
    //先統計總共幾筆資料
    var query = "SELECT count(*) as TotalCount FROM `menu` WHERE `upload_time_sid`='9'"; //用SQL找總共多少筆
    var totalCount = 0;
    connection.query(query, function (error, row) {
      if (error) throw error;
      totalCount = row[0].TotalCount;

      //讀出分頁資料
      var LimitNum = 6;   //一次讀取6筆資料
      var startNum = 0;    //從第幾筆開始讀
      if (req.params.page) {                //?
        page = parseInt(req.params.page); //parseInt化
        startNum = (page - 1) * LimitNum; //依據頁數讀取第一筆的項目id
      }
      var query = "select * from menu ORDER BY `id` DESC limit ? OFFSET ?"; //每頁項目範圍
      var params = [LimitNum, startNum];
      query = mysql.format(query, params); //format -> 將query取得的項目轉化成params格式
      connection.query(query, function (error, row) {
        if (error) throw error;
        res.json({ "TotalCount": totalCount, "datas": row });
      });
    });
  })

  router
  .route("/menu/:page")
  .get(function (req, res) {
    //先統計總共幾筆資料
    var query = "SELECT count(*) as TotalCount FROM `menu` WHERE `upload_time_sid`='8'"; //用SQL找總共多少筆
    var totalCount = 0;
    connection.query(query, function (error, row) {
      if (error) throw error;
      totalCount = row[0].TotalCount;

      //讀出分頁資料
      var LimitNum = 6;   //一次讀取6筆資料
      var startNum = 0;    //從第幾筆開始讀
      if (req.params.page) {                //?
        page = parseInt(req.params.page); //parseInt化
        startNum = (page - 1) * LimitNum; //依據頁數讀取第一筆的項目id
      }
      var query = "select * from menu ORDER BY `id` DESC limit ? OFFSET ?"; //每頁項目範圍
      var params = [LimitNum, startNum];
      query = mysql.format(query, params); //format -> 將query取得的項目轉化成params格式
      connection.query(query, function (error, row) {
        if (error) throw error;
        res.json({ "TotalCount": totalCount, "datas": row });
      });
    });
  })

  router
  .route("/menu/:page")
  .get(function (req, res) {
    //先統計總共幾筆資料
    var query = "SELECT count(*) as TotalCount FROM `menu` WHERE `upload_time_sid`='7'"; //用SQL找總共多少筆
    var totalCount = 0;
    connection.query(query, function (error, row) {
      if (error) throw error;
      totalCount = row[0].TotalCount;

      //讀出分頁資料
      var LimitNum = 6;   //一次讀取6筆資料
      var startNum = 0;    //從第幾筆開始讀
      if (req.params.page) {                //?
        page = parseInt(req.params.page); //parseInt化
        startNum = (page - 1) * LimitNum; //依據頁數讀取第一筆的項目id
      }
      var query = "select * from menu ORDER BY `id` DESC limit ? OFFSET ?"; //每頁項目範圍
      var params = [LimitNum, startNum];
      query = mysql.format(query, params); //format -> 將query取得的項目轉化成params格式
      connection.query(query, function (error, row) {
        if (error) throw error;
        res.json({ "TotalCount": totalCount, "datas": row });
      });
    });
  })

module.exports = router;