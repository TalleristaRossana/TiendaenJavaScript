var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/pedido');
var usersRouter = require('./routes/users');

var app = express();

var Schema = mongoose.Schema;

var mongoose = require("mongoose");
mongoose.connect("mongodb:localhost/tienda");
var pedidoSchemaJSON = {
  nombre: String,
  precio: Number,
  cantidad: Number

}

var pedido_schema = new mongoose.Schema(pedidoSchemaJSON);

var Pedido = mongoose.model("Pedido",pedido_schema);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.post("/users",function(req,res){
  var pedido = new Pedido({
    nombre: req.body.email, 
    precio: req.body.precio, 
    cantidad: req.body.cantidad
  });
  pedido.save(function(){
    res.send("Guardamos tus datos");
  });
    
});
module.exports = app;
