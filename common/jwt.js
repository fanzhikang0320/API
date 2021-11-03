const jwt = require('jsonwebtoken');
const secret = 'jyd521'
// 生成方法---data是自定义信息，exp是传的过期时间
let createToken = function (data, exp) {
  let obj = {};
  obj.data = data ? data : null; 
  obj.type = 'jsonwebtoken'; // 加个类型哈哈
  obj.ctime = new Date().getTime(); //token的创建时间
  // 用expiresIn就不用，直接设置过期时间
  exp = exp ? exp : 60 * 60 * 24; //设定的过期时间,不设置就默认1天 

  let token = jwt.sign(obj, secret, { expiresIn: exp }); // 调用方法生成
  return token;
};

// 验证，传入token
let varifyToken = (token) => {
  var info = jwt.verify(token, secret, (error, res) => {
    var data = {}; // 通过回调函数自定义返回信息，不然默认是创建token时传进去的obj和时间信息，这里加上状态码这些
    if (error) {
      data.code = '4030'; // 自个定义失败码
      data.msg = 'token验证失败';
      data.obj = error; // 存失败信息，比如过期等
    } else {
      data.code = '2000';
      data.msg = 'token验证成功';
      data.obj = res;
    }
    return data;
  });
  return info; // 就是我们修改后的data
};

module.exports = { createToken, varifyToken };




