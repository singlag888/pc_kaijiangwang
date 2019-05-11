<template>
  <div class="louZhu pageWidth">
    <div class="data">
      <div class="title">
        <div class="filterTop">
          <a
            href="jacascript:void(0)"
            @click="changeTabIndex(1)"
            :class="{'active':tabIndex == 1}"
          >综合模式</a>
          <a
            href="jacascript:void(0)"
            @click="changeTabIndex(2)"
            :class="{'active':tabIndex == 2}"
          >玩法模式</a>
          <a
            href="jacascript:void(0)"
            @click="changeTabIndex(3)"
            :class="{'active':tabIndex == 3}"
          >位置模式</a>

          <div class="filterTime">
            <div class="dayBox">
              <span :class="{'active':dayIndex==1}" @click="changeDayIndex(1)">今天</span>
              <span :class="{'active':dayIndex==2}" @click="changeDayIndex(2)">昨天</span>
              <span :class="{'active':dayIndex==3}" @click="changeDayIndex(3)">前天</span>
            </div>
            <div class="timeBox">
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
        </div>
      </div>

      <div class="trendFilter">
        <!-- 综合模式 -->
        <div class="box zonghe">
          <dl v-show="tabIndex == 2">
            <dt>选择路珠：</dt>
            <dd class="filterLz">
              <a
                href="javascript:;"
                @click="selectDewdrop('big_small')"
                :class="{'active':curDewdrop == 'big_small'}"
              >大小</a>
              <a
                href="javascript:;"
                @click="selectDewdrop('single_double')"
                :class="{'active':curDewdrop == 'single_double'}"
              >单双</a>
              <a
                href="javascript:;"
                @click="selectDewdrop('dragon_tiger')"
                :class="{'active':curDewdrop == 'dragon_tiger'}"
              >龍虎</a>
            </dd>
          </dl>
          <dl v-show="tabIndex == 1 ||  tabIndex == 2">
            <dt>筛选名次：</dt>
            <dd class="filter-mc clearfix">
              <label
                v-for="(item,index) in titleList"
                @click="checkedSingle(item)"
                :class="{'active':item.isChecked}"
                :key="index"
              >
                <b>
                  <i v-show="item.isChecked">
                    <i class="fa fa-check"></i>
                  </i>
                </b>
                <span>{{item.location_name}}</span>
              </label>
              <div class="btn">
                <a href="javascript:;" @click="allChecked" class="chooseAll">全选</a>
                <a href="javascript:;" @click="clearChecked" class="cleanAll">清空</a>
              </div>
            </dd>
          </dl>
          <dl v-show="tabIndex == 3">
            <dt>选择路珠：</dt>
            <dd class="filter-mc filterLz">
              <a
                href="javascript:;"
                v-for="(item,index) in titleList"
                @click="onlyOneTitle(index)"
                :key="index"
                :class="{'active':item.isChecked}"
              >{{item.location_name}}</a>
            </dd>
          </dl>
          <dl v-show="tabIndex == 1 || tabIndex == 3">
            <dt v-show="tabIndex == 1">选择路珠：</dt>
            <dt v-show="tabIndex == 3">筛选名次：</dt>
            <dd class="filter-lz">
              <label
                :class="{'active':dd.isLuzu}"
                v-for="(dd,k) in playList"
                :key="dd.type+k"
                @click="dd.isLuzu = !dd.isLuzu"
              >
                <b>
                  <i v-show="dd.isLuzu">
                    <i class="fa fa-check"></i>
                  </i>
                </b>
                <span>{{dd.type_name}}</span>
              </label>
            </dd>
          </dl>
        </div>
      </div>
      <!-- 露珠走势 -->
      <div v-if="glassBeadList.length == 0" class="loading-img">
        <img src="../../../assets/images/Ellipsis-1s-100px.gif" alt="">
      </div> 
      <div
        v-else
        v-for="(item,index) in glassBeadList && glassBeadList.list"
        v-show="titleList[index].isChecked"
        :key="index"
      >
        <Trend
          :list="obj"
          v-for="(obj,key) in item"
          :cIndex="key"
          v-show="playList[key] && playList[key].isLuzu"
          :title="glassBeadList.title"
          :pIndex="index"
          :name="item.location_name"
          :key="key"
        />
      </div>
    </div>
  </div>
