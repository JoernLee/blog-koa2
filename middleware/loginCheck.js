const {ErrorModel} = require('../model/resModel');

// 输出中间件函数 - 符合koa2中间件函数格式
module.exports = async (ctx, next) => {
    if (ctx.session.username) {
        // 已登录
        await next();
        return;
    }
    ctx.body(
        new ErrorModel('未登录')
    );
};