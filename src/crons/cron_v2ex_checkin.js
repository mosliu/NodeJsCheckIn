const CronJob = require('cron').CronJob;
const debug = require('debug')('Cron:V2ex');
const config = require('../config');
const V2ex = require('../actuator/v2ex');
// const crawlers = require('../crawlers');

const v2exConf = config.jsons.v2ex;
const v2exArray = v2exConf.map(conf => new V2ex(conf));
const cronconf = config.cron.v2ex;

async function startCheckin() {
  debug('v2ex Cron triggered ,Start checking in');
  await Promise.all(
    v2exArray.map(e => e.start()),
  );
}

function start() {
  // '0 * * * *'
  return new CronJob(cronconf.crontab, (async () => {
    await startCheckin();
  }), null, true, 'Asia/Chongqing');
}
module.exports = {
  start,
  startCheckin,
};
