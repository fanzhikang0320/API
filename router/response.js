
module.exports = {
    success: (res,data,msg="success",status=200) => {
        res.status(status).send({
            code: 1,
            msg: msg,
            data: data
        })
    },
    fail: (res,code,msg="fail",status=200) => {
        res.status(status).send({
            code: code,
            msg: msg
        })
    }
}