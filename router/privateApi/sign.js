const path = require('path');
const signRouter = require('express').Router();
const { success, fail } = require('../response');
const { selectUserByAccount, createUser } = require('../../service/sign.service');
const { createHash } = require('../../common/crypto');
const { createToken } = require('../../common/jwt');
/**
 * 登录接口
 */
signRouter.post('/login',async (req,res) => {

    let { account, password } = req.body;

    let userInfo = await selectUserByAccount(account);

    if (!userInfo) {
       fail(res, 4040, '该账号未注册');

       return ;
    }

    let flag = createHash(password) === userInfo.password;

    if (flag) {
        let data = {
            nickname: userInfo.nickname,
            avatar: userInfo.avatar,
            account: userInfo.account
        };
        res.cookie('token',createToken(data),{ maxAge: 24 * 60 * 60 * 1000 });
        
        success(res, { token: createToken(data)}, '登录成功');
    } else {
        fail(res, 4030, '账号或密码错误');
    }

})


/**
 * 注册接口
 */
signRouter.post('/register',async (req,res) => {
    let { account, password, avatar, nickname } = req.body;

    let account_reg= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; // 判断邮箱格式是否正确
    let space_reg = /(^\s+)|(\s+$)/g;

    if (account.length === 0 || !account_reg.test(account)) {
        fail(res,4030,'请输入正确的邮箱账号');
    } else if (password.length === 0 || space_reg.test(password) || password.length < 6 || password.length > 18) {
        fail(res,4030, '请输入大于6位小于18位的密码，不得包含空格字符')
    } else if (nickname.length === 0 || space_reg.test(nickname) || nickname.length > 20) {
        fail(res,4030, '昵称长度不得超过20位字符且不得包含空格');
    } else {
        password = createHash(password);

        let results = await createUser(account,password,nickname,avatar);
        if (results) {
            let data = {
                account: account,
                nickname: nickname,
                avatar: avatar
            }
            success(res, data, '注册成功');
        } else {
            fail(res, 4030, '注册失败')
        }


    }


})


module.exports = signRouter;