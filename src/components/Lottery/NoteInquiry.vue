<template>
    <div class="xx_lottery">
        <div class="note-box">
            <div class="query-toolbar clearfix">
               <div class="form-group left">
                   <label for="">选择时间：</label>
                   <!--<select v-model="changeD">-->
                       <!--<option :value="v" v-for="(v,i) in date">-->
                           <!--{{v}}-->
                       <!--</option>-->
                   <!--</select>-->
                   <!--<input type="date"  v-model="changeD">-->
                   <el-date-picker v-model="changeD" type="date" value-format="yyyy-MM-dd"  :picker-options="pickerOptions0">
                   </el-date-picker>
               </div>
                <div class="form-group left ">
                    <label for="">彩种：</label>
                    <el-select v-model="this.indexNames" class="xx_select">
                        <el-option v-for="v in menus" :value="v.name" :label="v.title"   :key="v.title">
                        </el-option>
                    </el-select>
                </div>
                <div class="quick-btn-area left">
                    <span @click="getNoteSearch(date[6],1)">今天</span>
                    <span @click="getNoteSearch(date[5],2)">昨天</span>
                    <span @click="getNoteSearch(date[4],3)">前天</span>
                    <span class="submit-btn" :disabled="disabled" @click="getNoteSearch()">
                        查询
                    </span>
                    <button @click="getNoteSearch"><i class="iconfont icon-icon--"></i></button>
                </div>
            </div>
            <div class="list-head-container">
                <table cellpadding="0" cellspacing="0">
                      <thead>
                      <tr>
                          <th>订单号</th>
                          <th>彩票期号</th>
                          <th>投注玩法</th>
                          <th>投注内容</th>
                          <th>金额</th>
                          <th>返水</th>
                          <th>赔率</th>
                          <th>结果</th>
                          <th>投注时间</th>
                          <th>状态</th>
                      </tr>
                      </thead>
                    <tbody>
                        <tr v-for="v in dataList">
                            <td>{{v.order_id}}</td>
                            <td>{{v.bet_issue}}</td>
                            <td>{{changeId==2?'香港六合彩':v.title}}</td>
                            <td>{{v.type_name}} - {{v.name}}</td>
                            <td>{{v.bet_amt}}</td>
                            <td>{{v.back_amt}}</td>
                            <td>{{v.bet_odds}}</td>
                            <td class="blue1">{{v.net_amt}}</td>
                            <td>{{v.created_at}}</td>
                            <td :class="v.status=='0'?'green-color':'red-color'">{{v.status | filterN}}</td>
                        </tr>
                        <tr v-if="isLoding">
                            <td colspan="99">拼命加载中...</td>
                        </tr>
                        <tr v-if="dataNull">
                            <td colspan="99">暂无投注记录</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--分页-->
            <el-pagination layout="prev, pager, next" :total="page"  @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default{
        data()
        {
            return {
                date:'',
                menus:'',
                disabled:true,
                id:0,
                indexName:'',
                indexNames:'',
                changeD:'',
                dataList:'',
                isLoding:false,
                dataNull:false,
                page:null,
                changeP:1,
                changeId:'',
                pickerOptions0:{
                    disabledDate(time) {
                        let curDate = (new Date()).getTime();
                        let three = 30 * 24 * 3600 * 1000;
                        let threeMonths = curDate - three;
                        return time.getTime() > Date.now() || time.getTime() < threeMonths;;
                    }
                },
                form:{id:2,name:"six",title:"香港六合彩"}
            }
        },
        created(){
            this.date =this.getDay();
            this.changeD= this.date[6];
            this.getMenus();
        },
        props:{
            childId: null,
        },
        methods:{
            getDay(n,f){
                n = n || 0;
                let myDate = new Date();
                myDate.setDate(myDate.getDate()-6);
                let dateArray = [];
                let dateTemp;
                let year = myDate.getFullYear();
                let flag = 1;
                let h = myDate.getHours();
                let m = myDate.getMinutes();
                let s = myDate.getSeconds();
                for (let i = 0; i < 7; i++) {
                    let day = myDate.getDate();
                    let m = myDate.getMonth()+1;
                    dateTemp = year+"-"+(m>=10?m:'0'+m)+"-"+(day>=10?day:'0'+day);
                    dateArray.push(dateTemp);
                    myDate.setDate(myDate.getDate() + flag);
                }
                if( n && f ) return dateArray[n-1]+" "+h+":"+m+":"+s;
                if(n) return dateArray[n-1];
                else return dateArray;
            },
            //获取彩种列表
            getMenus(){
                this.$http.get('/api/lottery/basic/LotteryList/').then(response=>{
                  if(!response)return;
                  this.menus =response.data.data;
                  this.menus.unshift(this.form);
                  this.id = this.$route.params.game_name;
                  this.indexName = this.menus.filter( v=>{
                      return v.id == this.id;
                  })
                  this.indexNames = this.indexName[0].title;
                  sessionStorage.setItem('id',this.id)
                    this.getNoteSearch();
                },response=>{

                })
            },
            handleCurrentChange(val){
                this.changeP = val;
               this.getNoteSearch();
            },
            //获取用户注单
            getNoteSearch(date,d){
                let id = sessionStorage.getItem('id');
                this.dataNull =false;
                this.dataList = '';
                let Date;
                if(d) {Date=date;this.changeD =date}
                else Date = this.changeD;
                this.isLoding =true;
                if(this.disabled){
                    let obj ={};
                    obj.p =this.changeP;
                    obj.ps =10;
                    obj.d =Date;
                    obj.lot_id =id;
                    this.disabled =false;
                    this.changeId = this.id;
//                    if(this.id==2){
//                        this.$http.post('/api/lhc/LhcInfo/betRecord/?ps='+10+'&page='+ obj.p).then(response=>{
//                            this.dataList =response.data['list'];
//                            this.page = response.data.page*10;
//                            if(this.dataList.length==0) this.dataNull=true;
//                            else this.dataNull=false;
//                            this.isLoding =false;
////                        setTimeout(function () {
//                            this.disabled =true
////                        },4000)
//                        }, response => {
//                            this.isLoding =false;
//                            this.dataNull=true
//                        })
//                    }else{
                       let api = this.id==2?'/api/lhc/LhcInfo/betRecord/':'/api/users/betRecord/';
                        this.$http.post(api,obj).then(response=>{
                            this.dataList =response.data['list'];
                            this.page = response.data.page*10;
                            if(this.dataList.length==0) this.dataNull=true;
                            else this.dataNull=false;
                            this.isLoding =false;
//                        setTimeout(function () {
                            this.disabled =true
//                        },4000)
                        }, response => {
                            this.isLoding =false;
                            this.dataNull=true
                        })
                }
            },
        },
        filters:{
            filterN:function (n) {
                if(n==0){
                    n = '未结算';
                }else{
                    n = '已结算'
                }
                return n;
            }

        }
    }
