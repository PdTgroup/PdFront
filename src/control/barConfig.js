// 引入 CSS
import '../public/css/public.css';
import '../public/css/bar.css';
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入折线图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legendScroll');
// let {city,ascension,func} = require('./data');
let {barData,funct} = require('./datas');
// let defaultIndicator = '主网工程造价准确率';//默认指标名
let defaultCityName = '平顶山';
//定义 bar
/*function barChart(defaultIndicator,cityArry,defaultCityName){
    let  myChart = echarts.init(document.getElementById('main'));
    let option = func.barChart(defaultIndicator,cityArry,defaultCityName)
    myChart.setOption(option,true);
};*/

function barChart(cityArry,defaultCityName){
    let  myChart = echarts.init(document.getElementById('main'));
    let option = funct.barChart(cityArry,defaultCityName)
    myChart.setOption(option,true);
};

function loadBar(){
    barChart(funct.normalCity(),defaultCityName);
};
document.getElementsByTagName('body').onload = loadBar();
document.getElementById('normal').onclick = function(){
    barChart(funct.normalCity(),defaultCityName)
};
document.getElementById('highSort').onclick = function(){
    barChart(funct.sortNewcity('<'),defaultCityName)
};
document.getElementById('lowSort').onclick = function(){
    barChart(funct.sortNewcity('>'),defaultCityName)
};