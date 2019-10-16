//引入json数据
let {city} = require('./json/citys.json');
let {ascension} = require('./json/ascension.json');

/**
 * @namespace findCityindex 获取城市对应索引号
 * @param params  传入城市名  string类型
 * **/
let findCityindex = function(params){
    let index;
    for (let i=0;i<city.length;i++){
        if (params == city[i].cname){
            index = i;
            return index;
        }
    }
}
/**
 * @namespace findIndex 获取对应索引号
 * @param params  string类型，传入指标名，获取子指标对应的索引号
 *                number类型，传入指标值，获取指标值对应的索引号
 * **/
let findIndex = function(params){
    let index;
    if (typeof params === 'string'){
        for (let i=0;i<ascension.quality.length;i++){
            if (params === ascension.quality[i].indicators ){
                index = i;
                return index;
            }
        }
    } else{
        for (let i=0; i<ascension.quality[0].indicatorValue.length;i++){
            if (params === ascension.quality[0].indicatorValue[i]){
                index = i;
                return index;
            }
        }
    }
}
/**
 * @namespace getIndicatorValue 获取所有指标值
 * @param qualityName   string类型  传入指标名，获取所有指标值
 * **/
let getIndicatorValue = function(indicatorName){
    let index = findIndex(indicatorName);
    return ascension.quality[index].indicatorValue;
}
/**
 * @namespace getIndicatorUnit 获取子指标的单位
 * @param qualityName   string类型  传入指标名，获取指标单位
 * **/
let getIndicatorUnit = function(indicatorName){
    let index = findIndex(indicatorName);
    return ascension.quality[index].unit;
}
/**
 * @namespace getCityname 获取所有城市名
 * **/
let getCityname = function(cityArry){
    let arr = [];
    for (let i=0;i<cityArry.length;i++){
        arr.push(cityArry[i].cname);
    }
    return arr;
}
/**
 * @namespace getCityscore 获取对应的得分序列
 * @param params  string类型   传入城市名，获取该城市的所有指标值的得分
 *                number类型， 传入指标值，获取该指标对应的所有城市的得分(返回数组)
 * **/
let getCityscore = function(params,cityArry){
    if (typeof params == 'string'){
        for (let i=0;i<cityArry.length;i++){
            if(params===cityArry[i].cname){
                return cityArry[i].score
            }
        }
    } else{
        let index = findIndex(params);//找到对应指标值的索引号
        let arr = [];
        for(let i=0; i<cityArry.length; i++) {
            arr.push(cityArry[i].score[index]);
        }
        return arr;
    }
}
/**
 * @namespace getScorePositive 获取得分高于平均分的值
 * @param qualityName  string类型  传入对应的指标名称
 * **/
let getScorePositive = function(indicatorName,cityArry){
    let index = findIndex(indicatorName);
    let arr = [];
    for(let i=0; i<cityArry.length; i++) {
        let numArry = (cityArry[i].score[index] - ascension.quality[index].avg).toFixed(2);
        if (numArry < 0) {
            numArry = 0;
        }
        arr.push(numArry);
    }
    return arr;
}
/**
 * @namespace getScoreNegative 获取低于平均分的值
 * @param qualityName  string类型  传入对应的指标名称
 * **/
