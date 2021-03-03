const Koa = require('koa');
const app = new Koa(); // app实例
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser'); // 处理postData
const logger = require('koa-logger');
// 路由处理引入
const index = require('./routes/index');
const users = require('./routes/users');
const blog = require('./routes/blog');
const user = require('./routes/user');

// error handler
onerror(app);

// middlewares
// app.use和express基本一样
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(json()); // 处理postData中上传数据 - 原理和之前都是一样的
app.use(logger()); // 日志
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date(); //获取当前时间
  await next(); // 做其他处理
  const ms = new Date() - start; //做完之后再获取时间
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`); // 看服务请求耗时~
});

// routes
app.use(index.routes(), index.allowedMethods()); // 针对路由如果访问有问题会有一个兜底
app.use(users.routes(), users.allowedMethods());
app.use(blog.routes(), blog.allowedMethods());
app.use(user.routes(), user.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
