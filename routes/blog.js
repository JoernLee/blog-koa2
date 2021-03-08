const router = require('koa-router')();
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

// 前缀，意思后续访问路径都会加上前缀
router.prefix('/api/blog');

router.get('/list', async function (ctx, next) {

    let author = ctx.query.author || '';
    const keyword = ctx.query.keyword || '';

    if (ctx.query.isadmin) {
        console.log('is admin');
        // 管理员界面
        if (ctx.session.username === null) {
            console.error('is admin, but no login');
            // 未登录
            ctx.body(new ErrorModel('未登录'));
            return
        }
        // 强制查询自己的博客 - 现在有了session了
        author = ctx.session.username;
    }
    // koa2 await重写
    const listData = await getList(author, keyword);
    ctx.body = (new SuccessModel(listData));
    /*return result.then(listData => {
        // return new SuccessModel(listData)
        res.json(new SuccessModel(listData)); // 直接返回Model数据就行了，不需要return了
    });*/
});

router.get('/detail', async (ctx, next) => {
    // 直接获取data了
    const data = getDetail(ctx.query.id);
    ctx.body = new SuccessModel(data);
});

// koa2中间件使用和express一样
router.post('/new', loginCheck, async (ctx, next) => {
    // request.body避免和ctx.body混淆
    const body = ctx.request.body;
    body.author = ctx.session.username;
    const data = await newBlog(body);
    ctx.body = new SuccessModel(data);
});

router.post('/update', loginCheck, async (ctx, next) => {
    const val = await updateBlog(ctx.query.id, ctx.request.body);
    if (val) {
        ctx.body(new SuccessModel(val));
    } else {
        ctx.body(new ErrorModel('更新博客失败'));
    }
});

router.post('/del', loginCheck, async (ctx, next) => {
    // 把原先的登录验证可以借助刚写的中间件
    const val = await delBlog(ctx.query.id, ctx.session.username);
    if (val) {
        ctx.body(new SuccessModel());
    } else {
        ctx.body(new ErrorModel('删除博客失败'));
    }
});

// 定义了新的路由记得去app.js引用一下
module.exports = router;
