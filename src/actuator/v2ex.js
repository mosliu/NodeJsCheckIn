/**
 * Created by Moses on 2018-10-25
 */
const _ = require('lodash');
const rp = require('request-promise-native');
const cheerio = require('cheerio');
const log = require('../log/log');
const reqUtil = require('../utils/request_util');
const commonUtil = require('../utils/common_util');
const v2exConf = require('../config').jsons;

// eslint-disable-next-line
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0';
const baseHeader = {
  'User-Agent': UA,
};


class V2ex {
  /**
   *Creates an instance of v2ex.
   * @param {*} _config {cookie:'',username:''}
   * @memberof v2ex
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

    log.log(`v2ex[${this.userConfig.username}] configured.`);

    // 用于存储信息
    this.info = {
      // 签到信息
      checkin: {},
      // 回复信息
      reply: {},
    };
  }

  async getonce() {
    log.log(`v2ex[${this.userConfig.username}] fetching Once,Please wait...`);
    if (this.isConfigWrong) {
      log.log('v2ex start checking error,Config is wrong');
      return;
    }
    // https://www.v2ex.com/mission/daily/redeem?once=19738
    const checkinUrl = 'https://www.v2ex.com/mission/daily';
    const checkinReferer = 'https://www.v2ex.com/';
    let option = reqUtil.genBaseOptionFromUrl(checkinUrl);
    option = _.merge(option, this.baseOption);
    option.Accept = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
    option['Accept-Language'] = 'zh,en-US;q=0.8,zh-TW;q=0.5,en;q=0.3';
    option.method = 'GET';
    option.headers.referer = checkinReferer;
    option.headers.Cookie = this.userConfig.cookie;
    // log.log(option);
    const response = await this.request(option);
    const body = response.body;
    // log.log(body);
    if (body.indexOf('你要查看的页面需要先登录') > 0) {
      this.errormsg = '未登录';
    }
    const $ = cheerio.load(body);
    // 获取once属性值
    // "location.href = '/mission/daily/redeem?once=82512';"
    const oncestr = $('input.super.normal.button').attr('onclick');
    // log.log(oncestr);
    // const oncestr = "location.href = '/mission/daily/redeem?once=82512';";
    const once = oncestr.substring(oncestr.indexOf('once=') + 5, oncestr.indexOf('\';'));
    this.once = once;
    log.log(`v2ex[${this.userConfig.username}] got Once:${this.once}`);
    // log.log(this.request.jar());
  }

  /**
   * 签到
   *
   * @memberof v2ex
   */
  async checkin() {
    log.log(`V2ex[${this.userConfig.username}] start checking.`);
    if (this.isConfigWrong) {
      log.log('v2ex start checking error,Config is wrong');
      return;
    }
    // https://www.v2ex.com/mission/daily/redeem?once=19738
    const checkinUrl = `https://www.v2ex.com/mission/daily/redeem?once=${this.once}`;
    log.log(checkinUrl);
    const checkinReferer = 'https://www.v2ex.com/mission/daily';
    let option = reqUtil.genBaseOptionFromUrl(checkinUrl);
    option = _.merge(option, this.baseOption);
    option.Accept = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
    option['Accept-Language'] = 'zh,en-US;q=0.8,zh-TW;q=0.5,en;q=0.3';
    option['Accept-Encoding'] = 'gzip, deflate, br';
    option.method = 'GET';
    option.headers.referer = checkinReferer;
    option.headers.Cookie = this.userConfig.cookie;
    // log.log(option);
    const response = await this.request(option);
    const body = response.body;
    // log.log(body);
    if (body.indexOf('已成功领取每日登录奖励') > 0) {
      log.log(`V2ex[${this.userConfig.username}] checkin success!`);
    } else if (body.indexOf('每日登录奖励已领取') > 0) {
      log.log(`V2ex[${this.userConfig.username}] already checkin!`);
    } else if (body.indexOf('你的浏览器有一些奇奇怪怪的设置，请用一个干净安装的浏览器重试一下吧') > 0) {
      await this.getonce();
      await this.checkin();
    } else {
      log.log(`V2ex[${this.userConfig.username}] check in ERROR!`);
      log.log(body);
    }
  }


  // 在cron中调用的办法
  async start() {
    if (this.userConfig.enable === true) {
      await this.getonce();
      await commonUtil.sleep(1000);
      await this.checkin();
    }
  }
}

async function test() {
  // const cookie = 'PHPSESSID=q4oharska96qqmg76vtg2tu2k7; isFirstUser=yes; v2ex_user_source=478D479151F039B961EDB509F46E334C; amvid=eafd63305f212c617baa011e7db774d5; firstUser2017=1; device_id=10202936301506410466825631623753b26a6eb03e4c5f2397a9cdf821; wt3_sid=%3B999768690672041; __ckguid=KxQ2TWCxwGiaPBA2bSInng4; __jsluid=8e2bf9f5d79f6995a851dc467bf9c45f; sess=OWNkNDV8MTU0MDg2MTcxNHwzMTExNzk3NzU4fDMyODBlY2Q0NTZmMzI0YjRhMWFkOGJhZGRjMDc3MmRl; user=user%3A3111797758%7C3111797758; v2ex_id=3111797758; userId=3111797758; v2ex_user_view=DB420E311FCBC2562BE4E9874257F4F1; wt3_eid=%3B999768690672041%7C2149544248900294689%232153992149000099519; ad_date=25; zdm_qd=%7B%7D; ad_json_feed=%7B%22J_feed_ad1%22%3A%7B%22number%22%3A0%2C%22surplus%22%3A2%7D%2C%22J_feed_ad3%22%3A%7B%22number%22%3A0%2C%22surplus%22%3A2%7D%7D; bannerCounter=%5B%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A2%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A2%7D%5D';
  const cookie = '_ga=GA1.2.2064394291.1536798826; A2="2|1:0|10:1540770611|2:A2|56:NDcyODNiMzEwN2QwZTk4YTE5NzlkOWM0MGFiNmZkNGVlMmZiNmZhNw==|0be714f519674b2ab2031d42a597fca5ce9079d3eb2f2dc258187cdca6be6488"; V2EX_TAB="2|1:0|10:1539914056|8:V2EX_TAB|8:dGVjaA==|9c6ac3aaba9f913f3f8311af12b16c358abb106e690d7d3188c30df0e09074fd"; V2EX_LANG=zhcn; PB3_SESSION="2|1:0|10:1540770546|11:PB3_SESSION|40:djJleDo2MC4yMDguMTEzLjI1NDozMDMwMjIzOA==|b968ab9b1f7bbc1d6a88c0594b456bc9c9fadf108fe7cd1e1319ee185316b2fb"';
  const a = new V2ex({
    username: '',
    cookie,
    enable: true,
  });
  await a.getonce();
  await commonUtil.sleep(1000);
  await a.checkin();
}


// test();

module.exports = V2ex;
