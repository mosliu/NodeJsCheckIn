const log4js = require('log4js');
const config = require('../config');

// 加载配置文件
log4js.configure(config.log);

const logger = log4js.getLogger();
const error = log4js.getLogger('error');
const score = log4js.getLogger('score');


const logUtil = {};
// 封装错误日志
logUtil.log = function (ctx) {
  logger.info(ctx);
};

logUtil.err = function (ctx) {
  error.error(ctx);
};
logUtil.score = function (ctx) {
  score.info(ctx);
};
module.exports = logUtil;
