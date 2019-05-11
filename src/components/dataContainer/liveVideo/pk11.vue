<template>
  <div id="layaContainer" class="live pk10Live" >
    <!-- <canvas id="layaCanvas"></canvas> -->
  </div>
</template>
<script>


import { mapActions, mapGetters } from "vuex";
import {layaGame} from "../../../assets/video/js/game.js";
import  audience from "../../../assets/video/images/audience.jpg";
import  cars_shadow from "../../../assets/video/images/cars-shadow.png";
import  finisher from "../../../assets/video/images/finisher.png";
import  flame_blur from "../../../assets/video/images/flame_blur.png";
import  main_road from "../../../assets/video/images/main-road.jpg";
import  numbersprite from "../../../assets/video/images/numbersprite.png";
import  wind_blur from "../../../assets/video/images/wind_blur.png";
import  trafficlight from "../../../assets/video/images/trafficlight.png";
import  top_header from "../../../assets/video/images/top_header.jpg";
import  vulebtn from "../../../assets/video/images/vulebtn.png";
import  lightgreen from "../../../assets/video/images/lightgreen.png";
import  lightred from "../../../assets/video/images/lightred.png";
import  lightyellow from "../../../assets/video/images/lightyellow.png";
import  jspk10 from "../../../assets/video/images/jspk10.png";
import  resultbg from "../../../assets/video/images/resultbg.jpg";
import  jsft from "../../../assets/video/images/jsft.png";



export default {
  name: "pk10Live",
  data() {
    return {
      gameRes:[
        {
                id: 'audience',
                src: audience
            },
            {
                id: 'cars_shadow',
                src: cars_shadow
            },
            {
                id: 'finisher',
                src: finisher
            },
            {
                id: 'flame_blur',
                src: flame_blur
            },
            {
                id: 'main_road',
                src: main_road
            },
            {
                id: 'numbersprite',
                src: numbersprite
            },
            {
                id: 'wind_blur',
                src: wind_blur
            },
            {
                id: 'trafficlight',
                src: trafficlight
            },
            {
                id: 'top_header',
                src: top_header
            },
            {
                id: 'resultbg',
                src: resultbg
            },
            {
                id: 'vulebtn',
                src: vulebtn
            },
            {
                id: 'lightgreen',
                src: lightgreen
            },
            {
                id: 'lightred',
                src: lightred
            },
            {
                id: 'lightyellow',
                src: lightyellow
            },
            {
                id: 'jspk10',
                src: this.curLotteryCode == 'bjpk10' ?jspk10: jsft
            }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.curLotteryCode)
      this.gameRes.forEach(item=>{
        if(this.curLotteryCode == 'bjpk10' && item.id == 'jspk10'){
          item.src = jspk10;
        }else if(item.id == 'jspk10'){
          item.src = jsft;
        }
      })
      let games = layaGame(this.gameRes);
      console.log(games.getGameResult(1))
    });
  },
  destroyed() {
    console.log('die')
  },
  computed: {
    ...mapGetters(["curLotteryCode", "openResult", "lotteryCodes"])
  },
  watch:{
    
    curLotteryCode(){
      this.gameRes.forEach(item=>{
        if(this.curLotteryCode == 'bjpk10' && item.id == 'jspk10'){
          item.src = jspk10;
        }else if(item.id == 'jspk10'){
          item.src = jsft;
        }
      })
      layaGame(this.gameRes);
    }
  }
};
</script>
<style lang="scss" scoped>
#layaContainer {
  width: 1110px;
  height: 866px;
  position: relative;
}

</style>
