process.env.debug = '*,-sequelize:*,-retry-as-promised,-log4js*,-koa-router,-streamroller:*,-koa-views';
process.env.NODE_ENV = 'development';

const crons = require('./crons');
const config = require('./config');
const logger = require('./log/log');


async function main() {
  logger.log(config.app.name);
  crons.start();
}


main();
