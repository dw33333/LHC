<template>
  <div class="mask">
    <div class="alert">
      <div class="title clearfix"><span class="tishi">{{tit}}</span><span v-show="!hidden_close_button" class="close" @click="($emit('close'))">×</span></div>
      <div class="content clearfix">
        <div class="txt" v-html="msg" :style="msgstyle?msgstyle:{}"></div>
        <div v-show="confirm">
          <div class="btn" @click="($emit('close'))"  style="margin-right:20px;">取消</div>
          <div class="btn" @click="($emit('confirm'))">确定</div>
        </div>
        <div v-show="!confirm">
          <div class="btn" @click="($emit('confirm'))">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "alert",
    props: ["msg","tit","msgstyle","confirm","hidden_close_button"]
  }
</script>

<style>
  .mask {
    left:0;
    top:0;
    right:0;
    bottom:0;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10000;
  }

  .mask > .alert {
    min-width: 200px;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-radius: 2px 2px;
    font-size: 12px;
    color:#2D2A2B;
    /*margin:auto auto;*/
    position:fixed;
    left:50%;
    top:50%;
    transform:translateX(-50%) translateY(-50%);
    cursor:pointer;
  }

  .mask > .alert > .title {
    background-color: #BB2836;
    color: #fff;
    line-height: 40px;
    padding: 0 20px;
    font-weight: bold;
    margin-top:0px;
  }

  .mask > .alert > .title .tishi {
    width: 78%;
    float: left;
    text-align: left;
  }

  .mask > .alert > .title .close {
    width: 20%;
    float: right;
    font-size:24px;
    text-align: right;
  }

  .mask > .alert > .content {
    background-color: #fff;
    padding: 15px;
    text-align: center;
    color:#5f5f5f;
  }

  .mask > .alert > .content .txt {
    margin: 10px 0 15px 0;
  }

  .mask > .alert > .content .btn {
    display:inline-block;
    line-height: 3em;
    padding: 0 10px;
    min-width: 40px;
    max-width:150px;
    /*margin:0 auto;*/

    color: #ffffff;
    background-color: #a7232f;
    border-color: #d22f3e;
    outline: none;
    border-radius: 3px 3px;
  }
  .mask > .alert > .content .btn:active{
    opacity:0.8;
  }
</style>
