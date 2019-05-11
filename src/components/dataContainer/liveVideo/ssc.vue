<template>
  <div class="live sscLive">
    ssc
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "sscLive",
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {

    });
  },
  methods: {

  },
  computed: {
    ...mapGetters(["curLotteryCode","openResult","lotteryCodes"]),
  },
};
</script>
<style lang="scss" scoped>

</style>
