import Vue from 'vue';

// loading
export const imgLoading =state=> state.imgLoading;

// 是否暂无数据
export const isNoContent =state=> state.isNoContent;

// 当前彩种code
export const curLotteryCode =state=> state.curLotteryCode;

// 当前彩种类型
export const cur_lottery_type =state=> state.cur_lottery_type;

// 文章分类
export const articleCategory =state=> state.articleCategory;

// 彩种编码
export const lotteryCodes =state=> state.lotteryCodes;

// 广告分组
export const adList =state=> state.adList;

// 基础数据
export const lotteryData =state=> state.lotteryData;

// 基础配置数据
export const baseSettingData =state=> state.baseSettingData;

// 当前彩种开奖结果
export const openResult =state=> state.openResult;

// 历史开奖title
export const historyTitle =state=> {
    state.historyTitle && state.historyTitle.forEach(item=>{
        if(!Array.isArray(item)){
            let len = state.lotteryData.length>0 ? state.lotteryData[0].data[item.type].length : 0;
            Vue.set(item,'len',len);
        }
    });
    return state.historyTitle;
};

// 保存历史数据 code_type
export const lotteryType =state=> state.lotteryType;

//长龙数据
export const dragonData =state=> state.dragonData;

//当前彩种所有球号
export const curLotteryNumbers =state=> state.curLotteryNumbers;

//websocket开奖结果
export const socketOpenResult =state=> state.socketOpenResult;

//websocket計劃
export const socketPlanResult =state=> state.socketPlanResult;

//websocket 时间
export const socketUpdateTime =state=> state.socketUpdateTime;

//大小单双分布
export const screeningParameter =state=> state.screeningParameter;

// 计划参数
export const numberPlanParams =state=> state.numberPlanParams;