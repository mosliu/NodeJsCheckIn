const rp = require('request-promise-native');

const referer = 'http://www.smzdm.com/qiandao/';

function getMainPage() {
  const cookie = cookieSess.cookies;
  const cookieName = cookieSess.username;

  const options = {
    url: `https://zhiyou.smzdm.com/user/checkin/jsonp_checkin?callback=jQuery112409568846254764496_${new Date().getTime()}&_=${new Date().getTime()}`,
    type: 'GET',
  };
}
