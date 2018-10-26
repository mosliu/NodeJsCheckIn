
function parsestring(str) {
  return JSON.stringify({
    cookie: str,
  });
}
const cookie = 'A2="2|1:0|10:1538013021|2:A2|56:ZWZkOTliOWU3MWVhYzdjY2M2NzA2N2YzMDQ3YmMzZmViM2Q5OGYwNA==|28b9779d2cac0c5dd910db22cbe5fca93f28219fef4d8ea56ab06c34c7f56899"; V2EX_TAB="2|1:0|10:1540275108|8:V2EX_TAB|8:dGVjaA==|d88ee1e2bf411e27c7a1e1868add4f874938403db1a750dca4ffa6aaa57aae98"; PB3_SESSION="2|1:0|10:1540363527|11:PB3_SESSION|40:djJleDo2MC4yMDguMTEzLjI1NDozMjAxNjE4MQ==|88f62bc68470d84e52b3370377374e957ed4cf4106de589523fbe329e5547069"; V2EX_LANG=zhcn';
console.log(parsestring(cookie));
