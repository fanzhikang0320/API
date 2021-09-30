
const smsRouter = require('./openApi/sms');
const signRouter = require('./privateApi/sign');
const pageRouter = require('./pageRoutes');
const websiteRouter = require('./privateApi/website');
const uploadRouter = require('./openApi/upload');
const columnsRouter = require('./privateApi/columns');
const articleRouter = require('./privateApi/articles');
const authorRouter = require('./privateApi/author')
module.exports = {
    signRouter,
    smsRouter,
    pageRouter,
    websiteRouter,
    uploadRouter,
    columnsRouter,
    articleRouter,
    authorRouter
}