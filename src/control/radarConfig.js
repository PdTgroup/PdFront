import '../public/css/public.css';
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入折线图
require('echarts/lib/chart/radar');
// 引入提示框和标题组件
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/dataZoom');
require('echarts/lib/component/legend');
require('echarts/lib/component/legendScroll');
let {city,ascension,func} = require('./data');
let selectedCity = {
    '平顶山市': true,
    '安阳市': false,
    '鹤壁市': false,
    '济源市': false,
    '焦作市': false,
    '开封市': false,
    '洛阳市': false,
    '漯河市': false,
    '南阳市': false,
    '濮阳市': false,
    '三门峡市': false,
    '商丘市': false,
    '新乡市': false,
    '信阳市': false,
    '许昌市': false,
    '郑州市': false,
    '周口市': false,
    '驻马店市': false,
};//自定义默认选中城市
let cityData = [
    {name: '郑州市', value: [112,153,125,145]},
    {name: '开封市', value: [140,135,120,144]},
    {name: '洛阳市', value: [132,142,103,192]},
    {name: '平顶山市', value: [114,123,105,119]},
    {name: '焦作市', value: [152,145,168,172]},
    {name: '鹤壁市', value: [102,154,168,145]},
    {name: '新乡市', value: [121,126,145,168]},
    {name: '安阳市', value: [112,134,162,191]},
    {name: '濮阳市', value: [102,113,154,187]},
    {name: '许昌市', value: [148,156,170,185]},
    {name: '漯河市', value: [131,152,144,168]},
    {name: '三门峡市', value: [130,145,162,178]},
    {name: '南阳市', value: [121,143,155,146]},
    {name: '商丘市', value: [149,151,172,181]},
    {name: '信阳市', value: [141,135,162,188]},
    {name: '周口市', value: [130,151,126,135]},
    {name: '驻马店市', value: [154,162,155,185]},
    {name: '济源市', value: [143,154,166,178]}
];
let colors = [
    '#0084C8','#27C2C1','#9CCB63','#D8514B',
    '#61A0A8','#F6731B','#FFA597','#84E4DD',
    '#FCD85A','#C39705','#72B332','#27C2C1',
    '#9CCB63', '#D8514B','#0084C8','#F6731B',
    '#FFA597',

];//自定义色系
let myChart = echarts.init(document.getElementById('main'));
let option = func.radarChart(cityData,selectedCity,colors);
myChart.setOption(option);
myChart.on('legendselectchanged', function(params) {
    let stack = 0;
    let defaultCityName ='平顶山市';
    let selectedCity = params.selected;
    let cityName = params.name;
    for(let i in selectedCity){
        if(selectedCity[i]){
            stack++;
        }
    }
    if(stack==4){
        alert('为了能更好的展示数据，建议至多对三个地市进行比较');
        for(let i in selectedCity){
            option.legend.selected[i] = false;
            selectedCity[i] = false;
        }
        selectedCity[defaultCityName] = true;
        selectedCity[cityName] = true;
        option.legend.selected[defaultCityName] = true;
        option.legend.selected[cityName] = true;
        myChart.setOption(option);
    }
});
