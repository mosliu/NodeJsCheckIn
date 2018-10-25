const urllib = require('url');

function genBaseOptionFromUrl(url) {
  const URL = urllib.parse(url);
  const option = {
    url,
    Host: URL.hostname,
    port: URL.port,

  };
  return option;
}
module.exports = { genBaseOptionFromUrl };
