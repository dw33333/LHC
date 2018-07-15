const mutations = {
  
  //BOOTBOX
  ROOTBOX(state,data){
    state.rootbox=data;
  },
  SHOWBOTTOM(state,data){
    state.showBottom = data;
  },
  EASYSECRET (state,data) {
    state.easysecret = data;
    try {
      if(data)
        localStorage.setItem('easysecret',data);
      else
        localStorage.setItem('easysecret',"");
    } catch (e) {}
  },
  SITEMONEY (state,data){
    state.usermoney = data;
    try {
      if(data)
        localStorage.setItem('usermoney',data);
      else
        localStorage.setItem('usermoney',"");
    } catch (e) {}
  },
  GETDATA(state,data){
    state.headerArry = data;
    try {
      if(data)
      localStorage.setItem('headerArry',JSON.stringify(data));
      else
      localStorage.setItem('headerArry',"");
    } catch (e) {}
  },
  AGENT_ID(state,data){
    state.agent_id = data;
    try {
      if(data)
        localStorage.setItem('agent_id',data);
      else
        localStorage.setItem('agent_id',0);
    } catch (e) {}
  }
}

export default mutations
