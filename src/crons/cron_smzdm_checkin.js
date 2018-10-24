const cron = require('cron');
const debug = require('debug')('Cron:Crawler');
const config = require('../config');
// const crawlers = require('../crawlers');

const cronconf = config.cron.crawler;

async function startCrawler() {
  debug('Crawler Cron triggered ,Crawler Start');
  // await crawlers.start();
}


function startCrawl() {
  // '0 * * * *'
  return new cron.CronJob(cronconf.crontab, (async () => {
    await startCrawler();
  }), null, true, 'Asia/Chongqing');
}
module.exports = startCrawl;
