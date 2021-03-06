const fs = require('fs');
const path = require('path');
const debug = require('debug')('JsonConfigLoader');
const _ = require('lodash');

/**
 * 加载.json的配置文件。
 * @returns {Object|*}
 */

function loadJasonFiles(jsonpath) {
  const loadedconf = [{}];
  fs.readdirSync(jsonpath)
    .filter((filename) => {
      if (path.extname(filename) === '.json') {
        // debug('Config file Accepted:' + filename);
        return true;
      }
      // debug('File skipped:' + filename);
      return false;
    })
    .forEach((filename) => {
      // eslint-disable-next-line
      // const res = require(path.resolve(jsonpath, filename));
      const res = JSON.parse(fs.readFileSync(path.resolve(jsonpath, filename)));
      loadedconf.push(res);
      debug(`Config file ${filename} Loaded`);
    });
  // return Object.assign(...loadedconf);
  const rtn = _.assign(...loadedconf);
  // console.log(rtn);
  return rtn;
}

// const jsons = loadJasonFiles();
module.exports = loadJasonFiles;
exports = module.exports;
