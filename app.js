var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('dotenv').config();

app.get('/dashboard/*', (req, res) => res.sendFile(path.join(__dirname, 'public/dashboard/index.html')));
app.get('/bubblechart/*', (req, res) => res.sendFile(path.join(__dirname, 'public/bubblechart/index.html')));
app.get('/excel/*', (req, res) => res.sendFile(path.join(__dirname, 'public/excel/index.html')));
app.get('/backoffice/*', (req, res) => res.sendFile(path.join(__dirname, 'public/backoffice/index.html')));

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
