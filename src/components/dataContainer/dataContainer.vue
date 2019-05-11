<template>
  <div class="dataContainer pageWidth">
    <div class="openResInfo">
      <open-res-info :result="openResult" :isShowChangLong="false"/>
    </div>
    <ul class="tabBox">
      <router-link to="/Data/historyData" v-show="curCodeInfo.is_history_data != 0" tag="li">频道首页</router-link>
      <router-link to="/Data/trendChart" v-show="curCodeInfo.is_trend_chart != 0" tag="li">走势图表</router-link>
      <router-link to="/Data/hotNumber" v-show="curCodeInfo.is_cold_and_hot_number != 0" tag="li">冷热号码</router-link>
       <router-link to="/Data/liveVideo" tag="li">开奖直播</router-link>
      <router-link to="/Data/luZhu" v-show="curCodeInfo.is_road_beads != 0" tag="li">露珠走势</router-link>
      <router-link to="/Data/numberPlan" v-show="curCodeInfo.is_forecast_rule != 0" tag="li">定位计划</router-link>
    </ul>
    <router-view/>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import OpenResInfo from "base/openResInfo";
export default {
  name: "dataContainer",
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.getLotteryExpectFunc(this.curLotteryCode);
    });
  },
  methods: {
    ...mapActions(["getLotteryExpect"]),

    //  获取开奖信息
    getLotteryExpectFunc(code) {
      this.getLotteryExpect(code)
    }
  },
  computed: {
    ...mapGetters(["curLotteryCode","openResult","lotteryCodes"]),

    curCodeInfo(){
      let codes ={};
      this.lotteryCodes.forEach(item=>{
        if(item.code == this.curLotteryCode){
          codes = item;
        }
      });
      return codes;
    }
  },
  components: {
    OpenResInfo
  },
  watch: {
    curLotteryCode: function() {
      this.getLotteryExpectFunc(this.curLotteryCode);
    }
  }
};
</script>
<style lang="scss" scoped>
.dataContainer {
  .openResInfo {    
    background-color: #fff;
    margin-top: 15px;
  }
  .tabBox{
    border-top: 1px solid #ccc;
    background-color: #fff;
    display: flex;
    margin-bottom: 15px;
    li{
      height: 40px;
      padding: 0 20px;
      line-height: 40px;
      text-align: center;
      color: #444;
      cursor: pointer;
      &:hover,&.router-link-active{
        color: #e73f3f;
      }
    }
  }
}
</style>
