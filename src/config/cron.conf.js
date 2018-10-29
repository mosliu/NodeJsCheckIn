/**
 * Created by Moses on 2018-10-24
 */

const smzdm = {
  // 每天6：50 am
  crontab: '0 50 6 * * *',
};
const v2ex = {
  // 每小时
  crontab: '0 29 10 * * *',
};
const cronConf = {
  smzdm,
  v2ex,
};

module.exports = cronConf;
