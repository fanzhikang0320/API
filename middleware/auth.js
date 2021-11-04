
const { varifyToken } = require('../common/jwt');

/**
 * 用于判断用户是否登陆，返回不同的页面
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

module.exports = function (req, res, next) {
    const { pathname } = req._parsedUrl;
    const routerWhiteList = JSON.parse(process.env.ROUTER_WHITELIST);

    let results = varifyToken(req.cookies.token);

    if (routerWhiteList.includes(pathname)) {
        next()
    } else if (results.code != 4030) {
        req.headers.userInfo = results.obj.data;
        next();
    } else {
        res.redirect('/login')
    }
}