<template>
  <div id="app">
    <router-view/>
    <!-- <Loading v-show="showLoading"></Loading> -->
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex';
// import Loading from '@/components/Loading'

export default {
  name: 'App',
  // components: { Loading },
  data() {
    return {
      
    }
  },
  mounted(){
    this.$nextTick(()=>{
      // if(!this.baseSettingData.site_status || this.baseSettingData.site_status == 0){
      //   this.$router.push('/page404');
      // }
    })
    this.getLotteryCodes()
  },
  methods:{
    ...mapActions(['getLotteryCodes']),
  },
  computed: {
    // ...mapGetters(['showLoading'])
    // ...mapState(['baseSettingData'])
  },
}
</script>

<style>

</style>
