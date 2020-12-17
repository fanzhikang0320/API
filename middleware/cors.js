
const whitelist = ['https://ukeducations.cn','http://192.168.50.203:8006','http://127.0.0.1:8007','http://192.168.50.171:8007'];

module.exports = function (req,res,next) {
    let origin = req.headers.origin;
    let flag = whitelist.includes(origin);
    
    if (flag) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Headers','content-type');
        res.header('Access-Control-Allow-Methods','DELETE,PUT,POST,GET,OPTIONS');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Max-Age', 3600);
        next();
    } else {
        res.status(401).end();
    }
}