
module.exports = {
    success: (res, data, msg = "success", field = {}, status = 200) => {
        res.status(status).send({
            code: 1,
            msg: msg,
            ...field,
            data: data,
            status: 'success'
        })
    },
    fail: (res, code, msg = "fail", status = 200) => {
        res.status(status).send({
            code: code,
            msg: msg,
            status: 'fail'
        })
    }
}