var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var multer = require('multer');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
//ming
var foodtopiaRouter = require('./routes/foodtopia');
var updateRouter = require('./routes/update');
var uploadRouter = require('./routes/upload');
var monthRouter = require('./routes/month');
var imgupRouter = require('./routes/imgup');
var talkRouter = require('./routes/talk');
//yvn
var recipeRouter = require('./routes/recipe');
//wilson
var usersRouter = require('./routes/users');
var membersRouter = require('./routes/members');
var sessionRouter = require('./routes/session');
var cartRouter = require('./routes/cart');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended:false} ));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//ming
app.use('/foodtopia', foodtopiaRouter);
app.use('/update', updateRouter);
app.use('/upload', uploadRouter);
app.use('/month', monthRouter);
app.use('/imgup', imgupRouter,express.static("public/uploads"));//靜態提供public->uploads檔案
app.use('/talk', talkRouter);
//yvn
app.use('/api', recipeRouter);
//wilson
  //session
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
app.use(cookieParser());
app.use(session({
  secret: "123456",
  name: "session"
}));
  // storage
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'foodtopia',
  password: '',
  database: 'foodtopia',
  port: 8889
});
var fs = require("fs");
var multer = require('multer');
var upload = multer({
  dest: './uploads'
});
app.post('/upload', upload.single('file'), function (req, res, next) {

  fs.rename(req.file.path, "./public/uploads/" + req.file.originalname, function (err) {
    if (err) {
      throw err;
    }
    console.log('good!');
  })
  // res.writeHead(200, {
  //     "Access-Control-Allow-Origin": "*"
  // });
  // res.end(JSON.stringify(req.file)+JSON.stringify(req.body));
  req.session.profile = req.file.originalname;
  var _member = req.session.profile;
  console.log(_member);
  var id = req.session.sid;
  console.log(id);
  connection.query("update members set ? where sid=?", [{
    profile: _member
  }, id], function (error) {
    if (error) throw error;
    res.redirect('http://localhost:3001/memberCenter/basicInfo');
  });

})
app.use('/users', usersRouter);
app.use('/api', membersRouter);
app.use('/session', sessionRouter);
app.use('/cart', cartRouter);
//

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
