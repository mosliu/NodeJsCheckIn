const CronJob = require('cron').CronJob;
const debug = require('debug')('Cron:smzdm');
const config = require('../config');
const Smzdm = require('../actuator/smzdm');
// const crawlers = require('../crawlers');

const smzdmConf = config.jsons.smzdm;
const smzdmArray = smzdmConf.map(conf => new Smzdm(conf));
const cronconf = config.cron.smzdm;

async function startCheckin() {
  debug('Smzdm Cron triggered ,Start checking in');
  await Promise.all(
    smzdmArray.map(e => e.start()),
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
