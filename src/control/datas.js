//引入json数据
let {barData} = require('./json/barData.json');
let {lineData} = require('./json/lineData.json');
let {IndexsOfModule} = require('./json/IndexsOfModule.json');
let {AllModule} = require('./json/AllModule.json');
//获取指标单位  通用
let normalUnit = function (data) {
    return data.indexInfo.unit
};
/**
 * @namespace normalCity 获取18地市对象  柱形图
 * **/
let normalCity = function(){
  let citys = [];
  for (let i=0; i<18; i++){
      citys.push(barData.cityScore[i]);
  }
  return citys;
};
/**
 * @namespace sortNewcity 获取排序过后的18地市对象  柱形图
 * @param symbol  传入排序符号(>/<)
 * **/
let sortNewcity = function(symbol){
    let sortCitys = [];
    for (let i=0;i<18;i++){
        sortCitys.push(barData.cityScore[i]);
    }
    if(symbol === '>'){
        for (let i = 0; i < sortCitys.length - 1; i++) {
            for (let j = 0; j < sortCitys.length - 1 - i; j++) {
                if (sortCitys[j].datas > sortCitys[j + 1].datas) {
                    let temp = sortCitys[j]
                    sortCitys[j] = sortCitys[j + 1]
                    sortCitys[j + 1] = temp
                }
            }
        }
    }else{
        for (let i = 0; i < sortCitys.length - 1; i++) {
            for (let j = 0; j < sortCitys.length - 1 - i; j++) {
                if (sortCitys[j].datas < sortCitys[j + 1].datas) {
                    let temp = sortCitys[j]
                    sortCitys[j] = sortCitys[j + 1]
                    sortCitys[j + 1] = temp
                }
            }
        }
    }
    return sortCitys;
}
/**
 * @namespace getCityName 获取18地市名  通用
 * @param cityArry  18地市数组(排序/非排序)
 * **/
let getCityName = function(cityArry){
    let cityNames = [];
    for (let i=0; i<18; i++){
        cityNames.push(cityArry[i].cityName);
    }
    return cityNames;
}
/**
 * @namespace getCityScore 获取某地市的得分  通用
 * @param cityArry  18地市数组(排序/非排序)
 *        cityName  地市名
 * **/
let getCityScore = function(cityArry){
    let cityScores = [];
    for (let i=0; i<cityArry.length; i++){
        cityScores.push(cityArry[i].datas);
    }
    return cityScores;
    /*if (arguments.length==1){
        for (let i=0; i<cityArry.length; i++){
            cityScores.push(cityArry[i].datas);
        }
        return cityScores;
    }
    else{
        for (let i=0;i<cityArry.length;i++){
            if(cityName === cityArry[i].cityName){
                return cityArry[i].datas
            }
        }
    }*/
    /*for (let i=0;i<cityArry.length;i++){
        if(cityName === cityArry[i].cityName){
            return cityArry[i].datas
        }
    }*/
}
/**
 * @namespace getScorePositive 获取18地市高于平均分的值   柱形图
 * @param cityArry  18地市数组(排序/非排序)
 * **/
let getScorePositive = function(cityArry){
    let indexAvg = barData.cityScore[20].datas;
    let arr = [];
    for(let i=0; i<cityArry.length; i++) {
        let numArry = parseFloat((cityArry[i].datas - indexAvg).toFixed(2));
        if (numArry < 0) {
            numArry = 0;
        }
        arr.push(numArry);
    }
    return arr;
}
/**
 * @namespace getScoreNegative 获取18地市低于平均分的值   柱形图
 * @param cityArry  18地市数组(排序/非排序)
 * **/
let getScoreNegative = function(cityArry){
    let indexAvg = barData.cityScore[20].datas;
    let arr = [];
    for(let i=0; i<cityArry.length; i++) {
        let numArry = parseFloat((cityArry[i].datas - indexAvg).toFixed(2));
        if (numArry < 0) {
            numArry = Math.abs(numArry);
        }else{
            numArry = 0;
        }
        arr.push(numArry);
    }
    return arr;
}
/**
 * @namespace getIndicatorValue 获取某个指标的所有季度值(不包括期初值)   折线图
 * **/
let getIndicatorValue = function(){
    let indicatorData = lineData.indexCycle.time;
    let newIndex = [];
    for (let i=0;i<indicatorData.length;i++){
        if (indicatorData[i] != '期初值'){
            newIndex.push(indicatorData[i]);
        }
    }
    return newIndex;
}
/**
 * @namespace getLineData  遍历18个地市得分，生成对象   折线图
 * **/
