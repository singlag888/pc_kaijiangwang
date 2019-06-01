import * as types from './mutationsTypes';
import * as api from '@/api/api';
import { saveAccessToken } from '@/assets/js/cache';
import { getCurTime } from "@/assets/js/utils";
import Vue from 'vue'
import storage from "good-storage";

export const getTest = ({
  commit,
  state
}) => {
  return api.getTest();
}
// 修改当前彩种code 
export const chengecurLotteryCode = ({
  commit,
  state
}, code) => {
  commit(types.CUR_LOTTERY_CODE, code);
}

// 修改当前彩种类型
export const chenge_cur_lootery_type = ({
  commit,
  state
}, type) => {
  commit(types.CUR_LOTTERY_TYPE, type);
}


// 获取access token
export const getAccessToken = ({
  commit,
  state,
  dispatch
}) => {
  return api.getAccessToken().then((res) => {
    if (res.code == 200) {
      // 保存assess token
      saveAccessToken(res.data.access_token);

      // 获取基础参数
      dispatch('getSetting');

      // 彩种编码
      // dispatch('getLotteryCodes');

    } else {
      return 404;
    }
  }).catch(e => {
    // return 408;
  });
}

// 获取基础数据
export const getLotteryData = ({
  commit,
  state
}, params) => {
  // 清空数据显示loading
  commit(types.LOTTERY_DATA, []);
  commit(types.IMG_LOADING, {name: 'historyData', show: true});
  return api.getLotteryData(params).then((res) => {
    if (res.code == 200) {
      // 无数据状态
      if(res.data.rows.length == 0) {
        commit(types.IS_NO_CONTENT, true);
      }else {
        commit(types.IS_NO_CONTENT, false);
      }
      // 保存基础数据
      commit(types.LOTTERY_DATA, res.data && res.data.rows);
      // 保存历史数据 code_type
      commit(types.LOTTERY_TYPE, res.data && res.data.code_type);
      // 保存历史开奖title
      commit(types.HISTORY_TITLE, res.data && res.data.history_data_fields);
      // 保存当前彩种所有球号
      commit(types.CUR_LOTTERY_NUMBERS, res.data && res.data.lottery_numbers);
      // 保存当前彩种大小单双分布
      commit(types.SCREENING_PARAMETER, res.data && res.data.screeningParameter);
      commit(types.IMG_LOADING, {name: 'historyData', show: false});
    } else {
      //console.log(res)
    }
  }).catch(e => {
    //console.log(e)
  });
}

// 获取文章列表
export const getArticles = ({
  commit,
  state
}, params) => {
  return api.getArticles(params);
}


// 获取文章详情
export const getArticlesInfo = ({
  commit,
  state
}, id) => {
  return api.getArticlesInfo(id);
}

// 获取双面统计
export const getSidesTotal = ({
  commit,
  state
}, params) => {
  commit(types.IMG_LOADING, {name: 'sidesTotal', show: true});
  return api.getSidesTotal(params);
}

// 获取长龙提醒
export const getLongDragon = ({
  commit,
  state
}, params) => {
  // 清空数据显示loading
  commit(types.SAVE_CHANGLONG_DATA, []);
  commit(types.IMG_LOADING, {name: 'dragonData', show: true});
  return api.getLongDragon(params).then((res) => {
    if (res.code == 200) {
      // todo
      commit(types.SAVE_CHANGLONG_DATA, res.data);
      commit(types.IMG_LOADING, {name: 'dragonData', show: false});
    } else {
      //console.log(res)
    }
  }).catch(e => {
    //console.log(e)
  });
}

// 获取基本趋势-统计
export const getBasicTrend = ({
  commit,
  state
}, params) => {
  commit(types.IMG_LOADING, {name: 'basicTrend', show: true});
  return api.getBasicTrend(params)
}

// 获取文章分类
export const getArticleCategory = ({
  commit,
  state
}, params) => {
  return api.getArticleCategory(params).then((res) => {
    if (res.code == 200) {
      commit(types.ARTICLE_CATEGORY, res.data);
    } else {
      //console.log(res)
    }
  }).catch(e => {
    //console.log(e)
  });
}



// 广告列表
export const getAdvertisement = ({
  commit,
  state
}, params) => {
  return new Promise((resove, reject) => {
    api.getAdvertisement(params).then((res) => {
      resove(res);
      if (res.code == 200) {
        commit(types.AD_LIST,res.data);
      } else {
        //console.log(res)
      }
    }).catch(e => {
      //console.log(e)
    });
  });
  

}

// 彩种编码
export const getLotteryCodes = ({
  commit,
  state
}, params) => {
  return api.getLotteryCodes(params).then((res) => {
    if (res.code == 200) {
      commit(types.LOTTERY_CODES, res.data);
      //console.log(res)
    } else {
      //console.log(res)
    }
  }).catch(e => {
    //console.log(e)
  });
}

// 路珠走势
export const getGlassBeadTrend = ({
  commit,
  state
}, params) => {
  commit(types.IMG_LOADING, {name: 'louZhu', show: true});
  return api.getGlassBeadTrend(params);
}

// 开奖信息
export const getLotteryExpect = ({
  commit,
  state
}, code) => {
  api.getLotteryExpect(code).then(res => {
    if (res.code == 200) {
      commit(types.OPEN_RESULT,res.data);
    }
  });;
}

// 基础参数
export const getSetting = ({
  commit,
  state
}) => {
  api.getSetting().then(res => {
    if (res.code == 200) {
      document.title = res.data.site_title;
      document.querySelector('#favicon').setAttribute('href',res.data.site_favicon);
      commit(types.BASE_SETTING_DATA, res.data);
      if(storage.get('pc_headerImg') == '') {
        storage.set('pc_headerImg', state.baseSettingData.site_logo)
      }else {
        if(storage.get('pc_headerImg') == state.baseSettingData.site_logo) {
          return
        } else {
          storage.set('pc_headerImg', state.baseSettingData.site_logo)
        }
      }
    } else {
      // todo
    }
  });
}

// 冷热号码
export const getColdAndHotNumbers = ({
  commit,
  state
}, code) => {
  commit(types.IMG_LOADING, {name: 'hotNumber', show: true});
  return api.getColdAndHotNumbers(code);
}

// 预测计划
export const getForecastPlan = ({
  commit,
  state
}, params) => {
  commit(types.IMG_LOADING, {name: 'numberPlan', show: true});
  return api.getForecastPlan(params);
}

// 首页预测计划
export const getForecastPlanIndex = ({
  commit,
  state
}, params) => {
  return api.getForecastPlanIndex(params);
}

// 预测计划 -- 概貌 
export const getforecastOverview = ({
  commit,
  state
}, code) => {
  return api.getforecastOverview(code);
}

// 预测计划-排行榜
export const getForecastRanking = ({
  commit,
  state
}, code) => {
  return api.getForecastRanking(code);
}