<template>
  <div id="app">
    <router-view/>
    <div class="video" v-if="videoUrl != ''">
      <div class="video-close" @click="closeVideo">╳</div>
      <video height="200px" controls="controls" muted autoplay="autoplay" :src="videoUrl"></video>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import { constants } from 'crypto';

export default {
  name: 'App',
  data() {
    return {
      videoUrl: ''
    }
  },
  mounted(){
    this.getLotteryCodes()
  },
  methods:{
    ...mapActions(['getLotteryCodes']),
    closeVideo() {
      this.videoUrl = ''
    }
  },
  computed: {
    ...mapGetters(['baseSettingBase'])
  },
  watch: {
    // 客服
    'baseSettingBase.service_code': {
      handler(val) {
        setTimeout(() => {
          let c = document.createElement('script');
          c.src = val;
          let s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(c, s);
        },2000) 
      }
    },
    // 站点统计
    'baseSettingBase.site_statis': {
      handler(val) {
        setTimeout(() => {
          let c = document.createElement('script');
          c.src = val;
          let s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(c, s);
        },2000)       
      }
    },
    // 视频
    'baseSettingBase.video_url': {
      handler() {
          this.videoUrl = this.baseSettingBase.video_url
      }
    }
  }
}
</script>

<style>
.video-close{
  position: absolute;right: 5px;color: #fff;z-index: 9999999;font-size: 18px;width: 20px;text-align: center;cursor: pointer;
}
.video{
  position: fixed;left: 0;bottom: 0;z-index: 888;
}
</style>
