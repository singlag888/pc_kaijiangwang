<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  mounted(){
    this.getLotteryCodes()
  },
  methods:{
    ...mapActions(['getLotteryCodes'])
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
    }
  }
}
</script>

<style>

</style>
