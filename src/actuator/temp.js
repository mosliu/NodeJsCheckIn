
function parsestring(str) {
  return JSON.stringify({
    cookie: str,
  });
}
const cookie = ' _ga=GA1.2.2064394291.1536798826; A2="2|1:0|10:1540770611|2:A2|56:NDcyODNiMzEwN2QwZTk4YTE5NzlkOWM0MGFiNmZkNGVlMmZiNmZhNw==|0be714f519674b2ab2031d42a597fca5ce9079d3eb2f2dc258187cdca6be6488"; V2EX_TAB="2|1:0|10:1539914056|8:V2EX_TAB|8:dGVjaA==|9c6ac3aaba9f913f3f8311af12b16c358abb106e690d7d3188c30df0e09074fd"; V2EX_LANG=zhcn; PB3_SESSION="2|1:0|10:1540770546|11:PB3_SESSION|40:djJleDo2MC4yMDguMTEzLjI1NDozMDMwMjIzOA==|b968ab9b1f7bbc1d6a88c0594b456bc9c9fadf108fe7cd1e1319ee185316b2fb"';
console.log(parsestring(cookie));
