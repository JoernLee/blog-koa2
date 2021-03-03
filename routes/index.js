const router = require('koa-router')(); // koa-router路由是独立于koa2的，是需要安装的
// express是集成的，koa则是拆分的，解耦好一些

// 路由中间件必须是async函数
// ctx可以理解为express中req与res的集合体
router.get('/', async (ctx, next) => {
  // render是用于view渲染，传入模板
  // 这部分非重点
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});

router.get('/string', async (ctx, next) => {
  // 访问/string返回koa2 string
  // ctx.body直接定义返回内容
  ctx.body = 'koa2 string'
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
});

module.exports = router;
