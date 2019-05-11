<template>
  <div class="trendContainer pageWidth">
    <div class="data">
      <div class="title">
        <div class="filterTop">
          <a href="jacascript:void(0)" class="active">
            <i class="ico1"></i>基本走势图
          </a>
          <!-- <a href="jacascript:void(0)">
            <i class="ico2"></i>同期走势图
          </a>-->
          <div class="filterTime">
            <span slot="afterDateInput" class="animated-placeholder">按日期</span>
            <datepicker
              class="datepicker"
              :input-class="'datepickerInput'"
              :format="dateOption.format"
              :language="dateOption.language"
              v-model="curSelectTime"
              @closed="selectedTime"
            ></datepicker>
          </div>
        </div>
        <div class="filterDown">
          <ul class="trendTab">
            <li @click="changeTrendTab(1)" :class="{'active':curTrendTabIndex==1}">位置走势图</li>
            <!-- <li @click="changeTrendTab(2)" :class="{'active':curTrendTabIndex==2}">号码走势图</li> -->
            <!-- <li @click="changeTrendTab(3)" :class="{'active':curTrendTabIndex==3}">冠亚和走势图</li> -->
          </ul>
          <ul class="numTab">
            <li
              @click="changeNumTab(index)"
              v-for="(item,index) in  locationNames"
              :key="index"
              :class="{'active':curNumTabIndex==index}"
            >{{item}}</li>
          </ul>
        </div>
      </div>
      <div v-if="basicTrend.length == 0" class="loading-img">
        <img src="../../../assets/images/Ellipsis-1s-100px.gif" alt="">
      </div>
      <div v-else class="content">        
        <div class="table">
          <table>
            <tr>
              <th width="110" rowspan="2">统计类型</th>
              <template
                v-for="(item,index) in basicTrend[curNumTabIndex] && filterData(basicTrend[curNumTabIndex])"
              >
                <th
                  :colspan="item.len"
                  v-if="item.type == 1"
                  :key="index+'_key1_'"
                >{{locationNames[curNumTabIndex]}}</th>
                <th :colspan="item.len" v-else :key="index">{{item.type_name}}</th>
              </template>
            </tr>
            <tr>
              <th
                width="60"
                v-for="(item,index) in basicTrend[curNumTabIndex] && basicTrend[curNumTabIndex].list"
                :key="index+'_key2_'"
              >{{item.title}}</th>
            </tr>
            <tr>
              <td>总次数</td>
              <td
                width="60"
                v-for="(item,index) in basicTrend[curNumTabIndex] && basicTrend[curNumTabIndex].list"
                :key="index+'_key3_'"
              >{{item.count}}</td>
            </tr>
            <tr>
              <td>最大遗漏</td>
              <td
                width="60"
                v-for="(item,index) in basicTrend[curNumTabIndex] && basicTrend[curNumTabIndex].list"
                :key="index+'_key4_'"
              >{{item.max_missing}}</td>
            </tr>
          </table>
        </div>
        <div class="table">
          <table ref="Table">
            <tr>
              <th width="110" rowspan="2">期号</th>
              <template
                v-for="(item,index) in basicTrend[curNumTabIndex] && filterData(basicTrend[curNumTabIndex])"
              >
                <th
                  :colspan="item.len"
                  v-if="item.type == 1"
                  :key="index+'_key5_'"
                >{{locationNames[curNumTabIndex]}}走势</th>
                <th :colspan="item.len" v-else :key="index+'_key5_'">{{item.type_name}}</th>
              </template>
            </tr>
            <tr>
              <th
                width="60"
                v-for="(item,index) in basicTrend[curNumTabIndex] && basicTrend[curNumTabIndex].list"
                :key="index+'_key6_'"
              >{{item.title}}</th>
            </tr>
            <tr
              v-for="(item,index) in trendList && trendList[curNumTabIndex]"
              :key="index+'_key7_'"
            >
              <td>{{item[0].expect}}</td>
              <template v-for="(obj,key) in item">
                <td width="60" :key="num+'_key8_'+key" v-for="(ball,num) in obj.row">
                  <span
                    v-if="ball == 0 && obj.type == 'location_trend'"
                    class="win"
                    :key="num+ball+'_key9_'"
                  >{{num+1}}</span>
                  <span
                    v-else-if="ball == 0 && obj.type == 'back_swing_trend'"
                    class="blue"
                    :key="num+ball+'_key9_'"
                  >{{canvertBallToTxt(obj.type,num)}}</span>
                  <span
                    v-else-if="ball == 0 && obj.type == 'single_double_trend'"
                    class="orange"
                    :key="num+ball+'_key9_'"
                  >{{canvertBallToTxt(obj.type,num)}}</span>
                  <span
                    v-else-if="ball == 0 && obj.type == 'big_small_trend'"
                    class="green"
                    :key="num+ball+'_key9_'"
                  >{{canvertBallToTxt(obj.type,num)}}</span>
                  <span v-else :key="num+key+'_key9_'">{{ball}}</span>
                </td>
              </template>
            </tr>
          </table>
          <div class="canvasBox">
            <canvas ref="canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";
