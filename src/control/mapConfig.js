import '../public/css/public.css';
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入折线图
require('echarts/lib/chart/map');
// 引入提示框和标题组件
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/visualMap');
//引入js格式河南省地图
require('echarts/map/js/province/henan');
let {city,ascension,func} = require('./data');
var myChart = echarts.init(document.getElementById('main'));
let splitData = [
    {start: 467, end: 600},
    {start: 466, end: 467},
    {start: 300, end: 465},
    {start: 0, end: 300},
];
let colors = ['#0084C8','#FCD85A'];
let cityData = [
    {
        name: '郑州市',
        value: 100,
        itemStyle: {
                    normal: {
                        areaColor: colors[0]
            }
        }
    },
    {
        name: '开封市',
        value: 400,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    },
    {
        name: '洛阳市',
        value: 100,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    },
    {
        name: '平顶山市',
        value: 466,
        itemStyle: {
            normal: {
                areaColor: colors[1]
            }
        }
    },
    {
        name: '焦作市',
        value: 100,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    },
    {
        name: '鹤壁市',
        value: 300,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    },
    {
        name: '新乡市',
        value: 500,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    },
    {
        name: '安阳市',
        value: 200,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    },
    {
        name: '濮阳市',
        value: 500,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    },
    {
        name: '许昌市',
        value: 200,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    },
    {
        name: '漯河市',
        value: 500,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    },
    {
        name: '三门峡市',
        value: 200,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    },
    {
        name: '南阳市',
        value: 400,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    },
    {
        name: '商丘市',
        value: 600,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    },
    {
        name: '信阳市',
        value: 300,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    },
    {
        name: '周口市',
        value: 600,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    },
    {
        name: '驻马店市',
        value: 300,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    },
    {
        name: '济源市',
        value: 600,
        itemStyle: {
            normal: {
                areaColor: colors[0]
            }
        }
    }
];
let option = func.mapChart(splitData,colors,cityData);
myChart.setOption(option);