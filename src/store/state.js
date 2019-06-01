
const state = {
    // loading
    imgLoading:[
        {name: 'sidesTotal', show: false},
        {name: 'dragonData', show: false},
        {name: 'historyData', show: false},
        {name: 'basicTrend', show: false},
        {name: 'hotNumber', show: false},
        {name: 'louZhu', show: false},
        {name: 'numberPlan', show: false}
    ],
    // 是否暂无数据
    isNoContent: false,
    // 当前彩种code
    curLotteryCode: 'bjpk10',
    // 当前彩种类型
    cur_lottery_type: 'pk10',
    // 文章分类
    articleCategory: {},
    // 彩种编码
    lotteryCodes: [],
    // 广告列表
    adList: [],
    // 基础数据
    lotteryData: [],
    // 基础配置数据
    baseSettingData: {},
    //长龙数据
    dragonData: [],
    // 当前彩种开奖结果
    openResult: {},
    // websocket开奖结果
    socketOpenResult: {},
    // websocket計劃
    socketPlanResult: {},
    // websocket 时间
    socketUpdateTime: {},
    // 历史开奖title
    historyTitle: [],
    // 保存历史数据 code_type
    lotteryType: '',
    // 当前彩种所有球号
    curLotteryNumbers: [],
    // 大小单双分布
    screeningParameter:[],
    // 计划参数
    numberPlanParams: {expertId: 0, location: 0, forecastQuantity: 0}
};

export default state;
