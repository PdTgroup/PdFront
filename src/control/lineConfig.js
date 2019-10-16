import '../public/css/public.css';
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入折线图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/dataZoom');
require('echarts/lib/component/legend');
require('echarts/lib/component/legendScroll');
let {lineData,funct} = require('./datas');
// let colors = ['#FFA597','#8CD43F','#FCD85A','#0084C8','#D8514B'];//自定义色系
let colors = [
    '#0084C8','#27C2C1','#9CCB63','#D8514B',
    '#61A0A8','#F6731B','#FFA597','#84E4DD',
    '#FCD85A','#C39705','#72B332','#27C2C1',
    '#9CCB63', '#D8514B','#0084C8','#F6731B',
    '#FFA597',

];//自定义色系
let selectedCity = {
    '平顶山': true,
    '安阳': false,
    '鹤壁': false,
    '济源': false,
    '焦作': false,
    '开封': false,
    '洛阳': false,
    '漯河': false,
    '南阳': false,
    '濮阳': false,
    '三门峡': false,
    '商丘': false,
    '新乡': false,
    '信阳': false,
    '许昌': false,
    '郑州': false,
    '周口': false,
    '驻马店': false,
};//自定义默认选中城市
let myChart = echarts.init(document.getElementById('main'));
let option = funct.lineChart(colors,selectedCity);
myChart.setOption(option);
myChart.on('legendselectchanged', function(params) {
    let stack = 0;
    let defaultCityName ='平顶山';
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

