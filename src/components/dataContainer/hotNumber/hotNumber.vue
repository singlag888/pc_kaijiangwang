<template>
  <div class="hotNumber pageWidth">
    <div class="hotnumberContainer">
      <h2>冷热分析</h2>
      <hr>
      <p class="titleText">
        近{{curLength}}期内
        <span class="hot">热码</span>：出现频繁、活跃的号码；
        <span class="cold">冷码</span>：出现频率低甚至没有出现的号码；
        <span class="warm">温码</span>：介于冷热之间的号码。
      </p>
      <div class="hotNumberTableContainer">
        <table border="1">
          <tr>
            <th width="110">球号</th>
            <th width="345">热</th>
            <th width="400">温</th>
            <th width="345">冷</th>
          </tr>
          <tr v-if="list.length == 0">
            <td colspan="10">
              <img src="../../../assets/images/Ellipsis-1s-100px.gif" alt="">
            </td>
          </tr>
          <tr v-else v-for="(item,index) in list.rows" :key="index">
            <td>{{item[0]}}</td>
            <td>
              <openCode :codeType="list.code_type" :result="item[1]"/>
            </td>
            <td>
              <openCode :codeType="list.code_type" :result="item[2]"/>
            </td>
            <td>
              <openCode :codeType="list.code_type" :result="item[3]"/>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import openCode from "@/components/base/openCode/openCode.vue";
export default {
  name: "hotNumber",
  components: { openCode },
  data() {
    return {
      list: [],
      curLength: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.curLotteryCode) {
        this.getColdAndHotNumbersFunc(this.curLotteryCode);
      }
    });
  },
  methods: {
    ...mapActions(["getColdAndHotNumbers"]),

    getColdAndHotNumbersFunc(code) {
      // 清空冷热号码 显示loading
      this.list = []
      this.getColdAndHotNumbers(code).then(res => {
        if (res.code == 200) {
          this.curLength = res.data.rows.length;
          this.list = res.data;
        }
      });
    }
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
      if (this.curCodeInfo.is_cold_and_hot_number == 0) {
        this.$router.push("./historyData");
      }
      this.getColdAndHotNumbersFunc(this.curLotteryCode);
    },
    socketOpenResult: function() {
      if (this.socketOpenResult.code == this.curLotteryCode) {
        this.getColdAndHotNumbersFunc(this.curLotteryCode);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.hotnumberContainer {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 1px 1px 3px #ccc;
  padding: 10px;
  margin: 0 0 20px 0;
  h2 {
    font-size: 20px;
    font-weight: 400;
  }
  hr {
    margin: 10px 0;
    background: #e5e5e5;
    border: none;
    height: 1px;
  }
  .titleText {
    padding: 10px;
    .hot {
      color: orangered;
    }
    .warm {
      color: orange;
    }
    .cold {
      color: #3771de;
    }
  }
  .hotNumberTableContainer {
    padding: 10px;
    box-sizing: border-box;
    margin-top: 20px;
    width: 100%;
    table {
      width: 100%;
      text-align: center;
      border: 1px solid #e5e5e5;
      td,
      th {
        padding: 6px 0;
      }
    }
  }
}
</style>
