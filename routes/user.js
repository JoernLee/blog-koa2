const router = require('koa-router')();

router.prefix('/api/user');

router.post('/login', async function (ctx, next) {
    // 直接body没办法获取，被占用了
    const {username, password} = ctx.request.body;
    ctx.body = {
        errno: 0,
        username,
        password
    }
});

router.get('/session-test', async function (ctx, next) {
    // 之前注册的session中间件才会有内容
    if (ctx.session.viewCount == null) {
        ctx.session.viewCount = 0;
    }
    ctx.session.viewCount++;

    ctx.body = {
        errno: 0,
        viewCount: ctx.session.viewCount
    }
});

// 定义了新的路由记得去app.js引用一下
module.exports = router;
