const router = require('koa-router')();

// 前缀，意思后续访问路径都会加上前缀
router.prefix('/api/blog');

router.get('/list', async function (ctx, next) {
    const query = ctx.query;

    ctx.body = {
        errno: 0,
        query,
        data: ['获取的博客列表']
    }
});

// 定义了新的路由记得去app.js引用一下
module.exports = router;
