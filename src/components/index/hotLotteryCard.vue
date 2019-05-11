<template>
    <ul class="hot">
        <li>
          <dl>
            <dt>
              <a href="javascript:;" @click="goTo(curReslut.code, '/Data/historyData')">
                <img :src="curReslut.logo" width="100">
              </a>
            </dt>
            <dd>
              <span class="getName">
                <strong>
                  <a href="javascript:;" @click="goTo(curReslut.code, '/Data/historyData')">{{curReslut.name}}</a>
                </strong>
                <em>
                  第
                  <b id="qihao" class="col6">{{curReslut.expect}}</b>期
                </em>
              </span>
              <span class="getQ">
                全天共
                <b class="col6" id="total">{{curReslut.today_expect+curReslut.remaining_expect}}</b>期,剩余
                <b class="col6" id="remain">{{curReslut.remaining_expect}}</b>期
              </span>
              <time-down :isLastQs="curReslut.remaining_expect" :time="curReslut.next_open_seconds"/>
            </dd>
            <div class="link">
              <a href="javascript:;" @click="goTo(curReslut.code, '/Data/historyData')">开奖记录</a>
              <a href="javascript:;" @click="goTo(curReslut.code, '/Data/trendChart')">走势图表</a>
            </div>
          </dl>
        </li>
    </ul>
</template>

<script>
import TimeDown from "base/timeDown";
import { mapGetters, mapActions } from "vuex";

export default {
    components: {
        TimeDown
    },
    props: ['result'],
    data() {
        return {
            curReslut: this.result
        };
    },
    computed: {
        ...mapGetters(['socketOpenResult'])
    },
    methods: {
        ...mapActions(['chengecurLotteryCode']),
        goTo(code, path) {
            this.chengecurLotteryCode(code);
            this.$router.push(path);
        }
    },
    mounted() {
        // console.log(this.result)
    },
    watch:{
        result() {
            this.curReslut = this.result;           
        },
        socketOpenResult() {
            if(this.socketOpenResult.code == this.curReslut.code){
                // console.log(this.socketOpenResult)
                this.curReslut = this.socketOpenResult;
            }
        }
    }
};
</script>


<style lang="scss" scoped>
  .hot {
        width: 33.33%;
        padding: 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
        // &:nth-child(3n + 2) {
        //     border-left: 1px solid #e6e6e6;
        //     border-right: 1px solid #e6e6e6;
        // }
    li {
      dl {
        overflow: hidden;
        height: 163px;
        dt {
          float: left;
          width: 110px;
          height: 126px;
          text-align: center;
          img {
            margin-left: 8px;
            margin-top: 7px;
            width: 80%;
          }
        }
        dd {
          float: left;
          height: 126px;
          span {
            display: block;
          }
          span.getName {
            padding-bottom: 8px;
            border-bottom: 1px dashed #eee;
            margin-bottom: 10px;
            strong {
              color: #555;
              font-weight: 400;
              margin-right: 10px;
            }
            em {
              color: #666;
              font-style: normal;
            }
          }
          b {
            color: #f02f22;
            font-style: normal;
            font-weight: 400;
          }
          span.getQ {
            color: #999;
            margin-bottom: 15px;
            padding-left: 10px;
          }
        }
        div.link {
          clear: both;
          text-align: center;
          a {
            display: inline-block;
            color: #555;
            border: 1px solid #e5e5e5;
            border-radius: 3px;
            width: 88px;
            height: 33px;
            line-height: 33px;
            margin-left: 5px;
            margin-right: 5px;
          }
        }
      }
    }
  }

</style>