</script>
<style scope lang="less">
@import "../../assets/css/common.less";
.xx_lottery table td {
    text-align: center;
    padding: 8px;
    border: 1px solid #ddd;
}
    .note-box{
        overflow-y: auto;
        padding-bottom: 50px;
        position: absolute;top: 50px;z-index: 99;
        width: 100%;
        height: 95%;
        font-size: 14px;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ccc;
        border: 1px solid rgba(0,0,0,.15);
        border-radius: 4px;
        box-shadow: 0 6px 12px rgba(0,0,0,.175);
    }
    .xx_select{width: 160px!important}
    .query-toolbar{
        padding: 16px 10px;
        text-align: left;
    }
    .el-pagination{
        text-align:center;
    }
    .query-toolbar label{
        color: #333;
        font-weight: 600;
    }
    .form-group{width: 25%;margin-top: 5px;}
    .quick-btn-area{width: 50%;position: relative;margin-top: 6px;}
    .blue1{color: #3f40c5;font-weight: 700}
    .green-color{color: #68b82e}
    .red-color{color: #b87947  }
    .quick-btn-area span{
        color: #fff;
        background-color: #f0ad4e;
        border-color: #eea236;
        padding: 9px 13px;
        border-radius: 4px;
        cursor: pointer;
    }
    .quick-btn-area .submit-btn{
        background-color: #337ab7;
        border-color: #2e6da4;
        display: inline-block;
        text-align: center;
        width: 150px;
        cursor: pointer;
    }
    .quick-btn-area>button{
        position: absolute;
        padding: 5px 13px;
        right: 5px;
    }
    table{
        width: 100%;

    }
    table th{
        background: #eee;
        padding: 8px;
        border: none;
        border-top: 1px solid #bbb;
        border-bottom: 1px solid #bbb;
    }
    .el-date-editor.el-input{width: 160px!important;}
    table tbody td{
        text-align: center;
    }
    .form-group select{
        padding: 4px;
    }
    .form-group input{
        font-size: 14px;
    }
</style>
