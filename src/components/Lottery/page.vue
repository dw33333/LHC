<template>
  <div>
  <div class="topresult">
    <div class="topresult_2">
      <div class="qishu"> 
        期数 
        <span id="currentPeriod"> {{number}}</span>
        <span id="DiffStr">距离封盘时间</span>
        <span id="DiffTime">{{count_downs}}</span>
        </div>
    </div>
    <div class="topresult_3">
        <div class="qihao">
        <span>第{{beforeNumber}}期</span>
      </div>
      <div class="result2">
         <span style="float:left;">开奖号码</span>
        <span :class="'ball_'+item " v-for="item in openNum" :key="item.id" >
          <!-- {{item}} -->
        </span>
       
      </div>
    </div>
  </div>
  <div id="type">
    &nbsp;&nbsp;玩法 :
    <span v-for="(item,index) in router"  :key="item.id"  @click="selectedItems(index,item.id)">
    <a  href="javascript:;" :class="{active:nowIndex == index}"  active-class="i-link--Active" >{{item.group_name}}&nbsp;&nbsp;|</a>
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
            <div class="btn-list" v-if="this.shoTypeId == 9">
                <div>
				<button class="btn btn-add btn-ac" :class="{active1:nowIndex1 == 25}" @click="sixItem(25)">正一特</button>
                <button class="btn btn-add" :class="{active1:nowIndex1 == 26}" @click="sixItem(26)">正二特</button>
                <button class="btn btn-add" :class="{active1:nowIndex1 == 27}" @click="sixItem(27)">正三特</button>
                <button class="btn btn-add" :class="{active1:nowIndex1 == 28}"  @click="sixItem(28)">正四特</button>
                <button class="btn btn-add"  :class="{active1:nowIndex1 == 29}" @click="sixItem(29)">正五特</button>
                <button class="btn btn-add"  :class="{active1:nowIndex1 == 30}" @click="sixItem(30)">正六特</button>
				</div>
            </div>
        </div>
        <table class="table1" v-show="showtihuan" v-if="this.shoTypeId !==10" style="margin-top:10px;">
            <thead>
            <tr>
                <th width="15">号码</th>
                <th width="40">赔率</th>
                <th width="70">金额</th>
                <th width="15">号码</th>
                <th width="40">赔率</th>
                <th width="70">金额</th>
                <th width="15">号码</th>
                <th width="40">赔率</th>
                <th width="70">金额</th>
                <th width="15">号码</th>
                <th width="40">赔率</th>
                <th width="70">金额</th>
            </tr>
            </thead>
        </table>
        <div class="table1" v-show="showtihuan">
          <div >
          <div class="lottery_w_box" style="width:100%;">
            <ul class="cq_ul2" v-if="this.shoTypeId !==10 ">
              <li v-for="(item,indexs) in ratetype" :class="item.selected?'choseBox':''" @click="selected(item,index)"  v-if="item.playd_type == 1 || item.playd_type == 16 || item.type_name>=25&&item.name<50" :key="indexs.id" class="lh_li_box" style="width: 213.5px;;height:32px;">
                <span  class="luckyBox" style="width:92px;height:30px;">
                 <span class="li_lh1" :class="'ball_'+item.name" ></span>
                <span class="li_lh2 red bold">{{item.odds}}</span>
                </span>
                <span class="li_lh3"  v-if="item.selected == true && money==null">
                  <input type="text">
                </span>
                <span class="li_lh3" v-if="item.selected == true && money!==null">
                  <input type="text" v-model="item.money" @click.stop="selected">
                </span>
                <span class="li_lh3" v-if="item.selected == false">
                  <input type="text">
                </span>
              </li>
            </ul>
            <ul style="height:399px;width:757px;position:relative;" v-else>
                <table class="table2 item1" width="40">
                <thead>
                    <tr>
                        <th>...</th>
                    </tr>
                    <tr>
                        <th>类型</th>
                    </tr>
                </thead>
                <tbody><tr>
                        <td>单</td>
                    </tr>
                    <tr>
                        <td>双</td>
                    </tr>
                    <tr>
                        <td>大</td>
                    </tr>
                    <tr>
                        <td>小</td>
                    </tr>
                    <tr>
                        <td>和单</td>
                    </tr>
                    <tr>
                        <td>和双</td>
                    </tr>
                    <tr>
                        <td>和大</td>
                    </tr>
                    <tr>
                        <td>和小</td>
                    </tr>
                    <tr>
                        <td>尾大</td>
                    </tr>
                    <tr>
                        <td>尾小</td>
                    </tr>
                    <tr>
                        <td class="redc">红波</td>
                    </tr>
                    <tr>
                        <td class="green">绿波</td>
                    </tr>
                    <tr>
                        <td class="blue">蓝波</td>
                    </tr>
                </tbody></table>
                <table class="table2 zitem1" width="113">
                <thead>
                    <tr>
                        <th colspan="2">正码一</th>
                    </tr>
                    <tr>
                        <th>赔率</th>
                        <th>金额</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in rate1" :key="item.id" v-if="item.type_name ==19" :class="item.selected?'choseBox':''" >
                        <td class="bold peilv pointr red" width="50" id="showrate1" @click="selected(item,index)">{{item.odds}}</td>
                        <td width="65" v-if="item.selected == true && money==null"><input type="text" size="3" id="1" class=""></td>
                        <td width="65" v-if="item.selected == true && money!==null"><input type="text" size="3" id="1" class="" v-model="item.money"></td>
                        <td width="65" v-if="item.selected == false"><input type="text" size="3" id="1" class=""></td>
                    </tr>
                </tbody>
                
                </table>
                <table class="table2 zitem2">
                    <thead>
                    <tr>
                        <th colspan="2">正码二</th>
                    </tr>
                    <tr>
                        <th>赔率</th>
                        <th>金额</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in rate1" :key="item.id" v-if="item.type_name ==20" :class="item.selected?'choseBox':''" >
                        <td class="bold peilv pointr red" width="50" id="showrate1" @click="selected(item,index)">{{item.odds}}</td>
                        <td width="65" v-if="item.selected == true && money==null"><input type="text" size="3" id="1" class=""></td>
                        <td width="65" v-if="item.selected == true && money!==null"><input type="text" size="3" id="1" class="" v-model="item.money"></td>
                        <td width="65" v-if="item.selected == false"><input type="text" size="3" id="1" class=""></td>
                    </tr>
                </tbody>
                </table>
                <table class="table2 zitem3">
                    <thead>
                    <tr>
                        <th colspan="2">正码三</th>
                    </tr>
                    <tr>
                        <th>赔率</th>
                        <th>金额</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in rate1" :key="item.id" v-if="item.type_name ==21" :class="item.selected?'choseBox':''" >
                        <td class="bold peilv pointr red" width="50" id="showrate1" @click="selected(item,index)">{{item.odds}}</td>
                        <td width="65" v-if="item.selected == true && money==null"><input type="text" size="3" id="1" class=""></td>
                        <td width="65" v-if="item.selected == true && money!==null"><input type="text" size="3" id="1" class="" v-model="item.money"></td>
                        <td width="65" v-if="item.selected == false"><input type="text" size="3" id="1" class=""></td>
                    </tr>
                </tbody>
                </table>
                <table class="table2 zitem4">
                    <thead>
                    <tr>
                        <th colspan="2">正码四</th>
                    </tr>
                    <tr>
                        <th>赔率</th>
                        <th>金额</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in rate1" :key="item.id" v-if="item.type_name ==22" :class="item.selected?'choseBox':''" >
                        <td class="bold peilv pointr red" width="50" id="showrate1" @click="selected(item,index)">{{item.odds}}</td>
                        <td width="65" v-if="item.selected == true && money==null"><input type="text" size="3" id="1" class=""></td>
                        <td width="65" v-if="item.selected == true && money!==null"><input type="text" size="3" id="1" class="" v-model="item.money"></td>
                        <td width="65" v-if="item.selected == false"><input type="text" size="3" id="1" class=""></td>
                    </tr>
                </tbody>
                </table>
                <table class="table2 zitem5">
                    <thead>
                    <tr>
                        <th colspan="2">正码五</th>
                    </tr>
                    <tr>
                        <th>赔率</th>
                        <th>金额</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in rate1" :key="item.id" v-if="item.type_name ==23" :class="item.selected?'choseBox':''" >
                        <td class="bold peilv pointr red" width="50" id="showrate1" @click="selected(item,index)">{{item.odds}}</td>
                        <td width="65" v-if="item.selected == true && money==null"><input type="text" size="3" id="1" class=""></td>
                        <td width="65" v-if="item.selected == true && money!==null"><input type="text" size="3" id="1" class="" v-model="item.money" @click.stop="selected"></td>
                        <td width="65" v-if="item.selected == false"><input type="text" size="3" id="1" class=""></td>
                    </tr>
                </tbody>
                </table>
                <table class="table2 zitem6">
                    <thead>
                    <tr>
                        <th colspan="2">正码六</th>
                    </tr>
                    <tr>
                        <th>赔率</th>
                        <th>金额</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in rate1" :key="item.id" v-if="item.type_name ==24" :class="item.selected?'choseBox':''" >
                        <td class="bold peilv pointr red" width="50" id="showrate1" @click="selected(item,index)">{{item.odds}}</td>
                        <td width="65" v-if="item.selected == true && money==null"><input type="text" size="3" id="1" class=""></td>
                        <td width="65" v-if="item.selected == true && money!==null"><input type="text" size="3" id="1" class="" v-model="item.money" @click.stop="selected"></td>
                        <td width="65" v-if="item.selected == false"><input type="text" size="3" id="1" class=""></td>
                    </tr>
                </tbody>
                </table>
            </ul>
            <ul class="lottery_w_box" style="margin-bottom:-4px;">
              <li v-for="(item,indexs) in ratetype" :class="item.selected?'choseBox':''" @click="selected(item,index)"  v-if="item.playd_type !== 1 && item.playd_type !== 16 && item.name*1 !=item.name" :key="indexs.id" class="lh_li_box" style="width:213.5px;height:32px;float:left;">
                <span  class="luckyBox" style="width:101px;height:30px;">
                 <span class="li_lh_word">{{item.name}}</span>
                <span class="li_lh2 red bold">{{item.odds}}</span>
                </span>
                <span class="li_lh3"  v-if="item.selected == true && money==null">
                  <input type="text">
                </span>
                <span class="li_lh3" v-if="item.selected == true && money!==null">
                  <input type="text" v-model="item.money" @click.stop="selected">
                </span>
                <span class="li_lh3" v-if="item.selected == false">
                  <input type="text">
                </span>
              </li>
            </ul>
          </div>
        </div>
        </div>
        <div style="clear:both"></div>
        <div class="submit" v-show="showtihuan">
            <button class="btn-sub" id="psbbtton" @click="submit">提交</button>
            <button class="btn-sub" id="preset" @click="preset">重设</button>
        </div>
    </div>
        <moneymodel></moneymodel>
        <div class="so" v-if="this.shoTypeId == 1">
            <table>
                <tbody>
                    <tr v-for="item in fromData" :key="item.id" class="tr">
                        <td>
                        <input type="checkbox" @click="chose(item)" :checked="item.state">
                        <span>{{item.zodiacname}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>
    
    <div class="spiningDubbles" v-show="showLoading">
      <vue-loading type="spiningDubbles" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading> 
      </div> 
      <div v-show="closing" class="closing">
          <h1>{{fengpanYN}}</h1>
          <!-- <p v-show="isopenNowTF">距离开盘时间:{{count_down}}</p> -->
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
  name: 'page',
  data () {
    return {
      nowIndex:'',
      nowIndex1:'25',
      isopenNowTF:false,
      shoTypeId:'1',
      ratetype:[],
      ratetype1:[],
      ifopen: false,
      content: '',
      money:'',
      ind:'',
      rate:[],
      rate1:[],
      arry:[],
      router:'',
      fromData:[],
      showLoading:false,
      showtihuan:true,
      number:'',
      openNum:[],
      count_down:'00:00',
      count_downs:'00:00',
      queryId:'',
      beforeNumber:'',
      showLoading:false,
      closingtime:'',
      closing:false,
      index:'',
      type:'',
      fengpanYN:'封盘中',
      nowNumber:'',
      forLength:''
    }
  },
  computed: {
      ...mapState(['agent_id','usermoney'])
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
        this.getarryXg();
        this.getarr();
        this.queryId = this.$route.query.name;
    },
  methods:{
    mytoast(msg) {
        this.ifopen = !this.ifopen
        this.content = msg
        setTimeout(() => {
            this.ifopen = !this.ifopen
        }, 1500)
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
        //   if(this.nowNumber <= 0){
        //   this.closing = true;
        //   this.fengpanYN = '已关盘';
        //   this.count_downs = '已关盘';
        //   this.isopenNowTF = false;
        //   }
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
    selectedItems (index,id){
        if(id == 9 || id == 10){
            this.shoTypeId = id
            this.nowIndex = index;
            this.showLoading = true;
            this.showtihuan = false;
            let url= "/api/lhc/LhcInfo/specialOdds/"+'?agent_id='+this.agent_id+'&playd_group_id='+id;
            this.$http.get(url).then((res) =>{
            this.showLoading = false;
            this.showtihuan = true;
            let tpdata = res.data.list;
            for(let i in tpdata){
            tpdata[i].selected = false;
            tpdata[i].money="";
            }
            this.rate1 = tpdata;
            this.ratetype=this.rate1.filter(v=>{
            return v.type_name==25;
            });
            })
            return;
        }else{
            this.nowIndex = index;
            this.shoTypeId = id;
            this.getRateTypeByid(id);
        }
        this.preset();
    },
    sixItem (i){
        this.nowIndex1 = i;
        this.ratetype=this.rate1.filter(v=>{
        return v.type_name==i;
      });
      this.preset();
    },
    getRateTypeByid(id){
       this.ratetype=this.rate.filter(v=>{
       return v.playd_guoup_id==id;
      });
      let indexArry =[];
      for(let i = 0;i<this.ratetype.length;i++){
        indexArry.push(this.ratetype[i].playd_type_name)
      }
      this.type = this.ratetype[0].playd_guoup_id;
      let resultArr;
      resultArr = indexArry.filter(function (item, index, self) {
      return self.indexOf(item) == index;
      });
      this.forLength = resultArr;
    },
    preset　() {
          for(let i in this.ratetype){
            this.ratetype[i].selected = false;
            this.ratetype[i].index = '';
            // this.money = '';
          }
          for(let i in this.rate1){
            this.rate1[i].selected = false;
            this.rate1[i].index = '';
            // this.money = '';
          }
      },
    check () {
        for(let i in this.rate){
          this.rate[i].money = this.money;
      }
      for(let i in this.rate1){
          this.rate1[i].money = this.money;
      }
    },
    selected (item,index) {
        item.selected = !item.selected;
        item.money=this.money;
    },
    chose (item) {
      item.state = !item.state;
      if(item.state == true){
          let data = item.zodiacdata.split(",");
          let a =Math.floor(data[0])
          let b = data.shift(0)
          data.unshift(a)
          for( let i in this.ratetype){
              let datatwo = this.ratetype[i].name.split(",");
              for( let a =0;a<data.length;a++){
                  
                  if(datatwo.indexOf(data[a].toString())>-1){
                      this.ratetype[i].selected=true;
                  }
              }
          }
      }else{
          let data = item.zodiacdata.split(",");
          let a =Math.floor(data[0])
          let b = data.shift(0)
          data.unshift(a)
          for( let i in this.ratetype){
              let datatwo = this.ratetype[i].name.split(",");
              for( let a =0;a<data.length;a++){
                  if(datatwo.indexOf(data[a].toString())>-1){
                      this.ratetype[i].selected=false;
                  }
              }
          }
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
        for(let i in this.rate1){
            if(this.rate1[i].selected == true){
                arry.push(this.rate1[i]);
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
            this.mytoast('请先下注！');
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
    sureBtn () {
        if(this.shoTypeId !== 9 && this.shoTypeId !== 10){
            let money = [];
            let play_id = [];
            let play_info = [];
            for(let i in this.arry){
                money.push(this.arry[i].money);
                play_id.push(this.arry[i].id);
                play_info.push(this.arry[i].playd_info)
            }
            this.$http.post('/api/lhc/LhcInfo/Bet/',{
                "playd_group_id":1,
                "play_id":play_id,
                "play_info":play_info,
                "money":money
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
        }else{
            let money = [];
            let play_id = [];
            let play_info = [];
            for(let i in this.arry){
                money.push(this.arry[i].money);
                play_id.push(this.arry[i].id);
                play_info.push(this.arry[i].name)
            }
            this.$http.post('/api/lhc/LhcInfo/Bet/',{
                playd_group_id:1,
                playd_id:play_id,
                playd_info:play_info,
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
    },
    closeMeBOX () {
        this.isShowMessageBox = false;
        this.showModel = false;
    },
    getarr () {
      let that = this;
      that.$http.get('/api/lhc/LhcInfo/newestLhcInfo/').then(function(res){
        if(res.data.list.CloseTime){
            that.time = res.data.list.CloseTime[1] ;
            that.closingtime = res.data.list.CloseTime[3];
        }
      that.beforeNumber = res.data.list.kaiJiangNumber.qishu
      that.number = res.data.list.kaiJiangNumber.qishu;
      that.openNum = res.data.list.kaiJiangNumber.ball.split(',');
      that.conutDown();
      })
    },
    getarryXg () {
      let that = this;
      that.showLoading = true;
      that.showtihuan = false;
        that.$http.get('/api/lhc/LhcInfo/odds/').then(function(res){
            that.showLoading = false;
            that.showtihuan = true;
            let tpRate = res.data.list.playd;
            let headArr = res.data.list.group;
            that.fromData = res.data.list.zodias;
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
    }
  }
}
</script scoped>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active{
  color:#B73638!important;
  background: none;
}
</style>
