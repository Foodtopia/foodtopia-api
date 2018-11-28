var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var multer = require('multer');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var foodtopiaRouter = require('./routes/foodtopia');
var updateRouter = require('./routes/update');
var uploadRouter = require('./routes/upload');
var membersRouter = require('./routes/members');
var monthRouter = require('./routes/month');
var imgupRouter = require('./routes/imgup');

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
app.use('/foodtopia', foodtopiaRouter);
app.use('/update', updateRouter);
app.use('/upload', uploadRouter);
app.use('/api', membersRouter);
app.use('/month', monthRouter);
app.use('/imgup', imgupRouter,express.static("public/uploads"));//靜態提供public->uploads檔案

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
