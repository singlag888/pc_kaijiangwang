<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  mounted(){
    this.$nextTick(()=>{

    })
    this.getLotteryCodes()
  },
  methods:{
    ...mapActions(['getLotteryCodes'])
  },
  computed: {
    ...mapGetters(['baseSettingData'])
  },
  watch: {
    // 客服
    'baseSettingData.service_code': {
      handler(val) {
        let c = document.createElement('script');
        c.src = val;
        let s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(c, s);
      }
    },
    // 站点统计
    'baseSettingData.site_statis': {
      handler(val) {
        let c = document.createElement('script');
        c.src = val;
        let s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(c, s);
      }
    }
  }
}
</script>

<style>

</style>
