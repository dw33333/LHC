<template>
<div>
<transition name="bounce">
  <div v-show="isShowMessageBox" class="showBox">
    <div class="title">
        <span class="sureword">注单确认</span>
        <a href="jvascript:;" class="closeBox">
            <span class="ui-icon" @click="cancel"></span>
        </a>
    </div>
    <div class="wanjinDialog">
        <div class="bet">
            <div class="betc3">
                <div class="data">
                    <table>
                        <thead>
                            <tr>
                            <th width="60">序号</th>
                            <th width="220">内容</th>
                            <th width="60">赔率</th>
                            <th width="80">下注金额</th>
                            </tr>
                        </thead>
                        <tbody id="orderlist">
                            <tr v-for="(item,index) in arry" :key="index.id">
                                <td>{{index+1}}</td>
                                <td>{{item.playd_type_name}} &nbsp;{{item.name}}</td>
                                <td>{{item.odds}}</td>
                                <td>{{item.money}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="desc">
                <span>期数 :</span>
                <span class="red bold">{{qishu}}</span>
            </div>
            <!-- <div class="desc">
                <span>盘口 :</span>
                <span></span>
            </div> -->
             <div class="desc">
                <span>总下注金额 :</span>
                <span class="red bold">{{allmoney}}</span>
            </div>
        </div>
        <div class="update">
            <div class="buttontwo">
                <button type="button" @click="confirm" v-show="isShowConfimrBtn" :value="confirmBtnText">确定</button>
                <button type="button" @click="cancel" v-show="isShowCancelBtn" :value="cancelBtnText">取消</button>
            </div>
        </div>
    </div>
  </div>
  </transition>
    <div class="ui-widget-overlay" v-show="isShowMessageBox">
    </div>
  </div>  
</template>

<script>
import NP from 'number-precision'
  export default {
    props: {
      arry: {
        type: Array,
      },
      qishu:{
        type:Number,
      },
      allmoney: {
        type:Number,
      },
      isShowCancelBtn: {
        type: Boolean,
        default: true
      },
      isShowConfimrBtn: {
        type: Boolean,
        default: true
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      }
    },
    data:function(){
      return {
      isShowMessageBox:false,
      resolve: '',
      reject: '',
      promise: '' 
      }
    },
    methods: {
      confirm: function () {
        this.isShowMessageBox = false;
        if (this.isShowInput) {
        this.resolve(this.inputValue);
      } else {
        this.resolve('confirm');
        }
        this.remove();
      },
        // 取消,将promise断定为reject状态
      cancel: function () {
        this.isShowMessageBox = false;
        this.reject('cancel');
        this.remove();
      },
        // 弹出messageBox,并创建promise对象
      showMsgBox: function () {
        this.isShowMessageBox = true;
        this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
        // 返回promise对象
        return this.promise;
      },
      remove: function () {
        setTimeout(() => {
        this.destroy();
        }, 300);
      },
      destroy: function () {
        this.$destroy();
        document.body.removeChild(this.$el);
      }
    },
  }
</script>>
<style scoped>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
