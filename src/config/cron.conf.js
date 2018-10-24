/**
 * Created by Moses on 2018-10-24
 */

const crawler = {
  // 每小时
  crontab: '0 41 * * * *',
};
const analyzer = {
  // 每小时
  crontab: '0 */5 * * * *',
};
const cronConf = {
  crawler,
  analyzer,
};

module.exports = cronConf;
