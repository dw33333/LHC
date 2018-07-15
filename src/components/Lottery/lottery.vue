<template>
  <div id="app">
    <div style="height:20px;" v-if="!easysecret"><img :src="codeImg" alt=""><input type="text" class="login-input" tabindex="3" v-model="code" style="float:left;width:70px;" ><div @click="login" style="float:left">登录</div></div>
    <div class="nav">
      <li>
      <router-link to="/lhc" @click.native="title(items,6)">
        香港六合彩
      </router-link>
      </li>
      <li  active-class="u-link--Active"> 
      <router-link :to="{path:items.name,query:{name:items.id}}"  v-for="(items,index) in headerArry" @click.native="title(items,1)" :key="items.id" v-if="index <11">
        {{items.title}}
      </router-link>
      </li>
      <li @mouseover="showMoreMenumethod" @mouseout="hideMoreMenu">
      <a href="javascript:;" :class="{activeTitle:isactive}" style="padding-left:12px;" >{{moreplay}}
        <span class="caret"></span>
      </a>
      </li>
      <ul v-show="showMoreMenu" class="moremenu" @mouseover="showMoreMenumethod" @mouseout="hideMoreMenu">
        <li  active-class="u-link--Active"> 
      <router-link :to="{path:items.name,query:{name:items.id}}" v-for="(items,index) in headerArry" @click.native="title(items,2)"   v-if="index >=11" :key="items.id">
        {{items.title}}
      </router-link>
      </li>
      </ul>
    </div>
    <transition name="slide-fade">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>  
  <maskLayer :ifopen="ifopen" :content='content'></maskLayer>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import maskLayer from '@/components/base/mask-layer'
import moneymodel from '@/components/base/moneymodel'
export default {
  name: 'lottery',
  data () {
    return {
      linkRoute:[],
      temcodeToken:'',
      codeImg:'',
      code: '',
      ifopen: false,
      content: '',
      usermoneys:'',
      showMoreMenu:false,
      moreplay:'更多玩法',
      isactive:false,
      allurl:'',
      items:'',
      // showBottom:true
    }
  },
  components:{
    maskLayer,
  },
  mounted(){
      // setInterval(()=>{
      //     this.getmoney();
      // },50000)
  },
  computed: {
      ...mapState([ 'easysecret',"usermoney",'headerArry','showBottom'])
  },
  created () {
    this.getHeaderArr();
    this.captcha();
    this.getmoney();
    this.getAgentId();
    let url = window.location.pathname;
      this.allurl = url.substring(1);
      for(let i = 12;i<this.headerArry.length;i++){
        if(this.headerArry[i].name == this.allurl){
          this.moreplay = this.headerArry[i].title;
          this.isactive = true;
        }
    }
  },
  methods:{
    async getAgentId() {
        let res = await this.$http({
          method: "post",
          url: '/api/user/getAgentId/',
          data: {domain: window.location.host},
          headers: {EasySecret: ""},
        });
        if (!res) return;
        if (res.data.code == 1) {
          this.AGENT_ID(0);
        } else if (res.data.code == 0) {
          this.AGENT_ID(res.data.data);
        }
      },
    title (items,index) {
      if(index ==1 || index == 6){
        this.moreplay = '更多玩法';
        this.isactive = false;
      }else{
        this.moreplay = items.title;
        this.isactive = true;
      }
    },
    changeTitle(){
      
    },
    hideMoreMenu () {
      this.showMoreMenu = false;
    },
    showMoreMenumethod () {
      this.showMoreMenu = true;
    },
    getmoney (){
        this.$http.get('/api/users/balance/').then((res) => {
          if(res.data.code !==0){
            return;
          }
            this.usermoneys = res.data.data.money;
            this.SITEMONEY(this.usermoneys); 
        })
    },
    mytoast(msg) {
        this.ifopen = !this.ifopen
        this.content = msg
        setTimeout(() => {
          this.ifopen = !this.ifopen
        }, 1500)
      },
    getHeaderArr () {
      this.$http.get('/api/lottery/basic/LotteryList').then((res)=>{
        this.linkRoute = res.data.data;
        this.GETDATA(this.linkRoute);
      })
    },
  captcha (){
        this.$http.get('api/site/captcha/').then((res)=>{
            this.temcodeToken = res.data.codeToken;
            this.codeImg = res.data.src;
            this.login();
        })
    },
    ...mapMutations([ "EASYSECRET",'SITEMONEY','GETDATA','AGENT_ID']),
    login () {
      if(this.easysecret){
        return;
      }
      this.$http.post('api/user/login',{
        username:'enbe',
        password:'123456',
        codeToken:this.temcodeToken,
        code:this.code,
      },{emulateJSON:true}).then(async(res)=>{
        if (res.data.code != 0) {
          this.mytoast(res.data.msg);
          return;    
        } else{
          this.$http.defaults.headers.EasySecret = res.headers.easysecret;
          this.EASYSECRET(res.headers.easysecret);
          this.getmoney();
          this.mytoast(res.data.msg);
        }
      })
    }
  },
}
</script>

<style>
.slide-fade{
  position: absolute;left:0;right: 0;
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {

  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  left:0;right: 0;
  transform: translateY(30px);
  opacity: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    width: 1100px;
    margin: 0 auto;
    height: 950px;
    background: #F0EDE7;
    position: relative;
}
.u-link--Active {
    display: inline-block;
    /* height: 38px; */
    color: #fff;
    /* line-height: 38px; */
    margin: 0px;
    background-color: #786759;
    /* width: 100%; */
}  
.activeTitle{
  display: inline-block;
  /* height: 38px; */
  color: #fff;
  /* line-height: 38px; */
  margin: 0px;
  background-color: #786759;
}
.nav a{
    padding: 0px 11px;
    font-size: 12px;
    display: block;
    float: left;
}
.nav a:hover{
      /* display: inline-block; */
    /* height: 38px; */
    /* color: #fff; */
    /* line-height: 38px; */
    /* margin: 0px; */
    background-color: #786759;
    /* width: 100%; */
}
.caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px solid;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
}
.nav{
  position: relative;
}
.moremenu{
  /* margin-top: 42px; */
  padding: 5px;
  font-size: 14px;
  background: #A69B91;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0,0,0,.175);
  position: absolute;
  right: 15px;
  z-index: 3000;
  width: 114px;
  text-align: center;
  top: 39px;
}
.moremenu a{
  display: block;
  float:none;
}
.moremenu li{
  line-height: 28px;
  height: 28px;
  display:inline;
  float: none;
}
</style>
