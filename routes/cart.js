var express = require('express');
var router = express.Router();
var mysql = require("mysql");

//建立連線
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'foodtopia',
    password: '',
    database: 'foodtopia',
    port: 8889
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
    .route("/cart")
    .post(function (req, res) { //取得購物車內容
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        var _email = req.body.email;
        connection.query("SELECT * FROM cart AS c INNER JOIN igr_test AS p ON c.product_id=p.product_id WH" +
            "ERE email=?",
            [_email],
            function (error, rows) {
                if (error)
                    throw error;
                res.json(rows)
            })
    });

module.exports = router;