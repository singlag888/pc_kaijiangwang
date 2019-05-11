import * as types from './mutationsTypes'

const mutations = {
  // loading
  // [types.SHOW_LOADING](state, data) {
  //   state.showLoading = data;
  // },

  // 当前彩种code
  [types.CUR_LOTTERY_CODE](state, code) {
    state.curLotteryCode = code;
  },

  // 当前彩种类型
  [types.CUR_LOTTERY_TYPE](state, type) {
    state.cur_lottery_type = type;
  },

  // 文章分类
  [types.ARTICLE_CATEGORY](state, obj) {
    state.articleCategory = obj;
  },

  // 彩种编码
  [types.LOTTERY_CODES](state, list) {
    state.lotteryCodes = list;
  },

  // 广告分组
  [types.AD_LIST](state, list) {
    state.adList = list;
  },

  // 基础数据
  [types.LOTTERY_DATA](state, list) {
    state.lotteryData = list;
  },

  // 基本趋势-统计
  [types.BASIC_TREND](state, list) {
    state.basicTrend = list;
  },

  // 基础配置数据
  [types.BASE_SETTING_DATA](state, obj) {
    state.baseSettingData = obj;
  },

  // 当前彩种开奖结果
  [types.OPEN_RESULT](state, obj) {
    state.openResult = obj;
  },

  // 历史开奖title
  [types.HISTORY_TITLE](state, list) {
    state.historyTitle = list;
  },

  //长龙数据
  [types.SAVE_CHANGLONG_DATA](state, list) {
    state.dragonData = list;
  },

  //当前彩种所有球号
  [types.CUR_LOTTERY_NUMBERS](state, list) {
    state.curLotteryNumbers = list;
  },

  //websocket开奖结果
  [types.SOCKET_OPEN_RESULT](state, obj) {
    state.socketOpenResult = obj;
  },

  //websocket計劃
  [types.SOCKET_PLAN_RESULT](state, obj) {
    state.socketPlanResult = obj;
  },

  //大小单双分布
  [types.SCREENING_PARAMETER](state, list) {
    state.screeningParameter = list;
  }
};

export default mutations;
