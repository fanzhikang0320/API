const crypto = require('crypto');

const createHash = (data) => {
    let md5 = crypto.createHash('md5');

    return md5.update(data).digest('hex')
}
module.exports = {
    createHash
}