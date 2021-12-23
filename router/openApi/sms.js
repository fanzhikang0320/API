const path = require('path');
const express = require('express');
const smsRouter = express.Router();
const myres = require(path.resolve(__dirname, '../response'));
const mail = require(path.resolve(__dirname, '../../utils/mail'));
/**
 * 发送邮件
 */
smsRouter.post('/mail', function (req, res) {
    let name = req.body.name;
    let title = req.body.title;
    let email = req.body.email;
    let content = req.body.content;
    mail(name, email, title, content, (err) => {
        if (err) {
            console.log(err);
        } else {
            myres.success(res, []);
        }
    }).catch(error => {
        console.log(err);
    })

})


module.exports = smsRouter;