let getLineData = function(){
    let tarArry = [];
    let lineSeriesData = lineData.cityScore;
    for(let i=0;i<18;i++){
        let targetName = lineSeriesData[i].cityName;
        let targetScore = lineSeriesData[i].dataList;
        tarArry.push({
            name: targetName,
            type: 'line',
            data: targetScore
        })
    }
    return tarArry;
}
/**
 * @namespace getIndexOfModule  遍历模块下的所有子指标以及对应数据，生成对象   二级饼图
 * 图
 * **/
let getIndexOfModule = function(){
    let tarArry = [];
    let pieSeriesData = IndexsOfModule.IndexValue;
    for(let i=0;i<pieSeriesData.length;i++){
        let targetName = pieSeriesData[i].indexName;
        let targetScore = pieSeriesData[i].datas;
        tarArry.push({
            name:targetName,
            value:targetScore
        })
    }
    return tarArry;
}
/**
 * @namespace getAllModule  遍历所有模块以及得分，生成对象   一级饼图
 * 图
 * **/
let getAllModule = function(){
    let tarArry = [];
    let pieSeriesData = AllModule.ModuleValue;
    for(let i=0;i<AllModule.ModuleValue.length;i++){
        let targetName = pieSeriesData[i].module;
        let targetScore = pieSeriesData[i].value;
        tarArry.push({
            name:targetName,
            value:targetScore
        })
    }
    return tarArry;
}
let barChart = function(cityArry,defaultCityName){
    let option = {
        //图例标题
        /*title: {
            text: defaultIndicator,
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 12
            }
        },*/
        //图例组件
        legend:{
            show: true,
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15
            }

        },
        //提示框
        tooltip : {
            type: 'axis',
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 14
            },
            formatter: function (params) {
                let xAxisData = getCityName(cityArry);
                let sortIndex = sortNewcity('<');
                let index;
                for(let i=0; i<sortIndex.length; i++){
                    if (xAxisData[params.dataIndex] == sortIndex[i].cityName){
                        index = i;
                        break;
                    }
                }
                return xAxisData[params.dataIndex] + '<br/>'  + params.value + normalUnit(barData) + '<br>' + '排名：' + (index+1)
            }
        },
        //网格 用于调整X轴以及Y轴的位置
        grid:[
            {//底下Y轴
                show: false,
                bottom: '12%',
                containLabel: false,
                height: '40%'
            },
            {//X轴
                show: false,
                top: '48%',
                height: '0%',
                zlevel:100
            },
            {//上边Y轴
                show: false,
                top: '8%',
                containLabel: false,
                height: '40%'
            }
        ],
        xAxis : [
            {
                type: 'category',
                position: 'bottom',
                data: [],
            },
            {//x轴样式
                gridIndex: 1,
                type: 'category',
                position: 'center',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                zlevel:200,
                axisLabel: {
                    show: true,
                    align: 'center',
                    textStyle: {
                        color: '#fff',
                        fontSize: 12
                    },
                    inside: true
                },
                data: getCityName(cityArry),
                name: '城市',
                nameTextStyle: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 12
                }
            },
            {
                gridIndex: 2,
                type: 'category',
                position: 'top',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                data: []
            },
        ],
        yAxis : [
            {
                type: 'value',
                inverse: true,   //echarts Y轴翻转属性,
                position: 'left',   //位置属性
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 12
                    },
                    formatter:function(value) {
                        let item='';
                        if(value==0){
                            item=''
                        }else{
                            item = value;
                        }
                        return item
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#ffffff'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#1B283E',
                        width: 1
                    }
                },
                max: 5,
                splitNumber: 6,
                name: '低于/高于均值' + normalUnit(barData),
            },
            {
                gridIndex: 1,   //对应的是grid  通过grid设置X Y相对位置
                show: false
            },
            {
                gridIndex: 2,
                type: 'value',
                position: 'left',    //双Y轴一个翻转一个不翻转
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 12
                    },
                    formatter:function(value) {
                        let item='';
                        if(value==60){
                            item='0'
                        }else{
                            item = value;
                        }
                        return item
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#1B283E',
                        width: 1
                    }
                },
                min: 65,
                max: 90,
                splitNumber: 5,
                name: normalUnit(barData),
                nameTextStyle: {
                    fontWeight: 'bold'
                }
            }
        ],
        series : [
            {
                gridIndex:0,   //选取调整好的轴,调整图形是向上还是向下
                type:'bar',
                name: '得分',
                barWidth: '55%',
                data:getCityScore(cityArry),
                xAxisIndex: 2,
                yAxisIndex: 2,
                itemStyle:{
                    normal: {
                        color: function (params) {
                            let str1;
                            if (cityArry[params.dataIndex].cityName == defaultCityName){
                                str1='#F8CB7F'
                            }
                            else{
                                str1 = '#76DA91'
                            }
                            return str1;
                        }
                    },
                }
            },
            {
                gridIndex:2,  ////选取调整好的轴,调整图形是向上还是向下
                type:'bar',
                name: '超过平均分',
                barWidth: '55%',
                data:getScorePositive(cityArry),
                itemStyle: {
                    color:'#60C1DE'
                },
                stack: '总量',
            },
            {
                gridIndex:2,  ////选取调整好的轴,调整图形是向上还是向下
                type:'bar',
                name: '低于平均分',
                barWidth: '55%',
                data:getScoreNegative(cityArry),
                itemStyle: {
                    color:'#C23531'
                },
                stack: '总量',
            }
        ]
    };
    return option;
}
let lineChart = function(colors,selectedCity){
    let option = {
        tooltip: {
            trigger: 'axis',
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 14
            }
        },
        color: colors,
        dataZoom: [
            {
                startValue: '1703',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                },
                textStyle: {
                    color: '#fff'
                }
            },
            {
                type: 'inside'
            }
        ],
        legend: {
            type:'scroll',
            orient: 'vertival',
            right: 10,
            top: 20,
            bottom: 20,
            selectedMode: 'multiple',
            selected: selectedCity,
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15
            }
        },
        xAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff',
                    fontSize: 12
                },
                nameTextStyle: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 12
                }
            },
            data: getIndicatorValue(),//该指标的周期值（指标值）
            name: "季度"
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} '
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            textStyle: {
                color: '#fff',
                fontSize: 12
            },
            nameTextStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 12
            },
            name: normalUnit(lineData),
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#1B283E',
                    width: 1
                }
            },
            min: 70
        },
        series : getLineData()
    };
    return option;
}

