<template>
  <div class="lottery_result">
    <!-- <span class="title">{{tempParam.typeTitle}}</span> -->
    <!-- <div class="header">
      <div class="left">
        <span class="backhome" @click="($router.push({name:'Header'}))">返回首页</span>
        <span class="title">{{tempParam.typeTitle}}</span>
      </div>
      <div class="right">
        <div class="recharge items" @click="($router.push({name:'recharge'}))">
          充值
        </div>
        <div class="withdrawal items" @click="($router.push({name:'withdrawal'}))">
          提款
        </div>
        <div class="logout items" @click="logout">
          退出
        </div>
      </div>
    </div> -->
    <div style="background: #F0EDE7;">
      <div class="search_box">
        <!-- <div class="item" style="padding-left:10px;">
           {{tempParam.typeTitle}}
         </div>-->
        <div class="item">
          游戏 :
          <el-select v-model="gameTypeIdx" size="small"
                     :placeholder="is_loading_lottery_type?'加载中...':'请选择游戏'">
            <el-option
              v-for="it,idx in gameTypes"
              :key="idx"
              :label="it.title"
              :value="idx"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item">
          日期 :
          <date-picker
            v-model="date"
            type="date"
            placeholder="日期"
            value-format="yyyy-MM-dd"
            align="right">
          </date-picker>
        </div>
        <!--<div class="item">
          期数 :
          <input type="text" v-model="gameNum"/>
        </div>-->
        <div class="btn_search" @click="search">查询</div>
        <div class="item">
        <span v-for="it in show_types" @click="(show_type=it)"
              :style="{color:show_type.value==it.value?'#e53935':'inherit'}"
              style="display: inline-block;padding:0 5px;cursor:pointer;">{{it.tit}}</span>
        </div>
      </div>
      <div class="cont" v-if="!is_loading_result">
        <table class="tb xglhc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Xglhc'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="7">彩球号码</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总单双</th>
            <th rowspan="2">总大小</th>
            <th colspan="7">特码</th>
          </tr>
          <tr>
            <th>正码一</th>
            <th>正码二</th>
            <th>正码三</th>
            <th>正码四</th>
            <th>正码五</th>
            <th>正码六</th>
            <th>特码</th>
            <th>单双</th>
            <th>大小</th>
            <th>合单双</th>
            <th>合大小</th>
            <th>合尾大小</th>
            <th>家禽野兽</th>
            <th>波段</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.qishu}}
            </td>
            <td>
              {{it.datetime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors[it.num1.color]}">
                {{it.num1.num}}
              </div>
              <div class="animal">{{it.num1.animal}}</div>
            </td>
            <td>
              <div class="ball" :style="{background:colors[it.num2.color]}">
                {{it.num2.num}}
              </div>
              <div class="animal">{{it.num2.animal}}</div>
            </td>
            <td>
              <div class="ball" :style="{background:colors[it.num3.color]}">
                {{it.num3.num}}
              </div>
              <div class="animal">{{it.num3.animal}}</div>
            </td>
            <td>
              <div class="ball" :style="{background:colors[it.num4.color]}">
                {{it.num4.num}}
              </div>
              <div class="animal">{{it.num4.animal}}</div>
            </td>
            <td>
              <div class="ball" :style="{background:colors[it.num5.color]}">
                {{it.num5.num}}
              </div>
              <div class="animal">{{it.num5.animal}}</div>
            </td>
            <td>
              <div class="ball" :style="{background:colors[it.num6.color]}">
                {{it.num6.num}}
              </div>
              <div class="animal">{{it.num6.animal}}</div>
            </td>
            <td>
              <div class="ball" :style="{background:colors[it.num7.color]}">
                {{it.num7.num}}
              </div>
              <div class="animal">{{it.num7.animal}}</div>
            </td>

            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_oddoreven)}">{{it.sum_oddoreven}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.spe_oddoreven)}">{{it.spe_oddoreven}}</td>
            <td :style="{color:getColors(it.spe_overorunder)}">{{it.spe_overorunder}}</td>
            <td :style="{color:getColors(it.spe_sum_oddoreven)}">{{it.spe_sum_oddoreven}}</td>
            <td :style="{color:getColors(it.spe_sum_overorunder)}">{{it.spe_sum_overorunder}}</td>
            <td :style="{color:getColors(it.spe_tailnum_overorunder)}">{{it.spe_tailnum_overorunder}}</td>
            <td :style="{color:getColors(it.spe_jiaqingoryeshou)}">{{it.spe_jiaqingoryeshou}}</td>
            <td :style="{color:colors2[it.colorkey]}">{{it.color}}</td>
          </tr>
        </table>
        <table class="tb xglhc" v-show="show_type.value=='longhudou'" v-if="tempParam.typeName=='Xglhc'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="7">彩球号码</th>
            <th colspan="2">上下奇偶</th>
            <th colspan="21">龙虎斗</th>
          </tr>
          <tr>
            <th>正码一</th>
            <th>正码二</th>
            <th>正码三</th>
            <th>正码四</th>
            <th>正码五</th>
            <th>正码六</th>
            <th>特码</th>
            <th>上下</th>
            <th>奇偶</th>
            <th>1v2</th>
            <th>1v3</th>
            <th>1v4</th>
            <th>1v5</th>
            <th>1v6</th>
            <th>1v特</th>
            <th>2v3</th>
            <th>2v4</th>
            <th>2v5</th>
            <th>2v6</th>
            <th>2v特</th>
            <th>3v4</th>
            <th>3v5</th>
            <th>3v6</th>
            <th>3v特</th>
            <th>4v5</th>
            <th>4v6</th>
            <th>4v特</th>
            <th>5v6</th>
            <th>5v特</th>
            <th>6v特</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.qishu}}
            </td>
            <td>
              {{it.datetime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors[it.num1.color]}">
                {{it.num1.num}}
              </div>
              <div class="animal">{{it.num1.animal}}</div>
            </td>
            <td>
              <div class="ball" :style="{background:colors[it.num2.color]}">
                {{it.num2.num}}
              </div>
              <div class="animal">{{it.num2.animal}}</div>
            </td>
            <td>
              <div class="ball" :style="{background:colors[it.num3.color]}">
                {{it.num3.num}}
              </div>
              <div class="animal">{{it.num3.animal}}</div>
            </td>
            <td>
              <div class="ball" :style="{background:colors[it.num4.color]}">
                {{it.num4.num}}
              </div>
              <div class="animal">{{it.num4.animal}}</div>
            </td>
            <td>
              <div class="ball" :style="{background:colors[it.num5.color]}">
                {{it.num5.num}}
              </div>
              <div class="animal">{{it.num5.animal}}</div>
            </td>
            <td>
              <div class="ball" :style="{background:colors[it.num6.color]}">
                {{it.num6.num}}
              </div>
              <div class="animal">{{it.num6.animal}}</div>
            </td>
            <td>
              <div class="ball" :style="{background:colors[it.num7.color]}">
                {{it.num7.num}}
              </div>
              <div class="animal">{{it.num7.animal}}</div>
            </td>

            <td :style="{color:getColors(it.t_overorunder)}">{{it.t_overorunder}}</td>
            <td :style="{color:getColors(it.t_oddoreven)}">{{it.t_oddoreven}}</td>
            <td :style="{color:getColors(it.n1vsn2)}">{{it.n1vsn2}}</td>
            <td :style="{color:getColors(it.n1vsn3)}">{{it.n1vsn3}}</td>
            <td :style="{color:getColors(it.n1vsn4)}">{{it.n1vsn4}}</td>
            <td :style="{color:getColors(it.n1vsn5)}">{{it.n1vsn5}}</td>
            <td :style="{color:getColors(it.n1vsn6)}">{{it.n1vsn6}}</td>
            <td :style="{color:getColors(it.n1vssp)}">{{it.n1vssp}}</td>
            <td :style="{color:getColors(it.n2vsn3)}">{{it.n2vsn3}}</td>
            <td :style="{color:getColors(it.n2vsn4)}">{{it.n2vsn4}}</td>
            <td :style="{color:getColors(it.n2vsn5)}">{{it.n2vsn5}}</td>
            <td :style="{color:getColors(it.n2vsn6)}">{{it.n2vsn6}}</td>
            <td :style="{color:getColors(it.n2vssp)}">{{it.n2vssp}}</td>
            <td :style="{color:getColors(it.n3vsn4)}">{{it.n3vsn4}}</td>
            <td :style="{color:getColors(it.n3vsn5)}">{{it.n3vsn5}}</td>
            <td :style="{color:getColors(it.n3vsn6)}">{{it.n3vsn6}}</td>
            <td :style="{color:getColors(it.n3vssp)}">{{it.n3vssp}}</td>
            <td :style="{color:getColors(it.n4vsn5)}">{{it.n4vsn5}}</td>
            <td :style="{color:getColors(it.n4vsn6)}">{{it.n4vsn6}}</td>
            <td :style="{color:getColors(it.n4vssp)}">{{it.n4vssp}}</td>
            <td :style="{color:getColors(it.n5vsn6)}">{{it.n5vsn6}}</td>
            <td :style="{color:getColors(it.n5vssp)}">{{it.n5vssp}}</td>
            <td :style="{color:getColors(it.n6vssp)}">{{it.n6vssp}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Cqssc'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="5">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总单双</th>
            <th rowspan="2">总大小</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th colspan="2">第四球</th>
            <th colspan="2">第五球</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>第四球</th>
            <th>第五球</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_oddoreven)}">{{it.sum_oddoreven}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.num1_oddoreven)}">{{it.num1_oddoreven}}</td>
            <td :style="{color:getColors(it.num1_overorunder)}">{{it.num1_overorunder}}</td>
            <td :style="{color:getColors(it.num2_oddoreven)}">{{it.num2_oddoreven}}</td>
            <td :style="{color:getColors(it.num2_overorunder)}">{{it.num2_overorunder}}</td>
            <td :style="{color:getColors(it.num3_oddoreven)}">{{it.num3_oddoreven}}</td>
            <td :style="{color:getColors(it.num3_overorunder)}">{{it.num3_overorunder}}</td>
            <td :style="{color:getColors(it.num4_oddoreven)}">{{it.num4_oddoreven}}</td>
            <td :style="{color:getColors(it.num4_overorunder)}">{{it.num4_overorunder}}</td>
            <td :style="{color:getColors(it.num5_oddoreven)}">{{it.num5_oddoreven}}</td>
            <td :style="{color:getColors(it.num5_overorunder)}">{{it.num5_overorunder}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='longhudou'" v-if="tempParam.typeName=='Cqssc'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="7">彩球号码</th>
            <th colspan="10">龙虎斗</th>
          </tr>
          <tr>
            <th>正码一</th>
            <th>正码二</th>
            <th>正码三</th>
            <th>正码四</th>
            <th>正码五</th>
            <th>1v2</th>
            <th>1v3</th>
            <th>1v4</th>
            <th>1v5</th>
            <th>2v3</th>
            <th>2v4</th>
            <th>2v5</th>
            <th>3v4</th>
            <th>3v5</th>
            <th>4v5</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td :style="{color:getColors(it.n1vsn2)}">{{it.n1vsn2}}</td>
            <td :style="{color:getColors(it.n1vsn3)}">{{it.n1vsn3}}</td>
            <td :style="{color:getColors(it.n1vsn4)}">{{it.n1vsn4}}</td>
            <td :style="{color:getColors(it.n1vsn5)}">{{it.n1vsn5}}</td>
            <td :style="{color:getColors(it.n2vsn3)}">{{it.n2vsn3}}</td>
            <td :style="{color:getColors(it.n2vsn4)}">{{it.n2vsn4}}</td>
            <td :style="{color:getColors(it.n2vsn5)}">{{it.n2vsn5}}</td>
            <td :style="{color:getColors(it.n3vsn4)}">{{it.n3vsn4}}</td>
            <td :style="{color:getColors(it.n3vsn5)}">{{it.n3vsn5}}</td>
            <td :style="{color:getColors(it.n4vsn5)}">{{it.n4vsn5}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='qipai'" v-if="tempParam.typeName=='Cqssc'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="5">彩球号码</th>
            <th rowspan="2">三公</th>
            <th rowspan="2">牛牛</th>
            <th rowspan="2">梭哈</th>
            <th rowspan="2">百家乐</th>
          </tr>
          <tr>
            <th>正码一</th>
            <th>正码二</th>
            <th>正码三</th>
            <th>正码四</th>
            <th>正码五</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td :style="{color:getColors(it.sangong)}">{{it.sangong}}</td>
            <td :style="{color:getColors(it.niuniu)}">{{it.niuniu}}</td>
            <td :style="{color:getColors(it.suoha)}">{{it.suoha}}</td>
            <td :style="{color:getColors(it.baijiale)}">{{it.baijiale}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Tjssc'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="5">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总单双</th>
            <th rowspan="2">总大小</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th colspan="2">第四球</th>
            <th colspan="2">第五球</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>第四球</th>
            <th>第五球</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_oddoreven)}">{{it.sum_oddoreven}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.num1_oddoreven)}">{{it.num1_oddoreven}}</td>
            <td :style="{color:getColors(it.num1_overorunder)}">{{it.num1_overorunder}}</td>
            <td :style="{color:getColors(it.num2_oddoreven)}">{{it.num2_oddoreven}}</td>
            <td :style="{color:getColors(it.num2_overorunder)}">{{it.num2_overorunder}}</td>
            <td :style="{color:getColors(it.num3_oddoreven)}">{{it.num3_oddoreven}}</td>
            <td :style="{color:getColors(it.num3_overorunder)}">{{it.num3_overorunder}}</td>
            <td :style="{color:getColors(it.num4_oddoreven)}">{{it.num4_oddoreven}}</td>
            <td :style="{color:getColors(it.num4_overorunder)}">{{it.num4_overorunder}}</td>
            <td :style="{color:getColors(it.num5_oddoreven)}">{{it.num5_oddoreven}}</td>
            <td :style="{color:getColors(it.num5_overorunder)}">{{it.num5_overorunder}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='longhudou'" v-if="tempParam.typeName=='Tjssc'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="7">彩球号码</th>
            <th colspan="10">龙虎斗</th>
          </tr>
          <tr>
            <th>正码一</th>
            <th>正码二</th>
            <th>正码三</th>
            <th>正码四</th>
            <th>正码五</th>
            <th>1v2</th>
            <th>1v3</th>
            <th>1v4</th>
            <th>1v5</th>
            <th>2v3</th>
            <th>2v4</th>
            <th>2v5</th>
            <th>3v4</th>
            <th>3v5</th>
            <th>4v5</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td :style="{color:getColors(it.n1vsn2)}">{{it.n1vsn2}}</td>
            <td :style="{color:getColors(it.n1vsn3)}">{{it.n1vsn3}}</td>
            <td :style="{color:getColors(it.n1vsn4)}">{{it.n1vsn4}}</td>
            <td :style="{color:getColors(it.n1vsn5)}">{{it.n1vsn5}}</td>
            <td :style="{color:getColors(it.n2vsn3)}">{{it.n2vsn3}}</td>
            <td :style="{color:getColors(it.n2vsn4)}">{{it.n2vsn4}}</td>
            <td :style="{color:getColors(it.n2vsn5)}">{{it.n2vsn5}}</td>
            <td :style="{color:getColors(it.n3vsn4)}">{{it.n3vsn4}}</td>
            <td :style="{color:getColors(it.n3vsn5)}">{{it.n3vsn5}}</td>
            <td :style="{color:getColors(it.n4vsn5)}">{{it.n4vsn5}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='qipai'" v-if="tempParam.typeName=='Tjssc'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="5">彩球号码</th>
            <th rowspan="2">三公</th>
            <th rowspan="2">牛牛</th>
            <th rowspan="2">梭哈</th>
            <th rowspan="2">百家乐</th>
          </tr>
          <tr>
            <th>正码一</th>
            <th>正码二</th>
            <th>正码三</th>
            <th>正码四</th>
            <th>正码五</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td :style="{color:getColors(it.sangong)}">{{it.sangong}}</td>
            <td :style="{color:getColors(it.niuniu)}">{{it.niuniu}}</td>
            <td :style="{color:getColors(it.suoha)}">{{it.suoha}}</td>
            <td :style="{color:getColors(it.baijiale)}">{{it.baijiale}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Xjssc'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="5">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总单双</th>
            <th rowspan="2">总大小</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th colspan="2">第四球</th>
            <th colspan="2">第五球</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>第四球</th>
            <th>第五球</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_oddoreven)}">{{it.sum_oddoreven}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.num1_oddoreven)}">{{it.num1_oddoreven}}</td>
            <td :style="{color:getColors(it.num1_overorunder)}">{{it.num1_overorunder}}</td>
            <td :style="{color:getColors(it.num2_oddoreven)}">{{it.num2_oddoreven}}</td>
            <td :style="{color:getColors(it.num2_overorunder)}">{{it.num2_overorunder}}</td>
            <td :style="{color:getColors(it.num3_oddoreven)}">{{it.num3_oddoreven}}</td>
            <td :style="{color:getColors(it.num3_overorunder)}">{{it.num3_overorunder}}</td>
            <td :style="{color:getColors(it.num4_oddoreven)}">{{it.num4_oddoreven}}</td>
            <td :style="{color:getColors(it.num4_overorunder)}">{{it.num4_overorunder}}</td>
            <td :style="{color:getColors(it.num5_oddoreven)}">{{it.num5_oddoreven}}</td>
            <td :style="{color:getColors(it.num5_overorunder)}">{{it.num5_overorunder}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='longhudou'" v-if="tempParam.typeName=='Xjssc'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="7">彩球号码</th>
            <th colspan="10">龙虎斗</th>
          </tr>
          <tr>
            <th>正码一</th>
            <th>正码二</th>
            <th>正码三</th>
            <th>正码四</th>
            <th>正码五</th>
            <th>1v2</th>
            <th>1v3</th>
            <th>1v4</th>
            <th>1v5</th>
            <th>2v3</th>
            <th>2v4</th>
            <th>2v5</th>
            <th>3v4</th>
            <th>3v5</th>
            <th>4v5</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td :style="{color:getColors(it.n1vsn2)}">{{it.n1vsn2}}</td>
            <td :style="{color:getColors(it.n1vsn3)}">{{it.n1vsn3}}</td>
            <td :style="{color:getColors(it.n1vsn4)}">{{it.n1vsn4}}</td>
            <td :style="{color:getColors(it.n1vsn5)}">{{it.n1vsn5}}</td>
            <td :style="{color:getColors(it.n2vsn3)}">{{it.n2vsn3}}</td>
            <td :style="{color:getColors(it.n2vsn4)}">{{it.n2vsn4}}</td>
            <td :style="{color:getColors(it.n2vsn5)}">{{it.n2vsn5}}</td>
            <td :style="{color:getColors(it.n3vsn4)}">{{it.n3vsn4}}</td>
            <td :style="{color:getColors(it.n3vsn5)}">{{it.n3vsn5}}</td>
            <td :style="{color:getColors(it.n4vsn5)}">{{it.n4vsn5}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='qipai'" v-if="tempParam.typeName=='Xjssc'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="5">彩球号码</th>
            <th rowspan="2">三公</th>
            <th rowspan="2">牛牛</th>
            <th rowspan="2">梭哈</th>
            <th rowspan="2">百家乐</th>
          </tr>
          <tr>
            <th>正码一</th>
            <th>正码二</th>
            <th>正码三</th>
            <th>正码四</th>
            <th>正码五</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td :style="{color:getColors(it.sangong)}">{{it.sangong}}</td>
            <td :style="{color:getColors(it.niuniu)}">{{it.niuniu}}</td>
            <td :style="{color:getColors(it.suoha)}">{{it.suoha}}</td>
            <td :style="{color:getColors(it.baijiale)}">{{it.baijiale}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Gdklsf'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="8">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总单双</th>
            <th rowspan="2">总大小</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th colspan="2">第四球</th>
            <th colspan="2">第五球</th>
            <th colspan="2">第六球</th>
            <th colspan="2">第七球</th>
            <th colspan="2">第八球</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>第四球</th>
            <th>第五球</th>
            <th>第六球</th>
            <th>第七球</th>
            <th>第八球</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num6}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num7}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num8}}
              </div>
            </td>

            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_oddoreven)}">{{it.sum_oddoreven}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.num1_oddoreven)}">{{it.num1_oddoreven}}</td>
            <td :style="{color:getColors(it.num1_overorunder)}">{{it.num1_overorunder}}</td>
            <td :style="{color:getColors(it.num2_oddoreven)}">{{it.num2_oddoreven}}</td>
            <td :style="{color:getColors(it.num2_overorunder)}">{{it.num2_overorunder}}</td>
            <td :style="{color:getColors(it.num3_oddoreven)}">{{it.num3_oddoreven}}</td>
            <td :style="{color:getColors(it.num3_overorunder)}">{{it.num3_overorunder}}</td>
            <td :style="{color:getColors(it.num4_oddoreven)}">{{it.num4_oddoreven}}</td>
            <td :style="{color:getColors(it.num4_overorunder)}">{{it.num4_overorunder}}</td>
            <td :style="{color:getColors(it.num5_oddoreven)}">{{it.num5_oddoreven}}</td>
            <td :style="{color:getColors(it.num5_overorunder)}">{{it.num5_overorunder}}</td>
            <td :style="{color:getColors(it.num6_oddoreven)}">{{it.num6_oddoreven}}</td>
            <td :style="{color:getColors(it.num6_overorunder)}">{{it.num6_overorunder}}</td>
            <td :style="{color:getColors(it.num7_oddoreven)}">{{it.num7_oddoreven}}</td>
            <td :style="{color:getColors(it.num7_overorunder)}">{{it.num7_overorunder}}</td>
            <td :style="{color:getColors(it.num8_oddoreven)}">{{it.num8_oddoreven}}</td>
            <td :style="{color:getColors(it.num8_overorunder)}">{{it.num8_overorunder}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='pos_and_zfb'" v-if="tempParam.typeName=='Gdklsf'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="8">球号</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th colspan="2">第四球</th>
            <th colspan="2">第五球</th>
            <th colspan="2">第六球</th>
            <th colspan="2">第七球</th>
            <th colspan="2">第八球</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>第四球</th>
            <th>第五球</th>
            <th>第六球</th>
            <th>第七球</th>
            <th>第八球</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num6}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num7}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num8}}
              </div>
            </td>
            <td :style="{color:getColors(it.num1_zhongfabai)}">{{it.num1_zhongfabai}}</td>
            <td :style="{color:getColors(it.num1_position)}">{{it.num1_position}}</td>
            <td :style="{color:getColors(it.num2_zhongfabai)}">{{it.num2_zhongfabai}}</td>
            <td :style="{color:getColors(it.num2_position)}">{{it.num2_position}}</td>
            <td :style="{color:getColors(it.num3_zhongfabai)}">{{it.num3_zhongfabai}}</td>
            <td :style="{color:getColors(it.num3_position)}">{{it.num3_position}}</td>
            <td :style="{color:getColors(it.num4_zhongfabai)}">{{it.num4_zhongfabai}}</td>
            <td :style="{color:getColors(it.num4_position)}">{{it.num4_position}}</td>
            <td :style="{color:getColors(it.num5_zhongfabai)}">{{it.num5_zhongfabai}}</td>
            <td :style="{color:getColors(it.num5_position)}">{{it.num5_position}}</td>
            <td :style="{color:getColors(it.num6_zhongfabai)}">{{it.num6_zhongfabai}}</td>
            <td :style="{color:getColors(it.num6_position)}">{{it.num6_position}}</td>
            <td :style="{color:getColors(it.num7_zhongfabai)}">{{it.num7_zhongfabai}}</td>
            <td :style="{color:getColors(it.num7_position)}">{{it.num7_position}}</td>
            <td :style="{color:getColors(it.num8_zhongfabai)}">{{it.num8_zhongfabai}}</td>
            <td :style="{color:getColors(it.num8_position)}">{{it.num8_position}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Cqklsf'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="8">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总单双</th>
            <th rowspan="2">总大小</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th colspan="2">第四球</th>
            <th colspan="2">第五球</th>
            <th colspan="2">第六球</th>
            <th colspan="2">第七球</th>
            <th colspan="2">第八球</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>第四球</th>
            <th>第五球</th>
            <th>第六球</th>
            <th>第七球</th>
            <th>第八球</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num6}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num7}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num8}}
              </div>
            </td>

            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_oddoreven)}">{{it.sum_oddoreven}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.num1_oddoreven)}">{{it.num1_oddoreven}}</td>
            <td :style="{color:getColors(it.num1_overorunder)}">{{it.num1_overorunder}}</td>
            <td :style="{color:getColors(it.num2_oddoreven)}">{{it.num2_oddoreven}}</td>
            <td :style="{color:getColors(it.num2_overorunder)}">{{it.num2_overorunder}}</td>
            <td :style="{color:getColors(it.num3_oddoreven)}">{{it.num3_oddoreven}}</td>
            <td :style="{color:getColors(it.num3_overorunder)}">{{it.num3_overorunder}}</td>
            <td :style="{color:getColors(it.num4_oddoreven)}">{{it.num4_oddoreven}}</td>
            <td :style="{color:getColors(it.num4_overorunder)}">{{it.num4_overorunder}}</td>
            <td :style="{color:getColors(it.num5_oddoreven)}">{{it.num5_oddoreven}}</td>
            <td :style="{color:getColors(it.num5_overorunder)}">{{it.num5_overorunder}}</td>
            <td :style="{color:getColors(it.num6_oddoreven)}">{{it.num6_oddoreven}}</td>
            <td :style="{color:getColors(it.num6_overorunder)}">{{it.num6_overorunder}}</td>
            <td :style="{color:getColors(it.num7_oddoreven)}">{{it.num7_oddoreven}}</td>
            <td :style="{color:getColors(it.num7_overorunder)}">{{it.num7_overorunder}}</td>
            <td :style="{color:getColors(it.num8_oddoreven)}">{{it.num8_oddoreven}}</td>
            <td :style="{color:getColors(it.num8_overorunder)}">{{it.num8_overorunder}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='pos_and_zfb'" v-if="tempParam.typeName=='Cqklsf'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="8">球号</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th colspan="2">第四球</th>
            <th colspan="2">第五球</th>
            <th colspan="2">第六球</th>
            <th colspan="2">第七球</th>
            <th colspan="2">第八球</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>第四球</th>
            <th>第五球</th>
            <th>第六球</th>
            <th>第七球</th>
            <th>第八球</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num6}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num7}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num8}}
              </div>
            </td>
            <td :style="{color:getColors(it.num1_zhongfabai)}">{{it.num1_zhongfabai}}</td>
            <td :style="{color:getColors(it.num1_position)}">{{it.num1_position}}</td>
            <td :style="{color:getColors(it.num2_zhongfabai)}">{{it.num2_zhongfabai}}</td>
            <td :style="{color:getColors(it.num2_position)}">{{it.num2_position}}</td>
            <td :style="{color:getColors(it.num3_zhongfabai)}">{{it.num3_zhongfabai}}</td>
            <td :style="{color:getColors(it.num3_position)}">{{it.num3_position}}</td>
            <td :style="{color:getColors(it.num4_zhongfabai)}">{{it.num4_zhongfabai}}</td>
            <td :style="{color:getColors(it.num4_position)}">{{it.num4_position}}</td>
            <td :style="{color:getColors(it.num5_zhongfabai)}">{{it.num5_zhongfabai}}</td>
            <td :style="{color:getColors(it.num5_position)}">{{it.num5_position}}</td>
            <td :style="{color:getColors(it.num6_zhongfabai)}">{{it.num6_zhongfabai}}</td>
            <td :style="{color:getColors(it.num6_position)}">{{it.num6_position}}</td>
            <td :style="{color:getColors(it.num7_zhongfabai)}">{{it.num7_zhongfabai}}</td>
            <td :style="{color:getColors(it.num7_position)}">{{it.num7_position}}</td>
            <td :style="{color:getColors(it.num8_zhongfabai)}">{{it.num8_zhongfabai}}</td>
            <td :style="{color:getColors(it.num8_position)}">{{it.num8_position}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Tjklsf'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="8">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总单双</th>
            <th rowspan="2">总大小</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th colspan="2">第四球</th>
            <th colspan="2">第五球</th>
            <th colspan="2">第六球</th>
            <th colspan="2">第七球</th>
            <th colspan="2">第八球</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>第四球</th>
            <th>第五球</th>
            <th>第六球</th>
            <th>第七球</th>
            <th>第八球</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num6}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num7}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num8}}
              </div>
            </td>

            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_oddoreven)}">{{it.sum_oddoreven}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.num1_oddoreven)}">{{it.num1_oddoreven}}</td>
            <td :style="{color:getColors(it.num1_overorunder)}">{{it.num1_overorunder}}</td>
            <td :style="{color:getColors(it.num2_oddoreven)}">{{it.num2_oddoreven}}</td>
            <td :style="{color:getColors(it.num2_overorunder)}">{{it.num2_overorunder}}</td>
            <td :style="{color:getColors(it.num3_oddoreven)}">{{it.num3_oddoreven}}</td>
            <td :style="{color:getColors(it.num3_overorunder)}">{{it.num3_overorunder}}</td>
            <td :style="{color:getColors(it.num4_oddoreven)}">{{it.num4_oddoreven}}</td>
            <td :style="{color:getColors(it.num4_overorunder)}">{{it.num4_overorunder}}</td>
            <td :style="{color:getColors(it.num5_oddoreven)}">{{it.num5_oddoreven}}</td>
            <td :style="{color:getColors(it.num5_overorunder)}">{{it.num5_overorunder}}</td>
            <td :style="{color:getColors(it.num6_oddoreven)}">{{it.num6_oddoreven}}</td>
            <td :style="{color:getColors(it.num6_overorunder)}">{{it.num6_overorunder}}</td>
            <td :style="{color:getColors(it.num7_oddoreven)}">{{it.num7_oddoreven}}</td>
            <td :style="{color:getColors(it.num7_overorunder)}">{{it.num7_overorunder}}</td>
            <td :style="{color:getColors(it.num8_oddoreven)}">{{it.num8_oddoreven}}</td>
            <td :style="{color:getColors(it.num8_overorunder)}">{{it.num8_overorunder}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='pos_and_zfb'" v-if="tempParam.typeName=='Tjklsf'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="8">球号</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th colspan="2">第四球</th>
            <th colspan="2">第五球</th>
            <th colspan="2">第六球</th>
            <th colspan="2">第七球</th>
            <th colspan="2">第八球</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>第四球</th>
            <th>第五球</th>
            <th>第六球</th>
            <th>第七球</th>
            <th>第八球</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num6}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num7}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num8}}
              </div>
            </td>
            <td :style="{color:getColors(it.num1_zhongfabai)}">{{it.num1_zhongfabai}}</td>
            <td :style="{color:getColors(it.num1_position)}">{{it.num1_position}}</td>
            <td :style="{color:getColors(it.num2_zhongfabai)}">{{it.num2_zhongfabai}}</td>
            <td :style="{color:getColors(it.num2_position)}">{{it.num2_position}}</td>
            <td :style="{color:getColors(it.num3_zhongfabai)}">{{it.num3_zhongfabai}}</td>
            <td :style="{color:getColors(it.num3_position)}">{{it.num3_position}}</td>
            <td :style="{color:getColors(it.num4_zhongfabai)}">{{it.num4_zhongfabai}}</td>
            <td :style="{color:getColors(it.num4_position)}">{{it.num4_position}}</td>
            <td :style="{color:getColors(it.num5_zhongfabai)}">{{it.num5_zhongfabai}}</td>
            <td :style="{color:getColors(it.num5_position)}">{{it.num5_position}}</td>
            <td :style="{color:getColors(it.num6_zhongfabai)}">{{it.num6_zhongfabai}}</td>
            <td :style="{color:getColors(it.num6_position)}">{{it.num6_position}}</td>
            <td :style="{color:getColors(it.num7_zhongfabai)}">{{it.num7_zhongfabai}}</td>
            <td :style="{color:getColors(it.num7_position)}">{{it.num7_position}}</td>
            <td :style="{color:getColors(it.num8_zhongfabai)}">{{it.num8_zhongfabai}}</td>
            <td :style="{color:getColors(it.num8_position)}">{{it.num8_position}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Hnklsf'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="8">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总单双</th>
            <th rowspan="2">总大小</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th colspan="2">第四球</th>
            <th colspan="2">第五球</th>
            <th colspan="2">第六球</th>
            <th colspan="2">第七球</th>
            <th colspan="2">第八球</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>第四球</th>
            <th>第五球</th>
            <th>第六球</th>
            <th>第七球</th>
            <th>第八球</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num6}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num7}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num8}}
              </div>
            </td>

            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_oddoreven)}">{{it.sum_oddoreven}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.num1_oddoreven)}">{{it.num1_oddoreven}}</td>
            <td :style="{color:getColors(it.num1_overorunder)}">{{it.num1_overorunder}}</td>
            <td :style="{color:getColors(it.num2_oddoreven)}">{{it.num2_oddoreven}}</td>
            <td :style="{color:getColors(it.num2_overorunder)}">{{it.num2_overorunder}}</td>
            <td :style="{color:getColors(it.num3_oddoreven)}">{{it.num3_oddoreven}}</td>
            <td :style="{color:getColors(it.num3_overorunder)}">{{it.num3_overorunder}}</td>
            <td :style="{color:getColors(it.num4_oddoreven)}">{{it.num4_oddoreven}}</td>
            <td :style="{color:getColors(it.num4_overorunder)}">{{it.num4_overorunder}}</td>
            <td :style="{color:getColors(it.num5_oddoreven)}">{{it.num5_oddoreven}}</td>
            <td :style="{color:getColors(it.num5_overorunder)}">{{it.num5_overorunder}}</td>
            <td :style="{color:getColors(it.num6_oddoreven)}">{{it.num6_oddoreven}}</td>
            <td :style="{color:getColors(it.num6_overorunder)}">{{it.num6_overorunder}}</td>
            <td :style="{color:getColors(it.num7_oddoreven)}">{{it.num7_oddoreven}}</td>
            <td :style="{color:getColors(it.num7_overorunder)}">{{it.num7_overorunder}}</td>
            <td :style="{color:getColors(it.num8_oddoreven)}">{{it.num8_oddoreven}}</td>
            <td :style="{color:getColors(it.num8_overorunder)}">{{it.num8_overorunder}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='pos_and_zfb'" v-if="tempParam.typeName=='Hnklsf'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="8">球号</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th colspan="2">第四球</th>
            <th colspan="2">第五球</th>
            <th colspan="2">第六球</th>
            <th colspan="2">第七球</th>
            <th colspan="2">第八球</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>第四球</th>
            <th>第五球</th>
            <th>第六球</th>
            <th>第七球</th>
            <th>第八球</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
            <th>中发白</th>
            <th>方位</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num6}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num7}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num8}}
              </div>
            </td>
            <td :style="{color:getColors(it.num1_zhongfabai)}">{{it.num1_zhongfabai}}</td>
            <td :style="{color:getColors(it.num1_position)}">{{it.num1_position}}</td>
            <td :style="{color:getColors(it.num2_zhongfabai)}">{{it.num2_zhongfabai}}</td>
            <td :style="{color:getColors(it.num2_position)}">{{it.num2_position}}</td>
            <td :style="{color:getColors(it.num3_zhongfabai)}">{{it.num3_zhongfabai}}</td>
            <td :style="{color:getColors(it.num3_position)}">{{it.num3_position}}</td>
            <td :style="{color:getColors(it.num4_zhongfabai)}">{{it.num4_zhongfabai}}</td>
            <td :style="{color:getColors(it.num4_position)}">{{it.num4_position}}</td>
            <td :style="{color:getColors(it.num5_zhongfabai)}">{{it.num5_zhongfabai}}</td>
            <td :style="{color:getColors(it.num5_position)}">{{it.num5_position}}</td>
            <td :style="{color:getColors(it.num6_zhongfabai)}">{{it.num6_zhongfabai}}</td>
            <td :style="{color:getColors(it.num6_position)}">{{it.num6_position}}</td>
            <td :style="{color:getColors(it.num7_zhongfabai)}">{{it.num7_zhongfabai}}</td>
            <td :style="{color:getColors(it.num7_position)}">{{it.num7_position}}</td>
            <td :style="{color:getColors(it.num8_zhongfabai)}">{{it.num8_zhongfabai}}</td>
            <td :style="{color:getColors(it.num8_position)}">{{it.num8_position}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Gd11x5'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="5">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总单双</th>
            <th rowspan="2">总大小</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th colspan="2">第四球</th>
            <th colspan="2">第五球</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>第四球</th>
            <th>第五球</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_oddoreven)}">{{it.sum_oddoreven}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.num1_oddoreven)}">{{it.num1_oddoreven}}</td>
            <td :style="{color:getColors(it.num1_overorunder)}">{{it.num1_overorunder}}</td>
            <td :style="{color:getColors(it.num2_oddoreven)}">{{it.num2_oddoreven}}</td>
            <td :style="{color:getColors(it.num2_overorunder)}">{{it.num2_overorunder}}</td>
            <td :style="{color:getColors(it.num3_oddoreven)}">{{it.num3_oddoreven}}</td>
            <td :style="{color:getColors(it.num3_overorunder)}">{{it.num3_overorunder}}</td>
            <td :style="{color:getColors(it.num4_oddoreven)}">{{it.num4_oddoreven}}</td>
            <td :style="{color:getColors(it.num4_overorunder)}">{{it.num4_overorunder}}</td>
            <td :style="{color:getColors(it.num5_oddoreven)}">{{it.num5_oddoreven}}</td>
            <td :style="{color:getColors(it.num5_overorunder)}">{{it.num5_overorunder}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Bjkl8'">
          <tr>
            <th>期数</th>
            <th>开奖时间</th>
            <th>总和</th>
            <th>总单双</th>
            <th>总大小</th>
            <th>总和过关</th>
            <th>前后和</th>
            <th>单双和</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_oddoreven)}">{{it.sum_oddoreven}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.sum_oddorevenandoverorunder)}">{{it.sum_oddorevenandoverorunder}}</td>
            <td :style="{color:getColors(it.frontorback_more)}">{{it.frontorback_more}}</td>
            <td :style="{color:getColors(it.oddoreven_more)}">{{it.oddoreven_more}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='paiming'" v-if="tempParam.typeName=='Bjpk10'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="10">车号</th>
            <th rowspan="2">冠亚和值</th>
            <th rowspan="2">冠亚和值单双</th>
            <th rowspan="2">冠亚和值大小</th>
          </tr>
          <tr>
            <th>冠军</th>
            <th>亚军</th>
            <th>季军</th>
            <th>第四名</th>
            <th>第五名</th>
            <th>第六名</th>
            <th>第七名</th>
            <th>第八名</th>
            <th>第九名</th>
            <th>第十名</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num1]}">{{it.num1}}
              </div>
            </td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num2]}">{{it.num2}}
              </div>
            </td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num3]}">{{it.num3}}
              </div>
            </td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num4]}">{{it.num4}}
              </div>
            </td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num5]}">{{it.num5}}
              </div>
            </td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num6]}">{{it.num6}}
              </div>
            </td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num7]}">{{it.num7}}
              </div>
            </td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num8]}">{{it.num8}}
              </div>
            </td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num9]}">{{it.num9}}
              </div>
            </td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num10]}">{{it.num10}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_oddoreven)}">{{it.sum_oddoreven}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Bjpk10'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="4">冠军</th>
            <th colspan="4">亚军</th>
            <th colspan="4">季军</th>
            <th colspan="4">第四名</th>
            <th colspan="4">第五名</th>
            <th colspan="3">第六名</th>
            <th colspan="3">第七名</th>
            <th colspan="3">第八名</th>
            <th colspan="3">第九名</th>
            <th colspan="3">第十名</th>
          </tr>
          <tr>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>龙虎</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>龙虎</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>龙虎</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>龙虎</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>龙虎</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num1]}">{{it.num1}}
              </div>
            </td>
            <td :style="{color:getColors(it.num1_oddoreven)}">{{it.num1_oddoreven}}</td>
            <td :style="{color:getColors(it.num1_overorunder)}">{{it.num1_overorunder}}</td>
            <td :style="{color:getColors(it.num1_longorhu)}">{{it.num1_longorhu}}</td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num2]}">{{it.num2}}
              </div>
            </td>
            <td :style="{color:getColors(it.num2_oddoreven)}">{{it.num2_oddoreven}}</td>
            <td :style="{color:getColors(it.num2_overorunder)}">{{it.num2_overorunder}}</td>
            <td :style="{color:getColors(it.num2_longorhu)}">{{it.num2_longorhu}}</td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num3]}">{{it.num3}}
              </div>
            </td>
            <td :style="{color:getColors(it.num3_oddoreven)}">{{it.num3_oddoreven}}</td>
            <td :style="{color:getColors(it.num3_overorunder)}">{{it.num3_overorunder}}</td>
            <td :style="{color:getColors(it.num3_longorhu)}">{{it.num3_longorhu}}</td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num4]}">{{it.num4}}
              </div>
            </td>
            <td :style="{color:getColors(it.num4_oddoreven)}">{{it.num4_oddoreven}}</td>
            <td :style="{color:getColors(it.num4_overorunder)}">{{it.num4_overorunder}}</td>
            <td :style="{color:getColors(it.num4_longorhu)}">{{it.num4_longorhu}}</td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num5]}">{{it.num5}}
              </div>
            </td>
            <td :style="{color:getColors(it.num5_oddoreven)}">{{it.num5_oddoreven}}</td>
            <td :style="{color:getColors(it.num5_overorunder)}">{{it.num5_overorunder}}</td>
            <td :style="{color:getColors(it.num5_longorhu)}">{{it.num5_longorhu}}</td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num6]}">{{it.num6}}
              </div>
            </td>
            <td :style="{color:getColors(it.num6_oddoreven)}">{{it.num6_oddoreven}}</td>
            <td :style="{color:getColors(it.num6_overorunder)}">{{it.num6_overorunder}}</td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num7]}">{{it.num7}}
              </div>
            </td>
            <td :style="{color:getColors(it.num7_oddoreven)}">{{it.num7_oddoreven}}</td>
            <td :style="{color:getColors(it.num7_overorunder)}">{{it.num7_overorunder}}</td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num8]}">{{it.num8}}
              </div>
            </td>
            <td :style="{color:getColors(it.num8_oddoreven)}">{{it.num8_oddoreven}}</td>
            <td :style="{color:getColors(it.num8_overorunder)}">{{it.num8_overorunder}}</td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num9]}">{{it.num9}}
              </div>
            </td>
            <td :style="{color:getColors(it.num9_oddoreven)}">{{it.num9_oddoreven}}</td>
            <td :style="{color:getColors(it.num9_overorunder)}">{{it.num9_overorunder}}</td>
            <td>
              <div class="car icon-c1" :style="{color:car_colors[it.num10]}">{{it.num10}}
              </div>
            </td>
            <td :style="{color:getColors(it.num10_oddoreven)}">{{it.num10_oddoreven}}</td>
            <td :style="{color:getColors(it.num10_overorunder)}">{{it.num10_overorunder}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='paiming'" v-if="tempParam.typeName=='Xyft'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="10">车号</th>
            <th rowspan="2">冠亚和值</th>
            <th rowspan="2">冠亚和值单双</th>
            <th rowspan="2">冠亚和值大小</th>
          </tr>
          <tr>
            <th>冠军</th>
            <th>亚军</th>
            <th>季军</th>
            <th>第四名</th>
            <th>第五名</th>
            <th>第六名</th>
            <th>第七名</th>
            <th>第八名</th>
            <th>第九名</th>
            <th>第十名</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num6}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num7}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num8}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num9}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num10}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_oddoreven)}">{{it.sum_oddoreven}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Xyft'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="4">冠军</th>
            <th colspan="4">亚军</th>
            <th colspan="4">季军</th>
            <th colspan="4">第四名</th>
            <th colspan="4">第五名</th>
            <th colspan="3">第六名</th>
            <th colspan="3">第七名</th>
            <th colspan="3">第八名</th>
            <th colspan="3">第九名</th>
            <th colspan="3">第十名</th>
          </tr>
          <tr>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>龙虎</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>龙虎</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>龙虎</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>龙虎</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>龙虎</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>车号</th>
            <th>大小</th>
            <th>单双</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
            <th>车号</th>
            <th>单双</th>
            <th>大小</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td :style="{color:getColors(it.num1)}">{{it.num1}}</td>
            <td :style="{color:getColors(it.num1_oddoreven)}">{{it.num1_oddoreven}}</td>
            <td :style="{color:getColors(it.num1_overorunder)}">{{it.num1_overorunder}}</td>
            <td :style="{color:getColors(it.num1_longorhu)}">{{it.num1_longorhu}}</td>
            <td :style="{color:getColors(it.num2)}">{{it.num2}}</td>
            <td :style="{color:getColors(it.num2_oddoreven)}">{{it.num2_oddoreven}}</td>
            <td :style="{color:getColors(it.num2_overorunder)}">{{it.num2_overorunder}}</td>
            <td :style="{color:getColors(it.num2_longorhu)}">{{it.num2_longorhu}}</td>
            <td :style="{color:getColors(it.num3)}">{{it.num3}}</td>
            <td :style="{color:getColors(it.num3_oddoreven)}">{{it.num3_oddoreven}}</td>
            <td :style="{color:getColors(it.num3_overorunder)}">{{it.num3_overorunder}}</td>
            <td :style="{color:getColors(it.num3_longorhu)}">{{it.num3_longorhu}}</td>
            <td :style="{color:getColors(it.num4)}">{{it.num4}}</td>
            <td :style="{color:getColors(it.num4_oddoreven)}">{{it.num4_oddoreven}}</td>
            <td :style="{color:getColors(it.num4_overorunder)}">{{it.num4_overorunder}}</td>
            <td :style="{color:getColors(it.num4_longorhu)}">{{it.num4_longorhu}}</td>
            <td :style="{color:getColors(it.num5)}">{{it.num5}}</td>
            <td :style="{color:getColors(it.num5_oddoreven)}">{{it.num5_oddoreven}}</td>
            <td :style="{color:getColors(it.num5_overorunder)}">{{it.num5_overorunder}}</td>
            <td :style="{color:getColors(it.num5_longorhu)}">{{it.num5_longorhu}}</td>
            <td :style="{color:getColors(it.num6)}">{{it.num6}}</td>
            <td :style="{color:getColors(it.num6_oddoreven)}">{{it.num6_oddoreven}}</td>
            <td :style="{color:getColors(it.num6_overorunder)}">{{it.num6_overorunder}}</td>
            <td :style="{color:getColors(it.num7)}">{{it.num7}}</td>
            <td :style="{color:getColors(it.num7_oddoreven)}">{{it.num7_oddoreven}}</td>
            <td :style="{color:getColors(it.num7_overorunder)}">{{it.num7_overorunder}}</td>
            <td :style="{color:getColors(it.num8)}">{{it.num8}}</td>
            <td :style="{color:getColors(it.num8_oddoreven)}">{{it.num8_oddoreven}}</td>
            <td :style="{color:getColors(it.num8_overorunder)}">{{it.num8_overorunder}}</td>
            <td :style="{color:getColors(it.num9)}">{{it.num9}}</td>
            <td :style="{color:getColors(it.num9_oddoreven)}">{{it.num9_oddoreven}}</td>
            <td :style="{color:getColors(it.num9_overorunder)}">{{it.num9_overorunder}}</td>
            <td :style="{color:getColors(it.num10)}">{{it.num10}}</td>
            <td :style="{color:getColors(it.num10_oddoreven)}">{{it.num10_oddoreven}}</td>
            <td :style="{color:getColors(it.num10_overorunder)}">{{it.num10_overorunder}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Fc3d'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="3">彩球号码</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th rowspan="2">龙虎和</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td :style="{color:getColors(it.num1_overorunder)}">{{it.num1_overorunder}}</td>
            <td :style="{color:getColors(it.num1_oddoreven)}">{{it.num1_oddoreven}}</td>
            <td :style="{color:getColors(it.num2_overorunder)}">{{it.num2_overorunder}}</td>
            <td :style="{color:getColors(it.num2_oddoreven)}">{{it.num2_oddoreven}}</td>
            <td :style="{color:getColors(it.num3_overorunder)}">{{it.num3_overorunder}}</td>
            <td :style="{color:getColors(it.num3_oddoreven)}">{{it.num3_oddoreven}}</td>
            <td>{{it.longorhu}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Tcpl3'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="3">彩球号码</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th rowspan="2">龙虎和</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td :style="{color:getColors(it.num1_overorunder)}">{{it.num1_overorunder}}</td>
            <td :style="{color:getColors(it.num1_oddoreven)}">{{it.num1_oddoreven}}</td>
            <td :style="{color:getColors(it.num2_overorunder)}">{{it.num2_overorunder}}</td>
            <td :style="{color:getColors(it.num2_oddoreven)}">{{it.num2_oddoreven}}</td>
            <td :style="{color:getColors(it.num3_overorunder)}">{{it.num3_overorunder}}</td>
            <td :style="{color:getColors(it.num3_oddoreven)}">{{it.num3_oddoreven}}</td>
            <td>{{it.longorhu}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Shssl'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="3">彩球号码</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th rowspan="2">龙虎和</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td :style="{color:getColors(it.num1_overorunder)}">{{it.num1_overorunder}}</td>
            <td :style="{color:getColors(it.num1_oddoreven)}">{{it.num1_oddoreven}}</td>
            <td :style="{color:getColors(it.num2_overorunder)}">{{it.num2_overorunder}}</td>
            <td :style="{color:getColors(it.num2_oddoreven)}">{{it.num2_oddoreven}}</td>
            <td :style="{color:getColors(it.num3_overorunder)}">{{it.num3_overorunder}}</td>
            <td :style="{color:getColors(it.num3_oddoreven)}">{{it.num3_oddoreven}}</td>
            <td>{{it.longorhu}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Bj28'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="3">彩球号码</th>
            <th rowspan="2">和</th>
            <th rowspan="2">大小</th>
            <th rowspan="2">单双</th>
            <th rowspan="2">大小单双</th>
            <th rowspan="2">极大小</th>
            <th rowspan="2">波色</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.daxiao)}">{{it.daxiao}}</td>
            <td :style="{color:getColors(it.danshuang)}">{{it.danshuang}}</td>
            <td :style="{color:getColors(it.daxiaodanshuang)}">{{it.daxiaodanshuang}}</td>
            <td :style="{color:getColors(it.jidaxiao)}">{{it.jidaxiao}}</td>
            <td :style="{color:colors[it.color]}">{{it.bose}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Gxklsf'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="5">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总单双</th>
            <th rowspan="2">总大小</th>
            <th colspan="2">第一球</th>
            <th colspan="2">第二球</th>
            <th colspan="2">第三球</th>
            <th colspan="2">第四球</th>
            <th colspan="2">第五球</th>
          </tr>
          <tr>
            <th>第一球</th>
            <th>第二球</th>
            <th>第三球</th>
            <th>第四球</th>
            <th>第五球</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num4}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num5}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_oddoreven)}">{{it.sum_oddoreven}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.num1_oddoreven)}">{{it.num1_oddoreven}}</td>
            <td :style="{color:getColors(it.num1_overorunder)}">{{it.num1_overorunder}}</td>
            <td :style="{color:getColors(it.num2_oddoreven)}">{{it.num2_oddoreven}}</td>
            <td :style="{color:getColors(it.num2_overorunder)}">{{it.num2_overorunder}}</td>
            <td :style="{color:getColors(it.num3_oddoreven)}">{{it.num3_oddoreven}}</td>
            <td :style="{color:getColors(it.num3_overorunder)}">{{it.num3_overorunder}}</td>
            <td :style="{color:getColors(it.num4_oddoreven)}">{{it.num4_oddoreven}}</td>
            <td :style="{color:getColors(it.num4_overorunder)}">{{it.num4_overorunder}}</td>
            <td :style="{color:getColors(it.num5_oddoreven)}">{{it.num5_oddoreven}}</td>
            <td :style="{color:getColors(it.num5_overorunder)}">{{it.num5_overorunder}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Jlk3'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="3">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总和大小</th>
            <th rowspan="2">长牌/短牌/豹子</th>
          </tr>
          <tr>
            <th>骰1</th>
            <th>骰2</th>
            <th>骰3</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.longorshort)}">{{it.longorshort}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Hbk3'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="3">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总和大小</th>
            <th rowspan="2">长牌/短牌/豹子</th>
          </tr>
          <tr>
            <th>骰1</th>
            <th>骰2</th>
            <th>骰3</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.longorshort)}">{{it.longorshort}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Ahk3'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="3">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总和大小</th>
            <th rowspan="2">长牌/短牌/豹子</th>
          </tr>
          <tr>
            <th>骰1</th>
            <th>骰2</th>
            <th>骰3</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.longorshort)}">{{it.longorshort}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Nmgk3'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="3">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总和大小</th>
            <th rowspan="2">长牌/短牌/豹子</th>
          </tr>
          <tr>
            <th>骰1</th>
            <th>骰2</th>
            <th>骰3</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.longorshort)}">{{it.longorshort}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Fjk3'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="3">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总和大小</th>
            <th rowspan="2">长牌/短牌/豹子</th>
          </tr>
          <tr>
            <th>骰1</th>
            <th>骰2</th>
            <th>骰3</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.longorshort)}">{{it.longorshort}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Hubk3'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="3">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总和大小</th>
            <th rowspan="2">长牌/短牌/豹子</th>
          </tr>
          <tr>
            <th>骰1</th>
            <th>骰2</th>
            <th>骰3</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.longorshort)}">{{it.longorshort}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Bjk3'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="3">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总和大小</th>
            <th rowspan="2">长牌/短牌/豹子</th>
          </tr>
          <tr>
            <th>骰1</th>
            <th>骰2</th>
            <th>骰3</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.longorshort)}">{{it.longorshort}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Shk3'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="3">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总和大小</th>
            <th rowspan="2">长牌/短牌/豹子</th>
          </tr>
          <tr>
            <th>骰1</th>
            <th>骰2</th>
            <th>骰3</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.longorshort)}">{{it.longorshort}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Gsk3'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="3">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总和大小</th>
            <th rowspan="2">长牌/短牌/豹子</th>
          </tr>
          <tr>
            <th>骰1</th>
            <th>骰2</th>
            <th>骰3</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.longorshort)}">{{it.longorshort}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Gxk3'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="3">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总和大小</th>
            <th rowspan="2">长牌/短牌/豹子</th>
          </tr>
          <tr>
            <th>骰1</th>
            <th>骰2</th>
            <th>骰3</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.longorshort)}">{{it.longorshort}}</td>
          </tr>
        </table>
        <table class="tb cqssc" v-show="show_type.value=='liangmian'" v-if="tempParam.typeName=='Jsk3'">
          <tr>
            <th rowspan="2">期数</th>
            <th rowspan="2">开奖时间</th>
            <th colspan="3">球号</th>
            <th rowspan="2">总和</th>
            <th rowspan="2">总和大小</th>
            <th rowspan="2">长牌/短牌/豹子</th>
          </tr>
          <tr>
            <th>骰1</th>
            <th>骰2</th>
            <th>骰3</th>
          </tr>
          <tr v-for="it,idx in results">
            <td>
              {{it.issue}}
            </td>
            <td>
              {{it.opentime}}
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num1}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num2}}
              </div>
            </td>
            <td>
              <div class="ball" :style="{background:colors['red']}">
                {{it.num3}}
              </div>
            </td>
            <td>{{it.sum}}</td>
            <td :style="{color:getColors(it.sum_overorunder)}">{{it.sum_overorunder}}</td>
            <td :style="{color:getColors(it.longorshort)}">{{it.longorshort}}</td>
          </tr>
        </table>
        <div v-show="results.length<1&&!is_loading_result" style="text-align: center;padding-top:20px;">暂无数据</div>
        <div class="pager" v-show="pages.length>1">
          <div class="item" @click="pageClick(it.page)" v-for="it,idx in pages" :key="idx"
               :class="{cur:it.cur,sl:it.page==-1}">{{it.txt}}
          </div>
          <div style="display: inline-block;color:#B62929;" v-show="is_loading_result">加载中...</div>
          <div style="display: inline-block;color:#B62929;opacity:0" v-show="!is_loading_result">加载中...</div>
        </div>
      </div>
      <div v-show="is_loading_result" class="spiningDubbles"><vue-loading type="spiningDubbles" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading></div>
    </div>
    </div>
