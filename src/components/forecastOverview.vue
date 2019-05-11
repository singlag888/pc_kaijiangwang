<template>
  <div class="forecastOverview">
    <v-header :isShowCodeList="false"></v-header>
    <div class="banner">
      <img src="../assets/images/planbanner.png" alt>
    </div>
    <div class="codeList">
      <div class="content pageWidth">
        <VNav :lotteryCodes="forecastOverviewData.lottery"></VNav>
      </div>
    </div>
    <div class="tebleBox pageWidth">
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <th colspan="11">
            <h2>{{forecastOverviewData.name}}计划</h2>
          </th>
        </tr>
        <tr>
          <th>专家</th>
          <th v-for="(item,index) in forecastOverviewData.location_names" :key="index">{{item}}</th>
        </tr>

        <tr v-for="(item,index) in forecastOverviewData.list" :key="index">
          <td>{{forecastOverviewData.expert[index].name}}</td>
          <td v-for="(obj,key) in item" :key="key">
            <span @click="goTo(forecastOverviewData.expert[index].id,index+1,item.forecast_quantity, '/Data/numberPlan')" :title="'查看'+temp.forecast_quantity+'码计划'" v-for="(temp,k) in obj" :key="k">{{temp.forecast_quantity}}码&nbsp;&nbsp;</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import VNav from "./header/VNav";
import VHeader from "./header/VHeader";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "forecastOverview",
  components: { VHeader, VNav },
  data() {
    return {
      forecastOverviewData: []
    };
  },
  created(){
    this.getforecastOverviewFunc(this.curLotteryCode)
  },
  methods: {
    ...mapActions(["getforecastOverview"]),

    goTo(expertId,location,forecastQuantity,path){
      this.$router.push({ path: path, query: { expertId: expertId,location:location,forecastQuantity:forecastQuantity } });
    },

    getforecastOverviewFunc(code) {
      this.getforecastOverview(code).then(res => {
        if (res.code == 200) {
          this.forecastOverviewData = res.data;
        }
      });
    }
  },
  computed:{
    ...mapGetters(['curLotteryCode'])
  },
  watch:{
    curLotteryCode(){
      this.getforecastOverviewFunc(this.curLotteryCode);
    }
  }
};
</script>

<style lang="scss" scoped>
.forecastOverview {
  .banner {
    background-color: #393d49;
    text-align: center;
  }
  .codeList {
    background-color: #fff;
  }
  .tebleBox {
    background: #fff;
    margin: 10px auto;
    padding: 15px;
    overflow: hidden;
    table {
      tr {
        th {
          background-color: #f9f9f9;
          font-size: 13px;
          color: #666;
          font-weight: 400;
          h2 {
            font-weight: 400;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 18px;
          }
        }
        th,
        td {
          border: 1px solid #e5e5e5;
          line-height: 36px;
          text-align: center;
        }
        td{
          span{
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>

