<template>
    <div class="right-content" id="right-content" v-show="showBottom">
        <div class="right_m">
            <ul>
                <li class="rm1">可用余额</li>
                <li class="rm2">
                    <span>￥</span>
                    <span>{{usermoney}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
    data(){
        return{
            showBottom:true
        }
    },
    computed: {
      ...mapState([ "usermoney"])
  },
}
</script>

<style>

</style>
