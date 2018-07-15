let easysecret = '';
try {
  if (localStorage.getItem('easysecret')) {
    easysecret = localStorage.getItem('easysecret');
  }
} catch (e) {
}
let usermoney = '';
try {
  if (localStorage.getItem('usermoney')) {
    usermoney = localStorage.getItem('usermoney');
  }
}catch(e){

}
let headerArry = {};
try {
  if (localStorage.getItem('headerArry')) {
    headerArry = JSON.parse(localStorage.getItem('headerArry'));
  }
} catch (e) {
}
let agent_id = -1;//代理id 值-1 是未被写入过 需要传代理id参数的接口判断
try {
  if (localStorage.getItem('agent_id')) {
    agent_id = JSON.parse(localStorage.getItem('agent_id'));
  } else {
    agent_id = -1;
  }
} catch (e) {

}
let rootbox = {
  open: false
}

const state = {
  rootbox,
  easysecret,
  usermoney,
  headerArry,
  agent_id,
  showBottom:true
}
export default state
