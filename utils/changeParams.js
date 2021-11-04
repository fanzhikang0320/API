
/**
 * 用于排除某个对象当中的值
 * @param {*} notKey 不包含当前对象的key名称
 * @param {*} object 
 * @returns 
 */
module.exports = (notKey, object) => {

    let params = {};
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            if (key !== notKey) {
                params[key] = object[key];
            }

        }
    }

    return params;
}