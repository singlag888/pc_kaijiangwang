<template>
  <div class="footer">
    <ul>
      <li>声明：本网资讯仅供彩票爱好者浏览、购买彩票参考之用。任何人不得用于非法用途，否则责任自负。</li>
      <li>本网所登载广告均为广告客户的个人意见及表达方式，和本网无任何关系。</li>
      <li>Copyright © {{address}} All Rights Reserved.</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "vfooter",
  data(){
      return {
          address: window.location.origin
      }
  },
  computed: {
    ...mapGetters(["baseSettingData"])
  }
};
</script>


<style lang="scss" scoped>
.footer {
  ul {
    margin: 0 auto;
    width: 1200px;
    text-align: center;
    line-height: 35px;
    box-sizing: border-box;
  }
  
}
</style>
