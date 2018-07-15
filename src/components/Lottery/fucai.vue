<template>
  <div>
    <div class="topresult">
    <div class="topresult_2">
      <div class="qishu"> 
        期数 
        <span id="currentPeriod">{{number}} </span>
        <span id="DiffStr">距离封盘时间</span>
        <span id="DiffTime">{{count_downs}}</span>
        </div>
    </div>
    <div class="topresult_3">
        <div class="qihao">
        <span>第{{beforeNumber}}期</span>
      </div>
      <div class="result2">
         开奖号码
        <span class=" " v-for="item in openNum" :key="item.id" id="result">
          {{item}}
        </span>
       
      </div>
    </div>
  </div>
  <div id="type">
    &nbsp;&nbsp;玩法 :
    <span v-for="(item,index) in router"  :key="item.id"  @click="selectedItems(index,item.id)">
    <a href="javascript:;" :class="{active:nowIndex == index}"  active-class="i-link--Active" >{{item.group_name}}&nbsp;&nbsp;|</a>
    </span>
    <span @click="($router.push({name:'lottery_result',params:{game_name:$route.name}}))">开奖结果</span>
    <span @click="($router.push({name:'NoteInquiry',params:{game_name:queryId}}))">历史注单</span>
  </div>
  <div class="box">
      <div class="content">
          <div class="cbtitle">
            <div class="kj">
                <ul>
                    <li>快捷金额: </li>
                    <li><input type="number" v-model.number="money"  @keyup="check" class="kj_text" size="6" ></li>
                </ul>
            </div>
        </div>
        <div class="table1" v-show="showtihuan">
          <div v-for="(item,index) in forLength.length" :key="item.id" class="lottery_o_box">
          <div class="cq_title">{{forLength[index]}}</div>
          <ul class="cq_ul">
            <li style="width:65px;">号码</li>
            <li style="width:68px;">赔率</li>
            <li style="width:150px;">金额</li>
            <li style="width:65px;">号码</li>
            <li style="width:68px;">赔率</li>
            <li style="width:150px;">金额</li>
            <li style="width:65px;">号码</li>
            <li style="width:68px;">赔率</li>
            <li style="width:151px;">金额</li>
          </ul>
          <div class="lottery_w_box">
            <ul class="cq_ul2">
              <li v-for="(item,indexs) in ratetype" :class="item.selected?'choseBox':''" @click="selected(item,index)" v-if="forLength[index] == ratetype[indexs].playd_type_name" :key="item.id">
                <span  class="luckyBox">
                <span class="li_1 " v-if="item.name/item.name == 1 || item.name == 0"><i>{{item.name}}</i></span>
                <span class="li_1 " v-else>{{item.name}}</span>
                <span class="li_2 red bold">{{item.odds}}</span>
                </span>
                <span class="li_3" v-if="item.selected == true && money==null">
                  <input type="text">
                </span>
                <span class="li_3" v-if="item.selected == true && money!==null">
                  <input type="number" v-model.number='item.money' @click.stop="selected" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false" />
                </span>
                <span class="li_3" v-if="item.selected == false">
                  <input type="text">
                </span>
              </li>
            </ul>
          </div>
        </div>
        </div>
        <div class="submit" v-show="showtihuan">
            <button class="btn-sub" id="psbbtton" @click="submit">提交</button>
            <button class="btn-sub" id="preset" @click="preset">重设</button>
        </div>
      </div>
      <moneymodel></moneymodel>
      <div class="spiningDubbles" v-show="showLoading">
      <vue-loading type="spiningDubbles" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading> 
      </div>  
      <div v-show="closing" class="closing">
        <h1>{{fengpanYN}}</h1>
        <p v-show="isopenNowTF">距离开盘时间:{{count_down}}</p>
        </div>
  </div>   
  <maskLayer :ifopen="ifopen" :content='content'></maskLayer>
  </div>
</template>

