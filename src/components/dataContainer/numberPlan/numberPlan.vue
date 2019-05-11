<template>
  <div class="numberPlan">
    <div class="title">
      <span
        v-if="planData.location"
      >{{planData.location[curLocation-1].location_name}}{{curForecastQuantity == 0 ? planData.forecast_quantity_list[0].forecast_quantity : curForecastQuantity}}码定位计划 1天/{{planData.wheel_quantity}}轮 1轮/{{planData.wheel_expect_quantity}}期</span>
      <span v-if="planData.expert_list">
        模拟倍率：
        <input type="text" id="rate" disabled :value="planData.analog_magnification">&nbsp;模拟金额：
        <input type="text" id="money" disabled :value="planData.simulated_amount">&nbsp;元/注&nbsp;
        <a id="btn" href="javascript:();">设置</a>&nbsp;&nbsp;专家算法：
        <select name="select" ref="selectCurExpertId"  @change="curExpertIdChange">
          <option
            v-for="(item,index) in planData.expert_list"
            :value="item.id"
            :key="index"
            :selected="item.id == curExpertId"
          >{{item.name}}</option>
        </select>&nbsp;&nbsp;
        <a
          class="search"
          href="javascript:;"
          @click="isShowRank=true"
          title="自助搜索高胜率计划"
        >点击搜索计划</a>
      </span>
    </div>
    <div class="tab" v-if="planData.expert_forecast_data_list">
      <div class="left">
        <span
          @click="selectCurForecastQuantity(item.forecast_quantity)"
          :class="{'active': curForecastQuantity == item.forecast_quantity}"
          v-for="(item,index) in planData.forecast_quantity_list"
          :key="index"
        >{{item.forecast_quantity}}码定位</span>
      </div>
      <div class="right">
        <span
          :class="{'active':curLocation == item.location}"
          @click="curLocation = item.location"
          v-for="(item,index) in planData.location"
          :key="index"
        >{{item.location_name}}</span>
      </div>
    </div>
    <div v-if="planData.expert_forecast_data_list.length != 0" class="table" >
      <table
        cellpadding="0"
        cellspacing="0"
        width="100%"
        v-for="(item,index) of planData.expert_forecast_data_list"
        :key="index"
      >
        <tbody>
          <tr>
            <th colspan="11">
              第{{planData.expert_forecast_data_list.length - index}}轮 待开奖 :
              {{calcOopenNumToTal(item).noOpen}}
              中 : {{calcOopenNumToTal(item).win}} 挂 : {{calcOopenNumToTal(item).noWin}} 胜率 : {{calcOopenNumToTal(item).winPro}}
            </th>
          </tr>
          <tr>
            <th width="50">序号</th>
            <th width="50">轮次</th>
            <th width="120">期号</th>
            <th width="70">专家</th>
            <th width="400">开奖号码</th>
            <th width="140">预测号码</th>
            <th>类型</th>
            <th>结果</th>
            <th>截止输赢</th>
            <th>反压输赢</th>
            <th>单期成本</th>
          </tr>
          <tr v-for="(obj,key) in item" :key="key">
            <td>第{{item.length - key}}期</td>
            <td>第{{planData.expert_forecast_data_list.length - index}}轮</td>
            <td>第{{obj.expect}}期</td>
            <td>{{obj.expert_name}}</td>
            <td>
              <div>
                <openCode
                  v-show="obj.status == 1"
                  :code="obj.code"
                  :codeType="planData.code_type"
                  :result="obj.open_numbers"
                />
                <span v-show="obj.status == 0">待开奖</span>
              </div>
            </td>
            <td>
              <span
                v-for="(temp,k) in obj.forecast_numbers"
                :class="{'red':obj.open_number == temp}"
                :key="k"
              >
                <template v-if="k!=0">,</template>
                {{temp}}
              </span>
            </td>
            <td>{{planData.location[obj.location-1].location_name}}-{{obj.forecast_quantity}}码</td>
            <td>
              <font v-if="obj.status == 0">待开奖</font>
              <font color="green" v-else-if="obj.forecast_numbers.indexOf(obj.open_number) != -1">√赢</font>
              <font color="red" v-else>×输</font>
            </td>
            <td>{{obj.deadline_win_or_lose}}</td>
            <td style="color:#bbb">{{obj.back_pressure_win_or_lose}}</td>
            <td>{{obj.single_term_cost}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="loading-img">
      <img src="../../../assets/images/Ellipsis-1s-100px.gif" alt="">
    </div> 
    <ForecastRanking
      @closeRank="isShowRank=false"
      :isShowRank="isShowRank"
      :planData="planData"
      :curForecastQuantity="curForecastQuantity"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getCurTime, formatTime } from "@/assets/js/utils";
