// 引入 CSS
import '../public/css/public.css';
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入折线图
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
let {AllModule,funct} = require('./datas');
let colors = ['#FCD85A','#0084C8','#D8514B','#9CCB63'];
var myChart = echarts.init(document.getElementById('main'));
let option = funct.firstPieChart(colors);
myChart.setOption(option,true);
 myChart.on('click',function(){
        let url = './pie2.html';
        window.location.href = url;
})