</template>


<script>
import Datepicker from "vuejs-datepicker";
import { zh } from "vuejs-datepicker/dist/locale";
import { mapActions, mapGetters } from "vuex";
import { getCurTime, formatTime, changeTime } from "@/assets/js/utils";
import Trend from "./trend";

export default {
  name: "louZhu",
  data() {
    return {
      curSelectTime: new Date(),
      tabIndex: 1, // 切换玩法索引
      dayIndex: 1, // 切换日期索引
      dateOption: {
        language: zh,
        format: "yyyy-MM-dd"
      },
      glassBeadList: [], // 露珠数据
      titleList: [], //标题
      playList: [], //玩法
      curDewdrop: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getGlassBeadTrendFunc(this.curLotteryCode, getCurTime("YYYY-MM-DD"));
    });
  },
  methods: {
    ...mapActions(["getGlassBeadTrend"]),

    // 选择露珠
    selectDewdrop(type) {
      // console.log(this.playList);
      this.playList.forEach(item => {
        if (type == item.type) {
          item.isLuzu = true;
        } else {
          item.isLuzu = false;
        }
      });
      this.curDewdrop = type;
    },

    // 单选
    checkedSingle(item) {
      item.isChecked = !item.isChecked;
      console.log(item.isChecked);
    },

    // 全选
    allChecked() {
      this.titleList.forEach(item => {
        this.$set(item, "isChecked", true);
      });
    },

    // 清除选择
    clearChecked() {
      this.titleList.forEach(item => {
        this.$set(item, "isChecked", false);
      });
    },

    // 选择日期
    selectedTime() {
      if (
        formatTime(this.curSelectTime, "YYYY-MM-DD") ==
        changeTime(new Date(), -1, "YYYY-MM-DD")
      ) {
        this.dayIndex = 2;
      } else if (
        formatTime(this.curSelectTime, "YYYY-MM-DD") ==
        changeTime(new Date(), -2, "YYYY-MM-DD")
      ) {
        this.dayIndex = 3;
      }
      this.getGlassBeadTrendFunc(
        this.curLotteryCode,
        formatTime(this.curSelectTime, "YYYY-MM-DD")
      );
    },

    // 获取露珠
    getGlassBeadTrendFunc(code, date) {
      // 清空露珠数据 显示loading
      this.glassBeadList = []
      this.getGlassBeadTrend({ code: code, open_date: date }).then(res => {
        if (res.code == 200) {
          let tempArr = [];
          this.titleList = [];
          this.playList = [];
          this.glassBeadList = res.data;
          this.glassBeadList &&
            this.glassBeadList.title.forEach((item, index) => {
              this.$set(item[0], "isChecked", true);
              this.titleList.push(item[0]);
              if (index == 0) {
                tempArr = item;
              }
            });
          tempArr.forEach(item => {
            this.$set(item, "isLuzu", true);
            this.playList.push(item);
          });
          this.changeTabIndex(this.tabIndex);
        }
      });
    },

    // 重置名次
    resetTitleList() {
      this.titleList.forEach(item => {
        item.isChecked = true;
      });
    },

    // 重置玩法
    resetPlayList() {
      this.playList.forEach(item => {
        item.isLuzu = true;
      });
    },

    // 单选名次
    onlyOneTitle(index) {
      this.titleList.forEach((item, i) => {
        if (index == i) {
          item.isChecked = true;
        } else {
          item.isChecked = false;
        }
      });
    },

    //   切换玩法
    changeTabIndex(index) {
      if (index == 2) {
        this.selectDewdrop("big_small");
        this.resetTitleList();
      } else if (index == 1) {
        this.resetPlayList();
        this.resetTitleList();
      } else if (index == 3) {
        this.resetPlayList();
        this.onlyOneTitle(0);
      }
      this.tabIndex = index;
    },
    // 切换日期
    changeDayIndex(index) {
      let date = formatTime(new Date(), "YYYY-MM-DD");
      if (index == 1) {
        date = formatTime(new Date(), "YYYY-MM-DD");
      } else {
        date = changeTime(new Date(), -(index - 1), "YYYY-MM-DD");
      }
      this.curSelectTime = date;
      this.getGlassBeadTrendFunc(this.curLotteryCode, date);
      this.dayIndex = index;
    }
  },
  components: {
    Datepicker,
    Trend
  },
  computed: {
    ...mapGetters(["curLotteryCode", "socketOpenResult","lotteryCodes"]),
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
      if (this.curCodeInfo.is_road_beads == 0) {
        this.$router.push("./historyData");
      }
      this.getGlassBeadTrendFunc(this.curLotteryCode, getCurTime("YYYY-MM-DD"));
    },
    socketOpenResult: function() {
      if (
        this.socketOpenResult.code == this.curLotteryCode &&
        formatTime(this.curSelectTime, "YYYY-MM-DD") == getCurTime("YYYY-MM-DD")
      ) {
        this.getGlassBeadTrendFunc(
          this.curLotteryCode,
          getCurTime("YYYY-MM-DD")
        );
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.loading-img{
  text-align: center
}
.louZhu {
  .data {
    padding: 20px;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    .title {
      position: relative;
      border-bottom: 1px solid #e5e5e5;
      .filterTop {
        overflow: auto;
        a {
          display: inline-block;
          width: 110px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          float: left;
          font-size: 14px;
          color: #333;
          text-decoration: none;
          transition: all 0.3s;
          &:hover,
          &.active {
            background: #666;
            color: #fff;
          }
        }
      }
    }
    .filterTime {
      float: right;
      position: absolute;
      right: 0;
      top: 0px;
      .timeBox {
        display: inline-block;
        border: 1px solid #ddd;
        position: relative;
        right: 0;
        top: -4px;
        .datepicker {
          display: inline-block;
        }
        span {
          display: inline-block;
          float: left;
          padding: 0 10px;
          font-size: 16px;
          height: 30px;
          line-height: 30px;
          background: #f1f1f1;
        }
      }
      .dayBox {
        height: 28px;
        display: inline-block;
        margin-right: 20px;
        span {
          display: inline-block;
          height: 28px;
          line-height: 28px;
          width: 45px;
          text-align: center;
          float: left;
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
      .datepicker {
        line-height: 30px;
      }
    }
    .trendFilter {
      padding: 15px 0 8px;
      font-size: 13px;
      dl {
        padding: 3px 0 0;
        overflow: hidden;
        line-height: 26px;

        dt {
          float: left;
          width: 72px;
        }
        dd {
          width: 888px;
          float: left;
          label {
            display: inline-block;
            margin: 0 11px 10px 0;
            user-select: none;
            cursor: pointer;
            &:hover {
              color: #e73f3f;
            }
            &.active {
              color: #e73f3f;
              border-color: #e73f3f;
              b {
                color: #e73f3f;
                border-color: #e73f3f;
              }
            }
            b {
              display: inline-block;
              width: 12px;
              height: 12px;
              line-height: 15px;
              text-indent: 1px;
              border: 1px solid #c1c1c1;
              float: left;
              margin: 6px 6px 0 0;
              font-size: 13px;
              color: #999;
              svg {
                width: 80%;
                height: 100%;
                vertical-align: baseline;
                line-height: 15px;
              }
            }
          }
          a {
            margin: 0 10px 0 0;
            color: #fff;
            width: 46px;
            display: inline-block;
            float: left;
            height: 24px;
            line-height: 24px;
            border-radius: 3px;
            border: 1px solid #e5e5e5;
            background: #fafafa;
            text-align: center;
          }
          &.filterLz {
            a {
              color: #666;
              &:hover,
              &.active {
                background: #fff7f7;
                border-color: #ffabab;
              }
            }
          }
          .btn {
            float: right;
            a {
              &.chooseAll {
                border-color: #666;
                background: #666;
              }
              &.cleanAll {
                background: #e73f3f;
                border-color: #e73f3f;
              }
              &:hover {
                opacity: 0.85;
              }
            }
          }
        }
      }
    }
  }
}
</style>
