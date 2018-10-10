var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var compression = require('compression');  

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(compression());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/jietu')));

// app.use('/', indexRouter);
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

// 推送百度收录
function baiduUrl(contents){
  var options = {
    host:'data.zz.baidu.com',
    path:'/urls?site=www.498box.com&token=2wyjDbiEwJG4tIHn',
    method:'POST',
    headers:{
        'Content-Type':'text/plain',
        'Content-Length':contents.length
    }
  }
  
  var req = http.request(options, function(res){
    res.setEncoding('utf8');
    res.on('data',function(data){
        console.log("data:",data);   //一段html代码
        baiduUpdate(contents);
    });
  });
  
  req.write(contents);
  req.end();
}
// 推送百度收录
function baiduUpdate(contents){
  var options = {
    host:'data.zz.baidu.com',
    path:'/update?site=www.498box.com&token=2wyjDbiEwJG4tIHn',
    method:'POST',
    headers:{
        'Content-Type':'text/plain',
        'Content-Length':contents.length
    }
  }
  
  var req = http.request(options, function(res){
    res.setEncoding('utf8');
    res.on('data',function(data){
        console.log("data:",data);   //一段html代码
    });
  });
  
  req.write(contents);
  req.end();
}

var contents = 
`
http://www.498box.com/index.html
http://www.498box.com/msg.html
http://www.498box.com/qq.html
http://www.498box.com/wechat.html
http://www.498box.com/taobao.html
http://www.498box.com/alipay.html
http://www.498box.com/wxchat/new_friend.html
http://www.498box.com/wxchat/pay_detail.html
http://www.498box.com/wxchat/red.html
http://www.498box.com/wxchat/start_friend.html
http://www.498box.com/wxchat/wallet.html
http://www.498box.com/alipay/balance.html
http://www.498box.com/alipay/chat.html
`;
baiduUrl(contents);


module.exports = app;
