/**
 * Created by Moses on 2018-10-25
 */
const _ = require('lodash');
const rp = require('request-promise-native');
const log = require('../log/log');
const reqUtil = require('../utils/request_util');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36';
const baseHeader = {
  'User-Agent': UA,
};


// const cookie = 'PHPSESSID=q4oharska96qqmg76vtg2tu2k7; isFirstUser=yes; smzdm_user_source=478D479151F039B961EDB509F46E334C; amvid=eafd63305f212c617baa011e7db774d5; firstUser2017=1; device_id=10202936301506410466825631623753b26a6eb03e4c5f2397a9cdf821; wt3_sid=%3B999768690672041; __ckguid=KxQ2TWCxwGiaPBA2bSInng4; __jsluid=8e2bf9f5d79f6995a851dc467bf9c45f; sess=OWNkNDV8MTU0MDg2MTcxNHwzMTExNzk3NzU4fDMyODBlY2Q0NTZmMzI0YjRhMWFkOGJhZGRjMDc3MmRl; user=user%3A3111797758%7C3111797758; smzdm_id=3111797758; userId=3111797758; smzdm_user_view=DB420E311FCBC2562BE4E9874257F4F1; wt3_eid=%3B999768690672041%7C2149544248900294689%232153992149000099519; ad_date=25; zdm_qd=%7B%7D; ad_json_feed=%7B%22J_feed_ad1%22%3A%7B%22number%22%3A0%2C%22surplus%22%3A2%7D%2C%22J_feed_ad3%22%3A%7B%22number%22%3A0%2C%22surplus%22%3A2%7D%7D; bannerCounter=%5B%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A2%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A2%7D%5D';
// const cookie = '__ckguid=HNh2OWPoTTe8EfFf4bA1n2; __jsluid=277e85bb353645f50b5ec48f45403ff1; PHPSESSID=807af3ed6e8b2da72f5b3ba71d6e8f7f; device_id=1020293630154045244033139117d8a5a851c70f105b851e051016d6c1; ad_date=25; zdm_qd=%7B%7D; _ga=GA1.2.520263027.1540452511; _gid=GA1.2.1291097689.1540452511; _gat_UA-27058866-1=1; sess=N2Q0OTR8MTU0NTYzNjQ2N3w1NzExNzAzNDA0fDljZjAxOTA3Y2JkMzFkMjBhZTdmZGRhMTM1MmVmODdm; user=user%3A5711703404%7C5711703404; smzdm_id=5711703404; userId=5711703404; ad_json_feed=%7B%22J_feed_ad1%22%3A%7B%22number%22%3A0%2C%22surplus%22%3A2%7D%2C%22J_feed_ad3%22%3A%7B%22number%22%3A0%2C%22surplus%22%3A2%7D%7D; bannerCounter=%5B%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A2%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A2%7D%5D; amvid=cae6b52fd51abf7b739a5da67cf83cba';
const cookie = '1';

class Smzdm {
  /**
   *Creates an instance of Smzdm.
   * @param {*} _config {cookie:'',username:''}
   * @memberof Smzdm
   */
  constructor(_config) {
    const jar = rp.jar();
    this.baseOption = {
      jar,
      headers: baseHeader,
      resolveWithFullResponse: true,
    };
    this.request = rp.defaults(this.baseOption);

    this.userConfig = _config;
    if (this.cookie === null) {
      const exception = {
        message: 'cookie must be provided',
      };
      // 设定flag，输入的config错误。
      this.isConfigWrong = true;
      throw exception;
    }

    log.log(`SMZDM start running,Name :[${this.userConfig.username}],Please wait...`);

    // 用于存储信息
    this.info = {
      // 签到信息
      checkin: {},
      // 回复信息
      reply: {},
    };
  }

