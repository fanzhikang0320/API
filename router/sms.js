
const path = require('path');
const express = require('express');
const smsRouter = express.Router();
const request = require('request');
const SMSClient = require('@alicloud/sms-sdk');
const authCode = require(path.resolve(__dirname,'../utils/auth-code.js'));
const myres = require(path.resolve(__dirname,'./response.js'));
authCode.setOptions({
    age: 5,
    length: 6
});
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAI4GLCud8Q1jUnM8GJCXjL';
const secretAccessKey = '5NCD74Lsh6V0fdAJF0FBGqz3UggYCA';



/**
 * 发送短信
 * @param {String} phoneNumbers 电话号码
 * @return {*} 返回Promise对象
 */
function sendMsg(phoneNumbers) {
    let code = authCode.getCode(phoneNumbers);
    //初始化sms_client, 后面4个参数vpc需要配置
    let smsClient = new SMSClient({accessKeyId, secretAccessKey});
    return smsClient.sendSMS({
        PhoneNumbers: phoneNumbers,
        SignName: 'UKedu',
        TemplateCode: 'SMS_205135142',
        TemplateParam: "{code: "+code+"}"
    })
}


/**
 * 发送邮件 
 */
smsRouter.post('/mail',function (req,res) {
    
    let code = req.body.code;
    let phoneNumbers = req.body.phoneNumbers;
    let name = req.body.name;
    let params = req.body.params;

    let flag = authCode.verifyCode(phoneNumbers,code);

    if (flag) {
        request('https://adstocnapi.westwin.com/api/Customer/Receive?' + params,(error,response) => {

            let data = JSON.parse(response.body);
            if (error) {
                myres.fail(res,5,'邮件服务器异常',500);
            } else if (data.OPSuccess) {
                
                myres.success(res,[],'提交成功');
            } else {
                myres.fail(res,2,'提交失败')
            }
        })
    } else {
        myres.fail(res,2,'验证码已失效')
    }
    
})

/**
 * 发送信息
 */
smsRouter.post('/message',function (req,res) {

    let phoneNumbers = req.body.phoneNumbers;
    console.log(phoneNumbers);
    sendMsg(phoneNumbers)
        .then(res => {
            if (res.Code == 'ok') {
                myres.success(res,[],'信息发送成功');
            } else if (res.Code == 'isv.MOBILE_NUMBER_ILLEGAL') {
                myres.fail(res,2,'手机号码错误');
            } else if (res.Code == 'isv.BUSINESS_LIMIT_CONTROL'){
                myres.fail(res,2,'短信发送频繁')
            } else {
                myres.fail(res,2,'信息发送失败')
            }
        })
        .catch(err => {
            myres.fail(res,'短信业务暂时无法使用',500)
        })

    
})



module.exports = smsRouter;