</template>

<script>
  import {mapMutations} from "vuex"
  import vueLoading from 'vue-loading-template'
  import alert from "@/components/base/alert"
  import {
    six_lottery,
    cqssc,
    tjssc,
    xjssc,
    gdklsf,
    cqklsf,
    tjklsf,
    hnklsf,
    gd11x5,
    bjkl8,
    bjpk10,
    xyft,
    fc3d,
    pl3,
    shssl,
    bj28,
    gxklsf,
    jlk3,
    hbk3,
    ahk3,
    nmgk3,
    fjk3,
    hubk3,
    bjk3,
    shk3,
    gsk3,
    gxk3,
    jsk3
  } from "@/obj/cal_lottery_data"

  export default {
    name: "lottery_result",
    async created() {
      await this.initGameType();
      
      //加载数据;
      this.tempParam = {
        date: this.date,
        typeName: this.gameTypes[this.gameTypeIdx].name,
        typeTitle: this.gameTypes[this.gameTypeIdx].title,
        gameNum: ""
      }
      this.loadData(1);
    },
    components: {
      vueLoading
  },
    mounted() {
    },
    data() {
      return {
        pages: [],
        date: new Date().format("yyyy-MM-dd"),
        page_size: 10,
        show_types: [],
        show_type: "",
        gameTypes: [],
        gameTypeIdx: -1,
        gameNum: "",
        is_loading_lottery_type: false,
        is_loading_result: true,
        results: [],
        colors: {
          "red": "linear-gradient(#F05190,#E74231)!important",
          "blue": "linear-gradient(#59e, #0E4FC3)!important",
          "green": "linear-gradient(#5d5, #8BC34A)!important"
        },
        colors2: {
          "red": "#e53935",
          "blue": "#039be5",
          "green": "#7cb342",
          "orange":"#ffa726"
        },
        car_colors: ["", "#ffca28", "rgb(229, 115, 115)", "rgb(0, 191, 165)", "rgb(171, 71, 188)", "rgb(139, 195, 74)", "rgb(255, 138, 101)", "rgb(117, 117, 117)", "rgb(240, 98, 146)", "#ffee58", "rgb(92, 107, 192)"],
        tempParam: {
          endDate: "",
          gameNum: "",
          typeName: "",
          typeTitle: "",
          date: ""
        }
      }
    },
    methods: {
      ...mapMutations(["ROOTBOX","EASYSECRET"]),
      alert(tit, msg, fn, msgStyle) {
        let _this = this;
        this.ROOTBOX({
          open: true,
          compt: alert,
          props: {
            tit: tit,
            msg: msg,
            msgstyle: msgStyle
          },
          handles: {
            confirm() {
              if (fn) fn();
              _this.ROOTBOX({
                open: false
              })
            },
            close() {
              _this.ROOTBOX({
                open: false
              });
            }
          }
        });
      },
      setPager(page, pageCount) {
        this.pages = [];
        if (pageCount < 1) return;
        if (page - 1 > 0) {
          this.pages.push({
            page: 1,
            txt: "首页"
          });
          this.pages.push({
            page: page - 1,
            txt: "上一页"
          });
        }
        let begin = 1, end = pageCount;
        if (page - 3 > 1) {
          begin = page - 3;
          this.pages.push({
            page: -1,
            txt: "..."
          });
        }
        if (page + 3 <= pageCount) {
          end = page + 3;
        }
        for (let i = begin; i <= end; i++) {
          this.pages.push({
            page: i,
            txt: i,
            cur: i == page
          })
        }
        if (end != pageCount) {
          this.pages.push({
            page: -1,
            txt: "..."
          });
        }
        if (page + 1 <= pageCount) {
          this.pages.push({
            page: page + 1,
            txt: "下一页"
          });
          this.pages.push({
            page: pageCount,
            txt: "末页"
          });
        }
      },
      async initGameType() {
        this.is_loading_lottery_type = true;
        let res = await this.$http.get('/api/lottery/basic/LotteryList/');
        this.is_loading_lottery_type = false;
        if (!res) {
          this.is_loading_result=false;
          return;
        }

        //res.data.data.unshift({id: -1, title: "香港六合彩"});
        let resArr = [{id: -1, title: "香港六合彩", name: "Xglhc"}];
        resArr = resArr.concat(res.data.data);
        let idx = resArr.findIndex(v => {
          return v.name == this.$route.params.game_name;
        });
        if(idx==-1){
          this.gameTypeIdx = 0;
        }else{
          this.gameTypeIdx = idx;
        }
        this.gameTypes = resArr;
      },
      async loadData(page,ispage) {
        if (this.gameTypeIdx == -1) return;
        let url = '/api/lhc/Lhcinfo/kaiJiangHistory';
        let data = {
          page: page,
          ps: this.page_size
        }
        if (this.tempParam.typeName != "Xglhc") {
          url = `/api/lottery-v1/${this.tempParam.typeName}/history/`;
          data = {
            t: this.tempParam.date,
            p: page,
            ps: this.page_size,
          }
        }
        if (!data.t) delete data.t;
        this.is_loading_result = true;
        this.results=[];
        let res = await this.$http.post(url, data);
        this.is_loading_result = false;
        if (!res) return;
        this.results = this.setData(res.data.list);
        if(!ispage){
          this.setShowType();
        }
        this.setPager(page, res.data.page);
      },
      pageClick(page) {
        if (page == -1) return;
        this.loadData(page,true);
      },
      async logout(){
        let res = await this.$http.post('/api/user/logout');
        if (!res) return;
        if (res.data.code != 0) {
          this.alert("提示", res.data.msg);
          return;
        }
        this.EASYSECRET("");
        localStorage.clear();
        this.$http.defaults.headers.EasySecret = undefined;
        this.$router.push("/");
      },
      search() {
        this.tempParam = {
          date: this.date,
          typeName: this.gameTypes[this.gameTypeIdx].name,
          typeTitle: this.gameTypes[this.gameTypeIdx].title,
          gameNum: ""
        }
        this.loadData(1);
      },
      getColors(txt) {
        if (!txt) return;
        txt = txt + '';
        let reds = ["双", "大", "家禽", "下", "偶", "龙", "前","中","东","长","庄","顺子", "对子", "两对" ,"牛牛"];
        let blues = ["单", "小", "野兽", "上", "奇", "虎", "后","发","南","短","闲","五离" ,"杂六" , "三张" ,"四张","牛"];
        let orange = ["白","西","豹子"];
        let green=["北"];
        if (reds.indexOf(txt) != -1) {
          return this.colors2["red"];
        }
        let res = "";
        txt.split("").forEach(v => {
          if (reds.indexOf(v) != -1) {
            res = this.colors2["red"];
          }
        });
        if (res) return res
        if (blues.indexOf(txt) != -1) {
          return this.colors2["blue"];
        }
        txt.split("").forEach(v => {
          if (blues.indexOf(v) != -1) {
            res = this.colors2["blue"];
          }
        })
        if (orange.indexOf(txt) != -1) {
          return this.colors2["orange"];
        }
        if (green.indexOf(txt) != -1) {
          return this.colors2["green"];
        }
        if (res) return res;
        else return "inherit";
      },
      setData(data) {
        if (this.tempParam.typeName == "Xglhc") {//香港六合彩
          data = data.map(v => {
            return {
              ...v,
              ...six_lottery(v.ball.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Cqssc") {//重庆时时彩
          data = data.map(v => {
            return {
              ...v,
              ...cqssc(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Tjssc") {//天津时时彩
          data = data.map(v => {
            return {
              ...v,
              ...tjssc(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Xjssc") {//新疆时时彩
          data = data.map(v => {
            return {
              ...v,
              ...xjssc(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Gdklsf") {//
          data = data.map(v => {
            return {
              ...v,
              ...gdklsf(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Cqklsf") {//
          data = data.map(v => {
            return {
              ...v,
              ...cqklsf(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Tjklsf") {//
          data = data.map(v => {
            return {
              ...v,
              ...tjklsf(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Hnklsf") {//
          data = data.map(v => {
            return {
              ...v,
              ...hnklsf(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Gd11x5") {//
          data = data.map(v => {
            return {
              ...v,
              ...gd11x5(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Bjkl8") {//
          data = data.map(v => {
            return {
              ...v,
              ...bjkl8(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Bjpk10") {//
          data = data.map(v => {
            return {
              ...v,
              ...bjpk10(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Xyft") {//
          data = data.map(v => {
            return {
              ...v,
              ...xyft(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Fc3d") {//
          data = data.map(v => {
            return {
              ...v,
              ...fc3d(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Tcpl3") {//
          data = data.map(v => {
            return {
              ...v,
              ...pl3(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Shssl") {//
          data = data.map(v => {
            return {
              ...v,
              ...shssl(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Bj28") {//
          data = data.map(v => {
            return {
              ...v,
              ...bj28(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Gxklsf") {//
          data = data.map(v => {
            return {
              ...v,
              ...gxklsf(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Jlk3") {//
          data = data.map(v => {
            return {
              ...v,
              ...jlk3(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Hbk3") {//
          data = data.map(v => {
            return {
              ...v,
              ...hbk3(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Ahk3") {//
          data = data.map(v => {
            return {
              ...v,
              ...ahk3(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Nmgk3") {//
          data = data.map(v => {
            return {
              ...v,
              ...nmgk3(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Fjk3") {//
          data = data.map(v => {
            return {
              ...v,
              ...fjk3(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Hubk3") {//
          data = data.map(v => {
            return {
              ...v,
              ...hubk3(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Bjk3") {//
          data = data.map(v => {
            return {
              ...v,
              ...bjk3(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Shk3") {//
          data = data.map(v => {
            return {
              ...v,
              ...shk3(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Gsk3") {//
          data = data.map(v => {
            return {
              ...v,
              ...gsk3(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Gxk3") {//
          data = data.map(v => {
            return {
              ...v,
              ...gxk3(v.data.split(","))
            }
          })
        } else if (this.tempParam.typeName == "Jsk3") {//
          data = data.map(v => {
            return {
              ...v,
              ...jsk3(v.data.split(","))
            }
          })
        }
        /*hbk3
        ahk3
        nmgk3
        fjk3
        hubk3
        bjk3
        shk3
        gsk3
        gxk3
        jsk3*/

        return data;
      },
      setShowType() {
        if (this.tempParam.typeName == "Xglhc") {
          this.show_types = [{tit: "两面", value: "liangmian"}, {tit: "龙虎斗", value: "longhudou"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Cqssc") {
          this.show_types = [{tit: "两面", value: "liangmian"}, {tit: "龙虎斗", value: "longhudou"}, {tit: "棋牌", value: "qipai"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Tjssc") {
          this.show_types = [{tit: "两面", value: "liangmian"}, {tit: "龙虎斗", value: "longhudou"}, {tit: "棋牌", value: "qipai"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Xjssc") {
          this.show_types = [{tit: "两面", value: "liangmian"}, {tit: "龙虎斗", value: "longhudou"}, {tit: "棋牌", value: "qipai"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Gdklsf") {
          this.show_types = [{tit: "两面", value: "liangmian"},{tit:"中发白&方位",value:"pos_and_zfb"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Cqklsf") {
          this.show_types = [{tit: "两面", value: "liangmian"},{tit:"中发白&方位",value:"pos_and_zfb"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Tjklsf") {
          this.show_types = [{tit: "两面", value: "liangmian"},{tit:"中发白&方位",value:"pos_and_zfb"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Hnklsf") {
          this.show_types = [{tit: "两面", value: "liangmian"},{tit:"中发白&方位",value:"pos_and_zfb"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Gd11x5") {
          this.show_types = [{tit: "两面", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Bjkl8") {
          this.show_types = [{tit: "两面", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Bjpk10") {
          this.show_types = [{tit: "冠亚和两面", value: "paiming"}, {tit: "两面", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Xyft") {
          this.show_types = [{tit: "冠亚和两面", value: "paiming"}, {tit: "两面", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Fc3d") {
          this.show_types = [{tit: "两面", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Tcpl3") {
          this.show_types = [{tit: "两面", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Shssl") {
          this.show_types = [{tit: "两面", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Bj28") {
          this.show_types = [{tit: "两面", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Gxklsf") {
          this.show_types = [{tit: "两面", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Jlk3") {
          this.show_types = [{tit: "两面&长牌/短牌/豹子", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Hbk3") {
          this.show_types = [{tit: "两面&长牌/短牌/豹子", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Ahk3") {
          this.show_types = [{tit: "两面&长牌/短牌/豹子", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Nmgk3") {
          this.show_types = [{tit: "两面&长牌/短牌/豹子", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Fjk3") {
          this.show_types = [{tit: "两面&长牌/短牌/豹子", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Hubk3") {
          this.show_types = [{tit: "两面&长牌/短牌/豹子", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Bjk3") {
          this.show_types = [{tit: "两面&长牌/短牌/豹子", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Shk3") {
          this.show_types = [{tit: "两面&长牌/短牌/豹子", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Gsk3") {
          this.show_types = [{tit: "两面&长牌/短牌/豹子", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Gxk3") {
          this.show_types = [{tit: "两面&长牌/短牌/豹子", value: "liangmian"}];
          this.show_type = this.show_types[0];
        } else if (this.tempParam.typeName == "Jsk3") {
          this.show_types = [{tit: "两面&长牌/短牌/豹子", value: "liangmian"}];
          this.show_type = this.show_types[0];
        }
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/style.css";

  .lottery_result {
    min-height: 100%;
    width: 1100px;
    font-size: 14px;
    box-sizing: border-box;
    .header {
      background-color: rgba(0, 0, 0, .73);
      color: #fff;
      position: relative;
      width: 100%;
      height: 48px;
      line-height: 48px;
      > .left {
        padding-left: 15px;
        cursor: pointer;
        float: left;
        .backhome {
          display: inline-block;
          height: 48px;
          background: url(/static/img/base-ico2.7a8056c.png) 0 -176px no-repeat;
          padding-left: 48px;
        }
        .title {
          position: absolute;
          width: 200px;
          left: 50%;
          font-size: 16px;
          margin-left: -100px;
          line-height: 48px;
          top: 0;
        }
      }
      > .right {
        float: right;
        .items {
          display: inline-block;
          padding-left: 45px;
          cursor: pointer;
          height: 48px;
          margin: 0 15px;
          &.recharge {
            background: url(/static/img/base-ico2.7a8056c.png) no-repeat;
            background-position: -108px -677px;
            color: #fff;
          }
          &.withdrawal {
            color: #fff;
            background: url(/static/img/base-ico2.7a8056c.png) no-repeat;
            background-position: 0 -678px;
          }
          &.logout {
            background: url(/static/img/base-ico2.7a8056c.png) no-repeat;
            background-position: -201px -677px;
          }
          &.recharge:hover{
            color: #b62929;
            background-position: -108px -750px;
          }
          &.withdrawal:hover{
            color: #b62929;
            background-position: 0 -750px
          }
          &.logout:hover{
            color: #b62929;
            background-position: -201px -750px;
          }
        }
      }
    }
    textarea {
      line-height: 1.5em;
      width: 300px;
      border: 1px solid #ccc;
      border-radius: 3px 3px;
      padding-left: 10px;
      color: #999;
      position: relative;
      top: 3px;
      font-family: "Microsoft YaHei";
      box-sizing: border-box;
    }
    .el-input {
      .el-input__inner {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
        padding-left: 30px;
      }
    }
    select, input[type=text], input[type=password], input[type=number] {
      line-height: 30px;
      height: 36px;
      width: 150px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 3px 3px;
      padding-left: 10px;
      color: #999;
      vertical-align: middle;
    }
    input:focus, select:focus, textarea:focus {
      outline: none;
      outline: 0;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-text-fill-color: rgba(255, 255, 255, 1);;
      -webkit-animation-name: autofill;
      -webkit-animation-fill-mode: both;
    }

    @-webkit-keyframes autofill { //去除chrome浏览器自动填充表单的黄色背景
      to {
        color: rgba(255, 255, 255, 1);
        background: transparent;
      }
    }

    @-webkit-keyframes autofill2 { //去除chrome浏览器自动填充表单的黄色背景
      to {
        color: #aaa;
        background: transparent;
      }
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-text-fill-color: #aaa;
      -webkit-animation-name: autofill2;
      -webkit-animation-fill-mode: both;
      color: #aaa !important;
    }

    .search_box {
      padding: 10px 0px;
      line-height: 35px;
      .item {
        display: inline-block;
        margin-right: 10px;
      }
      .btn_search {
        vertical-align: middle;
        background-color: #b62929;
        color: #fff;
        display: inline-block;
        line-height: 34px;
        min-width: 60px;
        text-align: center;
        border-radius: 3px 3px;
        cursor: pointer;
      }
    }
    table.tb {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #ccc;
      text-align: center;
      tr {
        border: 1px solid #ccc;
      }
      th {
        background-color: #f3f3f3;
        padding: 8px 0;
        font-weight: 200;
        border: 1px solid #d8d8d8;
      }
      td {
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 8px 0;
      }
    }
    .xglhc td, .cqssc td {
      > .car {
        display: inline-block;
        position: relative;
        width: 50px;
      }
      > .ball {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        border-radius: 15px 15px;
      }
      > .animal {
        display: inline-block;
      }
    }
    .pager {
      margin-top: 20px;
      margin-bottom: 20px;
      text-align: center;
      > .item {
        margin: 0 2px;
        display: inline-block;
        padding: 7px 10px;
        cursor: pointer;
        line-height: 1.2;
        border: 1px solid #ccc;
        background-color: #fff;
        &:hover {
          color: #B62929;
          border: 1px solid #b62929;
        }
        &.cur {
          color: #B62929;
          border: 1px solid #b62929;
        }
        &.sl {
          &:hover {
            border: none;
            background: none;
          }
          border: none;
          background: none;
        }
      }
    }
    text-align: left;
    min-width: 1000px;
    margin: 0 auto;
    background-color: #fff;
    .cont {
      min-height: 700px;
      z-index: 1000;
      position: relative;
    }
  }
</style>
