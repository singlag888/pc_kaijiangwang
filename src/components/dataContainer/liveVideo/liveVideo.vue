<template>
  <div class="liveVideo">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "liveVideo",
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.$router.push(`/Data/liveVideo/${this.codeType}`);
    });
  },
  methods: {

  },
  watch: {
    codeType() {
      this.$router.push(`/Data/liveVideo/${this.codeType}`);
    },
  },
  computed: {
    ...mapGetters(["curLotteryCode","openResult","lotteryCodes"]),
    codeType() {
      for(let item of this.lotteryCodes){
        if(item && item.code == this.curLotteryCode){
          return item.code_type;
        }
      }
      return 'pk10';
    },
  },
};
</script>
<style lang="scss" scoped>
  .liveVideo {
    width: 100%;
    text-align: center;
    overflow: hidden;
    height:100%;
  }
</style>