  /**
   * 签到
   *
   * @memberof Smzdm
   */
  async checkin() {
    log.log(`SMZDM start checking in ,Name :[${this.userConfig.username}],Please wait...`);
    if (this.isConfigWrong) {
      log.log('SMZDM start checking error,Config is wrong');
      return null;
    }
    // eslint-disable-next-line
    const checkinUrl = `https://zhiyou.smzdm.com/user/checkin/jsonp_checkin?callback=jQuery112409568846254764496_${new Date().getTime()}&_=${new Date().getTime()}`;
    const checkinReferer = 'http://www.smzdm.com/qiandao/';
    let option = reqUtil.genBaseOptionFromUrl(checkinUrl);
    option = _.merge(option, this.baseOption);
    option.method = 'GET';
    option.headers.referer = checkinReferer;
    option.headers.Cookie = this.userConfig.cookie;
    // log.log(option);
    const response = await this.request(option);
    let body = response.body;
    // log.log(body);
    if (body.indexOf('\\u') > 0) {
      body = unescape(body.replace(/\\u/g, '%u'));
    }
    // jQuery112409568846254764496_1540471573463({"error_code":0,"error_msg":"","data":{"add_point":0,"checkin_num":1,"point":12946,"exp":12956,"gold":788,"prestige":0,"rank":23,"slogan":"<div class=\"signIn_data\">\u4eca\u65e5\u5df2\u9886<span class=\"red\">13<\/span>\u79ef\u5206\uff0c\u518d\u7b7e\u5230<span class=\"red\">2<\/span>\u5929\u53ef\u9886<span class=\"red\">15<\/span>\u79ef\u5206<\/div>","cards":4}})

    const jsonBody = body.slice(body.indexOf('({') + 1, body.lastIndexOf('})') + 1);
    // log.log(jsonBody);
    const json = JSON.parse(jsonBody);
    this.info.checkin.json = json;
    log.log(json);
    return json;
  }


  /**
   * 回帖拿分
   *
   * @memberof Smzdm
   */
  async reply() {
    log.log(`SMZDM start reply ,Name :[${this.userConfig.username}],Please wait...`);
    if (this.isConfigWrong) {
      log.log('SMZDM start checking error,Config is wrong');
      return null;
    }
    // eslint-disable-next-line
    const replyUrl = `https://zhiyou.smzdm.com/user/comment/ajax_set_comment?callback=jQuery111006551744323225079_${new Date().getTime()}&type=3&pid=${pId}&parentid=0&vote_id=0&vote_type=&vote_group=&content=${encodeURI(commitList[Math.floor(Math.random() * commitList.length)])}&_=${new Date().getTime()}`;
    const replyReferer = 'https://zhiyou.smzdm.com/user/submit/';
    let option = reqUtil.genBaseOptionFromUrl(replyUrl);
    option = _.merge(option, this.baseOption);
    option.method = 'GET';
    option.headers.referer = replyReferer;
    option.headers.Cookie = this.userConfig.cookie;
    // log.log(option);
    const response = await this.request(option);
    let body = response.body;
    // log.log(body);
    if (body.indexOf('\\u') > 0) {
      body = unescape(body.replace(/\\u/g, '%u'));
    }
    // jQuery112409568846254764496_1540471573463({"error_code":0,"error_msg":"","data":{"add_point":0,"checkin_num":1,"point":12946,"exp":12956,"gold":788,"prestige":0,"rank":23,"slogan":"<div class=\"signIn_data\">\u4eca\u65e5\u5df2\u9886<span class=\"red\">13<\/span>\u79ef\u5206\uff0c\u518d\u7b7e\u5230<span class=\"red\">2<\/span>\u5929\u53ef\u9886<span class=\"red\">15<\/span>\u79ef\u5206<\/div>","cards":4}})

    const jsonBody = body.slice(body.indexOf('({') + 1, body.lastIndexOf('})') + 1);
    // log.log(jsonBody);
    const json = JSON.parse(jsonBody);
    this.info.checkin.json = json;
    log.log(json);
    return json;
  }

  // 在cron中调用的办法
  async start() {
    await this.checkin();
  }
}


// const a = new Smzdm({
//   username: '',
//   cookie,
//   enable: true,
// });
// a.checkin();

module.exports = Smzdm;
