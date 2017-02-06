var express                       = require('express');
var path                          = require('path');
var logger                        = require('morgan');
var cookieParser                  = require('cookie-parser');
var bodyParser                    = require('body-parser');
var marvel                        = require('./routes/marvel.js');
var app                           = express();
require('./errors');//load errors

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'Client')));
app.use("/marver", function(req, res, next){
    res.set('content-type', 'application/json');
    next();
});

app.use('/marvel', marvel);

//hack for app reload, it should be done using reverse proxy engine like nginx
app.use("/*", function(req, res){
    res.redirect("/");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