import openCode from "@/components/base/openCode/openCode.vue";
import ForecastRanking from "./forecastRanking";
export default {
  name: "numberPlan",
  data() {
    return {
      planData: {},
      curLocation: 0,
      curForecastQuantity: 0,
      curExpertId: 0,
      isShowRank: false
    };
  },
  components: { openCode, ForecastRanking },
  created() {
    this.curExpertId = this.$route.query.expertId || 0;
    this.curLocation = this.$route.query.location || 1;
    let curCode = this.$route.query.code || this.curLotteryCode;
    this.chengecurLotteryCode(curCode);
    this.curForecastQuantity = this.$route.query.forecastQuantity || 0;
    this.getForecastPlanFunc(
      this.curLotteryCode,
      this.curExpertId,
      getCurTime("YYYY-MM-DD"),
      this.curForecastQuantity,
      this.curLocation
    );
  },
  mounted() {

  },
  methods: {
    ...mapActions(["getForecastPlan", "chengecurLotteryCode"]),

    // 选择位置
    selectCurForecastQuantity(item,index){
      this.curForecastQuantity = item
      this.getForecastPlanFunc(
        this.curLotteryCode,
        this.curExpertId,
        getCurTime("YYYY-MM-DD"),
        this.curForecastQuantity,
        this.curLocation
      );
    },

    // 选择专家
    curExpertIdChange(){
      let val = this.$refs.selectCurExpertId.value;
      this.curExpertId = val;
      this.getForecastPlanFunc(
        this.curLotteryCode,
        this.curExpertId,
        getCurTime("YYYY-MM-DD"),
        this.curForecastQuantity,
        this.curLocation
      );
    },

    // 计算开奖统计
    calcOopenNumToTal(item) {
      let noOpen = 0;
      let win = 0;
      let noWin = 0;
      let winPro = 0;
      item.forEach(obj => {
        if (obj.status == 0) {
          noOpen++;
        } else if (obj.result == 0) {
          noWin++;
        } else if (obj.result == 1) {
          win++;
        }
      });
      winPro = isNaN(((win / (item.length - noOpen)) * 100).toFixed(2))
        ? 0
        : ((win / (item.length - noOpen)) * 100).toFixed(2) + "%";
      return {
        noOpen: noOpen,
        win: win,
        noWin: noWin,
        winPro: winPro
      };
    },

    getForecastPlanFunc(
      code,
      expert_id,
      open_date,
      forecast_quantity,
      location
    ) {
      // 清空计划数据 显示loading
      this.planData.expert_forecast_data_list = []
      this.getForecastPlan({
        code: code,
        expert_id: expert_id || 0,
        open_date: open_date,
        forecast_quantity: forecast_quantity || 0,
        location: location || 0
      }).then(res => {
        if (res.code == 200) {
          this.planData = res.data;
          // console.log(this.planData)
        } else {
          //todo
        }
      });
    }
  },
  computed: {
    ...mapGetters(["curLotteryCode", "socketOpenResult", "lotteryCodes"]),
    curCodeInfo() {
      let codes = {};
      this.lotteryCodes.forEach(item => {
        if (item.code == this.curLotteryCode) {
          codes = item;
        }
      });
      return codes;
    }
  },
  watch: {
    socketOpenResult: function() {
      if (this.socketOpenResult.code == this.curLotteryCode) {
        this.getForecastPlanFunc(
          this.curLotteryCode,
          this.curExpertId,
          getCurTime("YYYY-MM-DD"),
          this.curForecastQuantity,
          this.curLocation
        );
      }
    },
    curLotteryCode: function() {
      this.curLocation = 1
      if (this.curCodeInfo.is_forecast_rule == 0) {
        this.$router.push("./historyData");
      }
      this.getForecastPlanFunc(
        this.curLotteryCode,
        this.curExpertId,
        getCurTime("YYYY-MM-DD"),
        this.curForecastQuantity,
        this.curLocation
      );
    },
    '$route.query.expertId': {
        handler(newVal, oldVal) {
            this.curExpertId = newVal
            this.getForecastPlanFunc(
              this.curLotteryCode,
              this.curExpertId,
              getCurTime("YYYY-MM-DD"),
              this.curForecastQuantity,
              this.curLocation
            );
        },
        deep: true,
        immediate: true
    },
    '$route.query.location': {
        handler(newVal, oldVal) {
            this.curLocation = newVal
        },
        deep: true,
        immediate: true
    },
    curLocation() {
      this.getForecastPlanFunc(
        this.curLotteryCode,
        this.curExpertId,
        getCurTime("YYYY-MM-DD"),
        this.curForecastQuantity,
        this.curLocation
      );
    },
    '$route.query.forecastQuantity': {
      handler(newVal, oldVal) {
        this.curForecastQuantity = newVal
        this.getForecastPlanFunc(
          this.curLotteryCode,
          this.curExpertId,
          getCurTime("YYYY-MM-DD"),
          this.curForecastQuantity,
          this.curLocation
        );
      },
      deep: true,
      immediate: true
    },
    planData() {
      // 当 curForecastQuantity 规则为 0 时选中默认第一个
      if(this.curForecastQuantity == 0) {
        this.curForecastQuantity = this.planData.forecast_quantity_list[0].forecast_quantity
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.numberPlan {
  background-color: #fff;
  padding: 15px;
  .title {
    overflow: auto;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    border-bottom: 1px solid #e5e5e5;
    color: #333;
    span {
      &:nth-of-type(1) {
        float: left;
      }
      &:nth-of-type(2) {
        float: right;
        font-size: 14px;
        input {
          height: 28px;
          border: 1px solid #ddd;
          line-height: 28px;
          background: #fff;
          width: 50px;
          text-align: center;
          font-size: 14px;
        }
        select {
          height: 28px;
          border: 1px solid #ddd;
          line-height: 28px;
          background: #fff;
          width: 100px;
          text-align: center;
          font-size: 14px;
        }
        .search {
          display: inline-block;
          height: 28px;
          line-height: 28px;
          text-align: center;
          padding: 0 6px 0 6px;
          border-radius: 3px;
          font-size: 14px;
          background: #e73f3f;
          color: #fff;
        }
      }
    }
  }
  .tab {
    height: 40px;
    line-height: 40px;
    margin: 5px 0 5px 0;
    .left {
      float: left;
      span {
        display: inline-block;
        width: 110px;
        cursor: pointer;
        text-align: center;
        &:hover,
        &.active {
          background: #666;
          color: #fff;
          border-radius: 3px;
        }
      }
    }
    .right {
      float: right;
      span {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        text-align: center;
        padding: 0 6px 0 6px;
        margin-left: 5px;
        margin-top: 6px;
        border-radius: 3px;
        font-size: 13px;
        cursor: pointer;
        &:hover,
        &.active {
          background: #e73f3f;
          color: #fff;
        }
      }
    }
  }
  .table {
    table {
      tr {
        border: 1px solid #e5e5e5;
        th {
          background: #f9f9f9;
        }
        th,
        td {
          border: 1px solid #e5e5e5;
          height: 45px;
          line-height: 45px;
          text-align: center;
        }
        td {
          font-size: 14px;
          .red {
            color: red;
          }
        }
      }
    }
  }
  .loading-img{
    text-align: center
  }
}
</style>
