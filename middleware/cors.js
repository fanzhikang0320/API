


const whitelist = process.env.WHITELIST;

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