var $ = function(selector) {
    return document.querySelector(selector);
}

/* 数据格式演示
var aqiSourceData = {
    "北京": {
        "2016-01-01": 10,
        "2016-01-02": 10,
        "2016-01-03": 10,
        "2016-01-04": 10
    }
};
*/

// 以下两个函数用于随机模拟生成测试数据
var getDateStr = function(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();

    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;

    return y + '-' + m + '-' + d;
}

var randomBuildData = function(seed) {
    var returnData = {};
    var date = new Date("2016-01-01");
    var dateStr = ''

    var len = 92
    for (var i = 1; i < len; i++) {
        dateStr = getDateStr(date);
        var randomNum = Math.ceil(Math.random() * seed);
        returnData[dateStr] = randomNum;
        date.setDate(date.getDate() + 1);
    }

    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 柱状图的颜色值
var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
              '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}


var renderProcessData = function() {
    // var aqiSourceData = {
    //     "北京": {
    //         "2016-01-01": 10,
    //         "2016-01-02": 10,
    //         "2016-01-03": 10,
    //         "2016-01-04": 10
    //     }
    // };
    var returnData = {};
    var array = Object.keys(chartData);

    if (pageState.nowGraTime == "day") {
        return chartData;
    } else if (pageState.nowGraTime == "week") {

    } else {    // month
        var len = 3;
        var array = Object.keys(chartData);

        for (var i = 1; i <= len; i++) {
            var str = '2016-0' + i;
            returnData[str] = array.filter(function(value) {
                if (value.includes(str)) {
                    return value;
                }
            });
        }

        for (var i = 1; i <= len; i++) {
            var count = 0;
            var str = '2016-0' + i;

            for (var j = 0; j < returnData[str].length; j++) {
                count += chartData[returnData[str][j]];
            }

            returnData[str] = Math.ceil(count / j);
        }

        return returnData;
    }
}

/**
* 渲染图表
*/
function renderChart() {
    // 清除之前的html标签
    $(".aqi-chart-wrap").innerHTML = "";

    var renderData = renderProcessData();

    // 将对象的所有key转为一整个数组
    var array = Object.keys(renderData);

    var wrap = $(".aqi-chart-wrap");
    for (var i = 0; i < array.length; i++) {
        var data = renderData[array[i]];
        var color = colors[i % colors.length]
        var width = Math.ceil(910 / array.length);
        wrap.insertAdjacentHTML('beforeend', `<span class="columnar" title='${array[i]}\n[AQI]: ${data}'
        style='left: ${(i + 1) * (width + 5)}px; width: ${width}px; height: ${data}; background-color: ${color}'></span>`);
    }
}

/**
* 日、周、月的radio事件点击时的处理函数
*/
function graTimeChange(value) {
    // 确定是否选项发生了变化
    if (value == pageState.nowGraTime) {
        return;
    }

    // 设置对应数据
    pageState.nowGraTime = value;
    var city = $('#city-select').value;
    chartData = aqiSourceData[city];


    // 调用图表渲染函数
    renderChart();
}

/**
* select发生变化时的处理函数
*/
function citySelectChange() {
    // 确定是否选项发生了变化
    var value = this.value

    // 设置对应数据
    pageState.nowSelectCity = value;
    chartData = aqiSourceData[value];

    // 调用图表渲染函数
    renderChart();
}

/**
* 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
*/
function initGraTimeForm() {
    var date = $('#form-gra-time').children;

    for (var i = 1; i < date.length; i++) {
        date[i].children[0].onclick = function(e) {
            // 获取选中的日期粒度
            var value =  e.target.defaultValue;

            graTimeChange(value);
        }
    }
}

/**
* 初始化城市Select下拉选择框中的选项
*/
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var select = $('#city-select');
    for (var temp in aqiSourceData) {
        select.insertAdjacentHTML('beforeend', `<option>${temp}</option>`);
    }

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.onchange = citySelectChange;
}

/**
* 初始化图表需要的数据格式
*/
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式

    // 处理好的数据存到 chartData 中
    chartData = aqiSourceData[pageState.nowSelectCity];
    renderChart();
}

/**
* 初始化函数
*/
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();