<script>
import vueLoading from 'vue-loading-template'
import maskLayer from '@/components/base/mask-layer'
import moneymodel from '@/components/base/moneymodel'
import {mapState, mapMutations} from 'vuex'
import NP from 'number-precision'
export default {
  name: 'cqssc',
  data () {
    return {
      showLoading:false,
      isopenNowTF:false,
      showtihuan:true,
      ratetype:[],
      ifopen: false,
      content: '',
      count_down:'00:00',
      count_downs:'00:00',
      nowIndex:'',
      number:'',
      openNum:[],
      money:'' ,
      isShowMessageBox:false,
      showModel:false,
      router:'',
      shoTypeId:'1',
      forLength:'',
      queryId:'',
      beforeNumber:'',
      fengpanYN:'封盘中',
      nowNumber:'',
      closing:false
    }
  },
  components: {
      vueLoading,
      maskLayer,
      moneymodel
  },
  watch:{
    money:function(newval,oldval){
      let value = String(newval);
      if(value.indexOf('.') > 0){
        var left = value.substr(0,value.indexOf('.'));
        var right = value.substr(value.indexOf('.')+1,value.length);
        if(right.length>1){
          right = right.substr(0,1);
        }
        value = left +'.'+right;
      }
      this.money = value;
    }
  },
  created(){
    this.getarr();
    this.getfuArry();
    this.queryId = this.$route.query.name;
  },
  computed: {
      ...mapState(['headerArry','usermoney','rootbox'])
  },
  methods:{
    mytoast(msg) {
        this.ifopen = !this.ifopen
        this.content = msg
        setTimeout(() => {
          this.ifopen = !this.ifopen
        }, 1500)
    },
    preset () {
        for(let i in this.rate){
            this.rate[i].money = '';
            this.rate[i].selected = false;
        }
    },
    submit () {
        let arry =[];
        for(let i in this.rate){
            if(this.rate[i].selected == true){
                arry.push(this.rate[i]);
        }
        this.arry = arry;
        let sum = 0;
        for(let p =0;p<this.arry.length;p++){
          if(this.arry[p].money == ''){
              this.mytoast('有选中内容的没有下注');
              return;
          }
          if(this.arry[p].min_charge>this.arry[p].money || this.arry[p].money>this.arry[p].max_charge){
              this.mytoast('最高下注为100000,最低为2!');
              return;
          }
            sum+=Number(this.arry[p].money);
        }
        this.allmoney = NP.strip(sum);
        }
        if(arry.length === 0){
            window.wAlert('请先下注！');
            return;
        }
        this.$msgBox.showMsgBox({
            arry: this.arry,
            allmoney: this.allmoney,
            qishu:this.number,
            isShowInput: true,
            isShowCancelBtn:true
            }).then( (val) => {
            this.sureBtn();
            }).catch(() => {
            // ...
            });
    },
    getRateTypeByid(id){
       this.ratetype=this.rate.filter(v=>{
        return v.playd_guoup_id==id;
      })
      
      let indexArry =[];
      for(let i = 0;i<this.ratetype.length;i++){
        indexArry.push(this.ratetype[i].playd_type_name)
      }
      let resultArr;
      resultArr = indexArry.filter(function (item, index, self) {
      return self.indexOf(item) == index;
      });
      this.forLength = resultArr;
    },
    selectedItems (index,id){
      this.nowIndex = index;
      this.shoTypeId = id;
      this.getRateTypeByid(id);
    },
    selected (item) {
        item.selected = !item.selected;
        item.money=this.money;
    },
    conutDown() {
        let span = this.time * 1000;
        let close = this.closingtime * 1000;
        let timer = setInterval(() => {
          let day = Math.floor(span / 1000 / 60 / 60 / 24);
          let h = Math.floor((span - day * 24 * 60 * 60 * 1000) / 1000 / 60 / 60);
          let m = Math.floor((span - day * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000) / 60 / 1000);
          let s = Math.floor((span - day * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000);
          let days = Math.floor(close / 1000 / 60 / 60 / 24);
          let hs = Math.floor((close - days * 24 * 60 * 60 * 1000) / 1000 / 60 / 60);
          let ms = Math.floor((close - days * 24 * 60 * 60 * 1000 - hs * 60 * 60 * 1000) / 60 / 1000);
          let ss = Math.floor((close - days * 24 * 60 * 60 * 1000 - hs * 60 * 60 * 1000 - ms * 60 * 1000) / 1000);
          span -= 1000;
          close -= 1000;
          this.count_downs = (days == 0 ? "00" : days.prefix("0")) + "天" + (hs == 0 ? "00" : hs.prefix("0")) + ":" + (ms == 0 ? "00" : ms.prefix("0")) + ":" + (ss == 0 ? "00" : ss.prefix("0"));
          this.count_down = (day == 0 ? "00" : day.prefix("0")) + "天" + (h == 0 ? "00" : h.prefix("0")) + ":" + (m == 0 ? "00" : m.prefix("0")) + ":" + (s == 0 ? "00" : s.prefix("0"));
          if(this.nowNumber <= 0){
          this.closing = true;
          this.fengpanYN = '已关盘';
          this.count_downs = '已关盘';
          }
          if(this.isopenNow == false){
            this.closing = true;
            this.isopenNowTF = true;
            this.fengpanYN = '已封盘';
            this.count_downs = '已封盘';
          }
          if(days == 0 && hs==0 && ms == 0 && ss==0 || days < 0){
            this.isopenNowTF = true;
            this.closing = true;
            this.count_downs = '已封盘';
          }
          if(day == 0 && h==0 && m == 0 && s==0){
            clearInterval(timer);
            this.getfuArry();
            this.getarr();
            this.closing = false;
          }
        }, 1000)
      },
    check () {
      for(let i in this.rate){
          this.rate[i].money = this.money;
      }
    },
    async getfuArry () {
      let that = this;
      that.showLoading = true;
      that.showtihuan = false;
      that.$http.get('api/lottery-v1/fc3d/odds/').then(function(res){
          that.showLoading = false;
          that.showtihuan = true;
          let tpRate = res.data.playd;
          let headArr = res.data.group;
          for(let i in tpRate){
              tpRate[i].selected = false;
              tpRate[i].money="";
          }
          that.rate=tpRate;
          that.router = headArr;
          if(headArr[0]){
            that.shoTypeId=headArr[0].id;
            that.getRateTypeByid(that.shoTypeId);
          }
      });
    },
    getarr () {
      let that = this;
      that.$http.get('/api/lottery-v1/fc3d/opentime/').then(function(res){
      that.time = res.data.opentime ;
      that.nowNumber = Number(res.data.number);
      that.closingtime = res.data.endtime;
      that.isopenNow = res.data.isopen;
      that.conutDown();
      that.number = res.data.number;
      let arry =[];
      for(let i in res.data.hmlist){
        that.beforeNumber = i;
        let string = res.data.hmlist[i].slice(1,-1);
        that.openNum = string.split(',');
      }
      // that.number = new Date().format("yyyy-MM-dd ");
      })
    },
    sureBtn () {
        let money = [];
        let play_id = [];
        let play_info = [];
        for(let i in this.arry){
            money.push(this.arry[i].money);
            play_id.push(this.arry[i].play_id);
            play_info.push(this.arry[i].playd_info)
        }
        this.$http.post('/api/lottery/order/bet/',{
            lot_id:this.queryId,
            play_id:play_id,
            play_info:play_info,
            money:money
        }).then((res)=>{
            if(res.data.code !== 0){
                this.mytoast(res.data.msg);
                return;
            }
            var numbet = 0;
            for(var ibet =0;ibet<money.length;ibet++){
                numbet += Number(money[ibet]);
            }
            let changeMoney = NP.minus(this.usermoney,numbet)+'0';
            this.$store.commit('SITEMONEY',changeMoney);
            this.mytoast(res.data.msg);
            this.preset();
        })
    }
  }
}
</script>
<style scoped>
.li_1 i{
  background: -webkit-gradient(linear, left top, left bottom, from(#6666CC), to(#F0EDE7));
  background: -webkit-linear-gradient(#6666CC, #F0EDE7);
  background: linear-gradient(#6666CC, #F0EDE7);
  color: #fff;
}
#result{
   background: -webkit-gradient(linear, left top, left bottom, from(#6666CC), to(#F0EDE7));
  background: -webkit-linear-gradient(#6666CC, #F0EDE7);
  background: linear-gradient(#6666CC, #F0EDE7);
}
</style>




