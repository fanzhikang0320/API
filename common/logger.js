const log4js = require('log4js');

const path = require('path');


log4js.configure({
    pm2: true,
    appenders: {
        sql: {
            type: 'dateFile',
            keepFileExt: true, //保持 文件后缀为 log
            filename: path.resolve(__dirname,'../logs','sql','SQL.log'),
            pattern: '.yyyy-MM-dd',
            maxLogSize: 1024 * 1024,//文件最大字节数
            daysToKeep: 3, // 保存 3 天内的日志， 设置为0 永久保存
            layout: {
                //配置输出格式
                type: 'pattern',
                pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%p] : %m%n" 
            }
        },
        default: {
            type: 'dateFile',
            keepFileExt: true,
            maxLogSize: 1024 * 1024,
            daysToKeep: 3,
            filename: path.resolve(__dirname,'../logs','default','DEFAULT.log'),
            pattern: '.yyyy-MM-dd',
            layout: {
                type: 'pattern',
                pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] : %m%n'
            }
        }
    },
    categories: {
        sql: {
            appenders: ['sql'], // 该分类使用sql的配置写入日志，可以配置多个
            level: 'all'
        },
        default: {
            appenders: ['default'],
            level: 'all'
        }
    }
})



const sqlLogger = log4js.getLogger('sql');
const defaultLogger = log4js.getLogger('default');

process.on('exit', () => {
    log4js.shutdown();
})

module.exports = {
    sqlLogger,
    defaultLogger
}
