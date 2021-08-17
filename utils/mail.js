const nodemailer = require('nodemailer');
const mailHost = process.env.MAIL_HOST;
const mailPort = process.env.MAIL_PORT;
const mailSecure = process.env.MAIL_SECURE;
const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;

async function mail(name,to,subject,text,callback) {
    // 发件人配置
    const transporterConf = {
        host: mailHost,
        port: mailPort,
        secure: mailSecure, // true for 465, false for other ports
        auth: {
            user: mailUser, // generated ethereal user
            pass: mailPass, // generated ethereal password
        }
    };
    // 发送信息配置
    let messageConf = {
        from: {
            name: name,
            address: mailUser
        },
        to: to,
        subject: subject,
        text: text
    }
    let transporter = await nodemailer.createTransport(transporterConf);

    let info = await transporter.sendMail(messageConf,(err) => {
        callback(err);
    });

}

module.exports = mail;