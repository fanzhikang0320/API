
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
require(path.resolve(__dirname, './models/index'));
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;

const sassMiddleware = require('node-sass-middleware');

app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine','ejs');
app.use(cors())
// 注意：node-sass-middleware必须放在express.static前
app.use(sassMiddleware({
    src: path.join(__dirname, 'public/scss'),
    dest: path.join(__dirname, 'public/stylesheets'),
    indentedSyntax: false, // true = .sass , false = .scss
    outputStyle: 'compressed',
    sourceMap: false,
    prefix: '/stylesheets'
}));
const {signRouter, smsRouter, websiteRouter, pageRouter, uploadRouter, columnsRouter, articleRouter, authorRouter, ckeditorRouter } = require('./router');
const authMiddleware = require('./middleware/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));


app.use('/sign',signRouter);
app.use('/sms',smsRouter);
app.use('/articles', articleRouter);
app.use('/website', websiteRouter);
app.use('/upload', uploadRouter);
app.use('/columns', columnsRouter )
app.use('/author', authorRouter);
app.use('/uploader',ckeditorRouter);
app.use('/',authMiddleware,pageRouter);

// 渲染404页面
app.use((req, res) => {
    res.render('error', { title: '404 NOT FOUND' })
})
app.listen(port,host,() => {
    console.log('start');
})
