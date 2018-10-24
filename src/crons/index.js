/**
 * Created by Moses on 2017/7/7.
 */
// const cronCrawler = require('./cron_crawlers');
// const cronAnalyzer = require('./cron_analyzers');
const cronSmzdmCheckin = require('./cron_smzdm_checkin');

const start = function () {
  const clawlers = cronSmzdmCheckin();
};
module.exports = {
  start,
};
// start()
// ;