let firstPieChart = function(colors){
    let option = {
        tooltip : {
            trigger: 'item',
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 14
            },
            formatter:function (params) {
                let moduleName = AllModule.ModuleValue[params.dataIndex].module;
                let moduleScore = AllModule.ModuleValue[params.dataIndex].value;
                let indexScore = AllModule.ModuleValue[params.dataIndex].allscore;
                let indexAllScore = 0;
                for (let i=0;i<AllModule.ModuleValue.length;i++){
                    indexAllScore += AllModule.ModuleValue[i].value;
                }
                let GDP = ((moduleScore/indexAllScore)*100).toFixed(2);
                return  moduleName +"<br />得分："+moduleScore+"<br/>满分："+indexScore+"<br>占比：" + GDP+"%"
            }
        },
        legend: {
            orient: 'vertical',
            right: '3%',
            top:'20%',
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15
            }
        },
        color: colors,
        series : [
            {
                type: 'pie',
                radius : '80%',
                center: ['50%', '50%'],
                data:getAllModule(),
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    return option;
}
let secondPieChart = function(colors){
    let option = {
        tooltip : {
            trigger: 'item',
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 14
            },
            formatter:function (params) {
                let moduleName = IndexsOfModule.IndexValue[params.dataIndex].indexName;
                let moduleScore = IndexsOfModule.IndexValue[params.dataIndex].datas;
                let indexScore = IndexsOfModule.IndexValue[params.dataIndex].indexScore;
                let moduleAllScore = IndexsOfModule.Module.sum;
                let GDP = ((indexScore/moduleAllScore)*100).toFixed(2);
                return  moduleName +"<br />得分："+moduleScore+"<br/>满分："+indexScore+"<br>占比：" + GDP+"%"
            }
        },
        legend: {
            orient: 'vertical',
            right: '3%',
            top:'15%',
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15
            }
        },
        color: colors,
        series : [
            {
                type: 'pie',
                radius : '80%',
                center: ['50%', '50%'],
                data:getIndexOfModule(),
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    return option;
}

let funct ={//所有方法的集合
    normalCity,//传入子指标/指标值，获取对应索引号，通用
    sortNewcity,
    getCityName,
    getCityScore,
    getScorePositive,
    getScoreNegative,
    barChart,//柱形图
    lineChart,//柱形图
    firstPieChart,
    secondPieChart
}
module.exports ={
    barData:{barData},
    lineData:{lineData},
    IndexsOfModule:{IndexsOfModule},
    AllModule:{AllModule},
    funct:funct
};