import { zh } from "vuejs-datepicker/dist/locale";
import { mapGetters, mapActions } from "vuex";
import { getCurTime, formatTime } from "@/assets/js/utils";
export default {
  name: "trendChart",
  components: { Datepicker },
  data() {
    return {
      locationNames: [],
      selectedGroup: 0, //选中的组
      selectedCode: 0, //选中的彩种
      selectedNum: 0, //选中的号码
      trendList: [], //走势图数据
      curSelectTime: new Date(),
      dateOption: {
        language: zh,
        format: "yyyy-MM-dd"
      },
      curTrendTabIndex: 1,
      curNumTabIndex: 0
    };
  },
  created() {
    this.curNumTabIndex = this.$route.query.id || 0;
  },
  mounted() {
    this.$nextTick(() => {
      // 获取基础统计
      this.getBasicTrend({
        code: this.curLotteryCode,
        open_date: getCurTime("YYYY-MM-DD")
      });
      this.getBasicTrendEveryPeriodFunc(
        getCurTime("YYYY-MM-DD"),
        this.curLotteryCode
      );
    });
  },
  methods: {
    ...mapActions(["getBasicTrendEveryPeriod", "getBasicTrend"]),

    // 获取走势数据
    getBasicTrendEveryPeriodFunc(date, code) {
      this.getBasicTrendEveryPeriod({
        open_date: date,
        code: code
      }).then(res => {
        if (res.code == 200) {
          this.trendList = res.data;
          setTimeout(() => {
            this.drawTrend();
          }, 30);
        }
      });
    },

    // 开奖回摆大小单上转换
    canvertBallToTxt(type, index) {
      let txt = "";
      let backTxt = ["反", "重", "正"];
      let singleTxt = ["单", "双"];
      let bigTxt = ["大", "小"];
      switch (type) {
        case "back_swing_trend":
          txt = backTxt[index];
          break;
        case "single_double_trend":
          txt = singleTxt[index];
          break;
        case "big_small_trend":
          txt = bigTxt[index];
          break;
      }
      return txt;
    },

    // 根基类型设置不同球高亮状态
    ballStyle(item) {
      let sty = "";
      switch (item.type) {
        case "location_trend":
          sty = "win";
          break;
        case "back_swing_trend":
          sty = "blue";
          break;
        case "single_double_trend":
          sty = "orange";
          break;
        case "big_small_trend":
          sty = "green";
          break;
      }
      return sty;
    },

    // 转换数据过滤相同数据
    filterData(list) {
      let data = list && list.list;
      let obj = {};
      let arr =
        data &&
        data.reduce(function(item, next) {
          obj[next.type] ? "" : (obj[next.type] = true && item.push(next));
          return item;
        }, []);

      arr &&
        arr.forEach(temp => {
          let len = 0;
          data &&
            data.forEach(item => {
              if (temp.type == item.type) {
                len++;
              }
            });
          this.$set(temp, "len", len);
        });
      return arr;
    },

    // 选择日期
    selectedTime() {
      this.getBasicTrend({
        code: this.curLotteryCode,
        open_date: formatTime(this.curSelectTime, "YYYY-MM-DD")
      });
      this.getBasicTrendEveryPeriodFunc(
        formatTime(this.curSelectTime, "YYYY-MM-DD"),
        this.curLotteryCode
      );
    },

    // 绘制走势
    drawTrend() {
      let x1 = 0,
        y1 = 0,
        x2 = 0,
        y2 = 0;
      let canvas = this.createCanvas(this.$refs.canvas);
      //获取位数
      let trendLineNum =
        this.trendList && this.trendList[this.curNumTabIndex].length - 1;
      var trendBallList = document.querySelectorAll(".win");
      if (trendBallList.length <= 1) return;
      // for (var a = 0; a <= trendLineNum; a++) {
      //获取显示期数总条数
      for (var i = 0; i < trendBallList.length; i++) {
        //计算坐标的起始位置，并处于元素中心
        var w1 = trendBallList[i].clientWidth;
        var h1 = trendBallList[i].clientHeight;
        x1 = trendBallList[i].offsetLeft + w1 / 2;
        y1 = trendBallList[i].offsetTop + h1 / 2;
        if (i + 1 < trendBallList.length) {
          var w2 = trendBallList[i + 1].clientWidth;
          var h2 = trendBallList[i + 1].clientHeight;
          x2 = trendBallList[i + 1].offsetLeft + w2 / 2;
          y2 = trendBallList[i + 1].offsetTop + h2 / 2;
        }

        //开始绘制走势
        this.commonLine(x1, y1, x2, y2, canvas);

        x1 = x2;
        y1 = y2;
      }
      // }
    },

    //常用浏览器走势图-非IE
    commonLine(x1, y1, x2, y2, commonTrendLine) {
      commonTrendLine.beginPath();
      commonTrendLine.moveTo(x1, y1);
      commonTrendLine.lineTo(x2, y2);
      commonTrendLine.closePath();
      commonTrendLine.stroke();
      commonTrendLine.restore();
    },

    //创建canvas区域
    createCanvas(canvas) {
      canvas.width = this.$refs.Table.clientWidth;
      canvas.height = this.$refs.Table.clientHeight;
      let commonTrendLine = canvas.getContext("2d");
      commonTrendLine.strokeStyle = "#ffab0a";
      commonTrendLine.lineWidth = 2;
      return commonTrendLine;
    },

    // 切换走势图
    changeTrendTab(index) {
      this.curTrendTabIndex = index;
    },

    // 切换号码
    changeNumTab(index) {
      this.curNumTabIndex = index;
      setTimeout(() => {
        this.drawTrend();
      }, 20);
      // console.log(this.curNumTabIndex);
    },

    changeGroup(g) {
      this.selectedGroup = g;
    },
    changeCode(c) {
      this.selectedCode = c;
      this.selectedNum = 0;
    },
    changeNum(n) {
      this.selectedNum = n;
    }
  },
  computed: {
    ...mapGetters([
      "lotteryCodes",
      "basicTrend",
      "curLotteryCode",
      "socketOpenResult"
    ]),

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
    curLotteryCode: function() {
      if (this.curCodeInfo.is_trend_chart == 0) {
        this.$router.push("./historyData");
      }
      this.getBasicTrend({
        code: this.curLotteryCode,
        open_date: getCurTime("YYYY-MM-DD")
      });
      this.getBasicTrendEveryPeriodFunc(
        getCurTime("YYYY-MM-DD"),
        this.curLotteryCode
      );
    },
    basicTrend: function() {
      // console.log(this.basicTrend)
      this.locationNames = [];
      this.basicTrend.forEach(item => {
        this.locationNames.push(item.location_name);
      });
    },
    socketOpenResult: function() {
      if (
        this.socketOpenResult.code == this.curLotteryCode &&
        getCurTime("YYYY-MM-DD") == formatTime(this.curSelectTime, "YYYY-MM-DD")
      ) {
        this.getBasicTrend({
          code: this.curLotteryCode,
          open_date: getCurTime("YYYY-MM-DD")
        });
        this.getBasicTrendEveryPeriodFunc(
          getCurTime("YYYY-MM-DD"),
          this.curLotteryCode
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.trendContainer {
  box-sizing: border-box;
  li {
    display: inline-block;
    cursor: pointer;
    user-select: none;
  }
  .header {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    background-color: #fff;
    li {
      margin: 0 20px 0 20px;
    }
    .selectedGroup {
      color: orange;
    }
  }
  .chart {
    margin-top: 10px;
    height: 340px;
    background-color: #fff;
    box-sizing: border-box;
    li {
      margin: 0 14px 0 14px;
      padding: 8px 0 4px 0;
    }
    .selectedCode {
      color: orange;
      box-sizing: border-box;
      border-bottom: 3px solid orange;
    }
    .selectedNum {
      color: orange;
    }
    .chartArea {
      padding: 0 0 0 10px;
    }
  }

  .data {
    padding: 20px;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    .title {
      position: relative;
      .filterTop {
        overflow: hidden;
        a {
          display: inline-block;
          width: 153px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          float: left;
          margin-right: 10px;
          font-size: 16px;
          color: #333;
          border: 1px solid #e5e5e5;
          text-decoration: none;
          transition: all 0.3s;
          i {
            display: inline-block;
            width: 21px;
            height: 20px;
            background: url("../../../assets/images/tb-ico.png") center top
              no-repeat;
            vertical-align: middle;
            margin-right: 10px;
            &.ico2 {
              background-position: center -21px;
            }
          }
        }
        a:hover,
        a.active {
          background: #fffbf6;
          border-color: #ffcc82;
          color: #333;
        }
      }
    }
    .filterTime {
      border: 1px solid #ddd;
      position: absolute;
      right: 0;
      top: 5px;
      .datepicker {
        line-height: 30px;
        display: inline-block;
      }
      span {
        display: inline-block;
        float: left;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        background: #f1f1f1;
      }
    }
    .filterDown {
      margin-top: 10px;
      height: 43px;
      line-height: 43px;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      justify-content: space-between;
      ul {
        li {
          padding: 0 15px;
          margin-right: 5px;
        }
        &.trendTab {
          li {
            &:hover,
            &.active {
              color: #333;
              border-bottom: 2px solid #e73f3f;
            }
          }
        }
        &.numTab {
          li {
            &:hover,
            &.active {
              color: #e73f3f;
            }
          }
        }
      }
    }
  }
  .loading-img{
    text-align: center
  }
  .content {
    margin-top: 20px;
    .table {
      position: relative;
      margin-top: 15px;
      table {
        width: 100%;
        border: 1px solid gray;
        line-height: 36px;
        th {
          font-weight: 700;
          background-color: #fafafa;
        }
        th,
        td {
          border: 1px solid #e5e5e5;
          text-align: center;
          .win {
            display: inline-block;
            width: 24px;
            height: 24px;
            line-height: 24px;
            border-radius: 50%;
            text-align: center;
            background: #1384e7;
            color: #fff;
            position: relative;
            z-index: 3;
          }
          .blue {
            width: 100%;
            height: 100%;
            display: block;
            background: #3e94f1;
            color: #fff;
          }
          .orange {
            width: 100%;
            height: 100%;
            display: block;
            background: #ff9c00;
            color: #fff;
          }
          .green {
            width: 100%;
            height: 100%;
            display: block;
            background: #5cd38f;
            color: #fff;
          }
        }
      }
      .canvasBox {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
    }
  }
}
</style>
