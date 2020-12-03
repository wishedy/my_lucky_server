import express from 'express'
/*eslint-disable*/
import db from './mongodb/db.js'
import config from 'config-lite'
import router from './routes/index.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import winston from 'winston'
import expressWinston from 'express-winston'
/*eslint-disable*/
import path from 'path'
import history from 'connect-history-api-fallback'
/*eslint-disable*/
import chalk from 'chalk'
const bodyParser = require('body-parser')
const authorization = require('./middlewares/auth')
const JWT = require('./middlewares/JWT')
console.log(JWT)
const app = express()
// 解析token获取用户信息
app.use(function(req, res, next) {
  var token = req.headers['authorization'];if(token == undefined){
    return next();
  }else{
    JWT.verifyToken(token).then((data)=> {
      req.data = data;
      return next();
    }).catch((error)=>{
      console.log(error);
      return next();
    })
  }
});
// authorization middleware
app.use(authorization)
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true) // 可以带cookies
  res.header('X-Powered-By', '3.2.1')
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

// app.use(Statistic.apiRecord)
const MongoStore = connectMongo(session)
app.use(bodyParser.json()) // application/json, any Unicode, gzip/deflate
app.use(bodyParser.urlencoded({ extended: false })) // application/x-www-form-urlencoded, UTF-8, gzip/deflate
app.use(cookieParser())
app.use(session({
  name: config.session.name,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: config.session.cookie,
  store: new MongoStore({
    url: config.url
  })
}))

app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}))

router(app)
// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  if (err.name === 'UnauthorizedError') {
    console.error(req.path + ',无效token');
    res.json({
      status:false,
      message: 'token过期，请重新登录',
      code: 400
    })
    return
  }
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}))

app.use(history())
app.use(express.static('./public'))
app.listen(config.port)