let getScoreNegative = function(indicatorName,cityArry){
    let index = findIndex(indicatorName);
    let arr = [];
    for(let i=0; i<cityArry.length; i++) {
        let numArry = (cityArry[i].score[index] - ascension.quality[index].avg).toFixed(2);
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
 * @namespace achievePromotion 获取对应子指标的提升度
 * @param cityName   string类型  传入城市名，获取城市的索引号
 * @param targetName   string类型   传入子指标，获取子指标的索引号
 * @param ascensionNo  number类型   传入指标值，获取指标值的索引号
 * **/
let getPromotion = function (cityName,targetName,indicatorArry) {
    let ascensionIndex = findIndex(indicatorArry);//获取指标值的索引数值
    let targetIndex = findIndex(targetName);//获取子指标的索引
    let cityIndex = findCityindex(cityName);//获取城市的索引
    let targetValue = city[cityIndex].score[ascensionIndex];//指标值
    let initialValue = city[cityIndex].score[0];//期初值
    let targetBestvalue = ascension.quality[targetIndex].bestValue;//最优值
    let targetAvg = ascension.quality[targetIndex].avg;//平均值
    return [(0.5*(targetValue-initialValue)/(targetBestvalue-initialValue)+0.5*(targetValue-targetAvg)/(targetBestvalue-targetAvg)).toFixed(2)]
}
let getOldcity = function(){
    let oldCity = [];
    for (let i=0;i<city.length;i++){
        oldCity.push(city[i]);
    }
    return oldCity;
}
let sortNewcity = function(symbol){
    let newCity = [];
    for (let i=0;i<city.length;i++){
        newCity.push(city[i]);
    }
    if(symbol === '>'){
        for (let i = 0; i < newCity.length - 1; i++) {
            for (let j = 0; j < newCity.length - 1 - i; j++) {
                if (newCity[j].score[1] > newCity[j + 1].score[1]) {
                    let temp = newCity[j]
                    newCity[j] = newCity[j + 1]
                    newCity[j + 1] = temp
                }
            }
        }
    }else{
        for (let i = 0; i < newCity.length - 1; i++) {
            for (let j = 0; j < newCity.length - 1 - i; j++) {
                if (newCity[j].score[1] < newCity[j + 1].score[1]) {
                    let temp = newCity[j]
                    newCity[j] = newCity[j + 1]
                    newCity[j + 1] = temp
                }
            }
        }
    }
    return newCity;
}
let pieData = function(loopNum,tarNameArry,indicatorArry,defaultCityName){
    let tarArry = [];
    for(let i=0;i<loopNum;i++){
        let targetName = tarNameArry[i];
        tarArry.push({
            name:targetName,
            value:getPromotion(defaultCityName,targetName,indicatorArry)
        })
    }
    return tarArry;
}
let lineChart = function(indicatorName,colors,selectedCity){
    let option = {
        /*title: {
            text: indicatorName,
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 12
            }
        },*/
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
            data: getIndicatorValue(indicatorName),//该指标的周期值（指标值）
            name: '季度'
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
            name: getCityscore(indicatorName,getOldcity()),
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#1B283E',
                    width: 1
                }
            },
            min: 70
        },
        series: [
            {
                name: '安阳',
                type: 'line',
                data: getCityscore('安阳',getOldcity())
            },
            {
                name: '鹤壁',
                type: 'line',
                data: getCityscore('鹤壁',getOldcity())
            },
            {
                name: '济源',
                type: 'line',
                data: getCityscore('济源',getOldcity())
            },
            {
                name: '焦作',
                type: 'line',
                data: getCityscore('焦作',getOldcity())
            },
            {
                name: '开封',
                type: 'line',
                data: getCityscore('开封',getOldcity())
            },
            {
                name: '洛阳',
                type: 'line',
                data: getCityscore('洛阳',getOldcity())
            },
            {
                name: '漯河',
                type: 'line',
                data: getCityscore('漯河',getOldcity())
            },
            {
                name: '南阳',
                type: 'line',
                data: getCityscore('南阳',getOldcity())
            },
            {
                name: '平顶山',
                type: 'line',
                data: getCityscore('平顶山',getOldcity())
            },
            {
                name: '濮阳',
                type: 'line',
                data: getCityscore('濮阳',getOldcity())
            },
            {
                name: '三门峡',
                type: 'line',
                data: getCityscore('三门峡',getOldcity())
            },
            {
                name: '商丘',
                type: 'line',
                data: getCityscore('商丘',getOldcity())
            },
            {
                name: '新乡',
                type: 'line',
                data: getCityscore('新乡',getOldcity())
            },
            {
                name: '信阳',
                type: 'line',
                data: getCityscore('信阳',getOldcity())
            },
            {
                name: '许昌',
                type: 'line',
                data: getCityscore('许昌',getOldcity())
            },
            {
                name: '郑州',
                type: 'line',
                data: getCityscore('郑州',getOldcity())
            },
            {
                name: '周口',
                type: 'line',
                data: getCityscore('周口',getOldcity())
            },
            {
                name: '驻马店',
                type: 'line',
                data: getCityscore('驻马店',getOldcity())
            }
        ]
        /*series: function (params) {
            let cityArry = getOldcity();
            for (let i=0; i<cityArry.length;i++){
                return {name:cityArry[i],type: 'line',data:getCityscore(cityArry[i],getOldcity())}
            }
        }*/
    };
    return option;
}
let pieChart = function(colors,loopNum,indicatorArry,indicatorQuarter,defaultCityName){
    let option = {
        /*title: {
            text: '提升度',
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 12
            },
        },*/
        tooltip : {
            trigger: 'item',
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 14
            },
            formatter:'{b}<br />得分：{c}<br/>占比:{d}%'
        },
        legend: {
            orient: 'vertical',
            right: '10%',
            top:'30%',
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
                data:pieData(loopNum,indicatorArry,indicatorQuarter,defaultCityName),
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
let mapChart = function(splitData,colors,cityData){
    let option = {
        /*title: {
            text: '河南省地图',
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 12
            }
        },*/
        tooltip : {
            trigger: 'item',
            formatter: '{b}<br/>得分：{c} ',
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 14
            }
        },
        //左侧小导航图标
        /*visualMap: {
            show : false,
            x: 'left',
            y: 'center',
            splitList: splitData,
            color: colors,
            textStyle: {
                color: '#fff',
                fontSize:14
            }
        },*/
        series: [
            {
                type: 'map',
                top: '10%',
                mapType: '河南',
                roam: false,//鼠标缩放和平移漫游
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    emphasis: {
                        color:'red'
                    }
                },
                data:cityData,
                zoom: 1.25
            }
        ]
    };
    return option;
}
let barChart = function(defaultIndicator,cityArry,defaultCityName){
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
                let xAxisData = getCityname(cityArry);
                let newData = sortNewcity('<');
                console.log(newData);
                console.log(xAxisData[params.dataIndex]);
                let paiIndex;
                for(let i=0;i< newData.length;i++){
                    if (xAxisData[params.dataIndex] == newData[i].cname){
                        paiIndex = i;
                        break;
                    }
                    console.log(paiIndex);
                }
                console.log(paiIndex);
                return xAxisData[params.dataIndex] + '<br/>'  + params.value + getIndicatorUnit(defaultIndicator) + '<br>' + '排名：' + (paiIndex+1)
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
                data: getCityname(cityArry),
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
                name: '低于/高于均值'+getIndicatorUnit(defaultIndicator),
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
                name: '得分'+getIndicatorUnit(defaultIndicator),
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
                data:getCityscore(1803,cityArry),
                xAxisIndex: 2,
                yAxisIndex: 2,
                itemStyle:{
                    normal: {
                        color: function (params) {
                            let str1;
                            if (cityArry[params.dataIndex].cname == defaultCityName){
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
                data:getScorePositive(defaultIndicator,cityArry),
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
                data:func.getScoreNegative(defaultIndicator,cityArry),
                itemStyle: {
                    color:'#C23531'
                },
                stack: '总量',
            }
        ]
    };
    return option;
}
let radarChart = function(cityData,selectedCity,colors){
    let option = {
        /*title: {
            text: '基础雷达图',
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 12
            }
        },*/
        tooltip: {},
        legend: {
            x:"right",
            y:'center',
            type:'scroll',
            orient: 'vertival',
            selectedMode: 'multiple',
            selected: selectedCity,
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15
            }
        },
        color: colors,
        radar: {
            name:{
                fontSize: 14
            },
            indicator: [
                { name: '电网发展质量', max: 200,color: '#fff'},
                { name: '公司管理效率', max: 200,color:'#D8514B'},
                { name: '创新创效能力', max: 200,color:'#54DCF2'},
                { name: '基础保障力', max: 200,color:'#FCD85A'}
            ],
            center: ['50%','50%'],
            radius: "85%",
            color: [],
            splitArea: {
                areaStyle: {
                    color: [ '#4E5575','#3F4666']
                }
            }
        },
        series: [{
            name: '',
            type: 'radar',
            itemStyle : {
                normal : {
            // areaStyle: {type: 'default'},
                    splitLine: {
                        lineStyle: {

                        }
                    },
                    label: {
                        show: false,
                        textStyle:{
                        },
                        formatter:function(params) {
                            return params.value;}
                    },
                }
            },
            lineStyle: {
              normal: {
                  width: 4
              }
            },
            symbolSize: 12,
            data :cityData
        }]
    };
    return option;
}
let func ={//所有方法的集合
    getIndicatorUnit,//传入子指标，获取单位，通用
    findCityindex,//传入城市名，获取索引号，通用
    findIndex,//传入子指标/指标值，获取对应索引号，通用
    getCityname,//获取所有城市名，一般用于设置柱状图的x轴
    getCityscore,//获取得分序列，传入城市名(string)，一般用于折线图，获取城市的所有指标值得分
                // 传入指标值(number)，一般用于柱状图，获取指标下所有城市的得分
    getScorePositive,//获取每个地市超过平均值的值，一般用于柱状图
    getScoreNegative,//获取每个地市低于平均值的值，一般用于柱状图
    getPromotion,//获取对应子指标的提升度，一般用于饼图
    getIndicatorValue,//传入子指标，获取所有指标值，一般用于设置折线图的x轴
    getOldcity,//获取json原始城市名的数组
    sortNewcity,//传入符号，对值按照符号来排序
    lineChart,//折线图
    pieChart,//饼图
    mapChart,//地图
    barChart,//柱形图
    radarChart//雷达图
}
module.exports ={
    city:{city},
    ascension:{ascension},
    func:func
};