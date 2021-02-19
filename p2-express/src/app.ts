import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cors from 'cors';
import publicDir from './constant';
import usersRouter from "./routes/users-router"
import threadRouter from './routes/thread-router';
import emailRouter from './routes/email-router';
import session from 'express-session';
import MemoryStore from 'memorystore';
import dotenv from 'dotenv';
import indexRouter from './routes/index-router';
import tagRouter from './routes/tag-router';

dotenv.config();
var app = express();

// view engine setup
//app.use(cors({origin:process.env.CLIENT, credentials: true}));
app.use(cors({origin: [process.env.CLIENT as string, process.env.MOBILE as string, process.env.ANDROID as string], credentials: true}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));
app.use(session({
  secret: 'whatever',
  store: new (MemoryStore(session))({checkPeriod: 86400000}),
  cookie: {}}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/threads', threadRouter);
app.use('/emails', emailRouter);
app.use('/tags', tagRouter);

// catch 404 and forward to error handler
app.use(function(req:any, res:any, next:Function) {
  next(createError(404));
});

// error handler
app.use(function(err:any, req:any, res:any, next:Function) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;