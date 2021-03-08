const router = require('koa-router')();
const {login} = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/resModel');

router.prefix('/api/user');

router.post('/login', async function (ctx, next) {
    const {username, password} = ctx.request.body;
    const data = await login(username, password);
    if (data.username) {
        // 设置 session
        ctx.session.username = data.username;
        ctx.session.realname = data.realname;
        ctx.body = new SuccessModel(); // 使用ctx.body返回
        return;
    }
    ctx.body = new ErrorModel('登录失败');
    // const result = login(username, password);
    // return result.then(data => {
    //     if (data.username) {
    //         // 设置 session
    //         req.session.username = data.username;
    //         req.session.realname = data.realname;
    //         // 同步到 redis - 这里使用express-session话会自动同步到redis去，不需要再写
    //         // set(req.sessionId, req.session);
    //
    //         res.json(new SuccessModel());
    //         return;
    //     }
    //     res.json(new ErrorModel('登录失败'));
    // })
});


// 定义了新的路由记得去app.js引用一下
module.exports = router;
