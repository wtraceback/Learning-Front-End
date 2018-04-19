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
    var dateStr = '';

    var len = 31 + 29 + 31;
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

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

/**
* 接收需要渲染的数据然后转化为可渲染的数据
* 需要接收两个参数 data 和 date，然后取出全局变量 chartData？
* 可渲染的数据的类型
*/
var dayOfWeek = function(index) {
    var day = [7, 1, 2, 3, 4, 5, 6];

    return day[index];
}

var handleChartData = function() {
    var returnData = {};

    if (pageState.nowGraTime == "day") {    // 日期粒度：日
        returnData = chartData;
    } else if (pageState.nowGraTime == "week") {    // 日期粒度：周
        var sum = 0, day = 0, week = 0;
        for (var temp in chartData) {
            sum += chartData[temp];
            day++;

            var d = (new Date(temp)).getDay();
            d = dayOfWeek(d);
            if (d == 7) {
                console.log('sum = ' + sum + ' day = ' + day);
                week++;
                returnData['2016年第' + week + '周'] = Math.ceil(sum / day);
                sum = 0;
                day = 0;
            }
        }

        // 避免最后一周还没达到星期天就结束了
        if (day != 0) {
            week++;
            returnData['2016年第' + week + '周'] = Math.ceil(sum / day);
        }
    } else if (pageState.nowGraTime = "month") {    // 日期粒度：月
        var data = [];
        var month = -1;

        // 生成数据[{month: 1, day: 2, sum: 100}, {month: 2, day: 3, sum: 300}]
        for (var temp in chartData) {
            var index = (new Date(temp)).getMonth();
            if (index != month) {
                data.push({});
                data[index].month = index + 1;
                data[index].day = 1;
                data[index].sum = chartData[temp];
                month++;
            } else {
                data[index].day += 1;
                data[index].sum += chartData[temp];
            }
        }

        for (var i = 0; i < data.length; i++) {
            var j = i + 1;
            returnData['2016-' + (j + 1 < 10 ? '0' + j : j) + '月'] = Math.ceil(data[i].sum / data[i].day);
        }
    }

    return returnData;
}

/**
* 渲染图表
*/
var renderChart = function() {
    var wrap = $(".aqi-chart-wrap");

    // 获取要渲染的数据并将其所有key转为一整个数组
    var renderData = handleChartData();
    var array = Object.keys(renderData);
    var len = array.length;

    // 柱状间距固定为 10
    // 间距数比柱状数多 1 个
    // 单个柱状宽度 = (获取父元素的宽度 - 间距总宽度) / 柱状数
    var wrapWidth = wrap.offsetWidth;
    var space = 10;
    var width = (wrapWidth - space * (len + 1)) / len;

    // 清除之前的html标签
    wrap.innerHTML = "";
    for (var i = 0; i < len; i++) {
        var data = renderData[array[i]];
        var left = space * (i + 1) + i * width;
        var color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);

        wrap.insertAdjacentHTML('beforeend', `<span class="columnar" title='${array[i]}\n[AQI]: ${data}'
        style='left: ${left}px; width: ${width}px; height: ${data}; background-color: ${color}'></span>`);
    }
}

/**
* 日、周、月的radio事件点击时的处理函数
*/
var graTimeChange = function(value) {
    // 判断选项是否发生了变化
    if (value == pageState.nowGraTime) {
        return;
    }

    // 设置对应数据
    pageState.nowGraTime = value;
    var city = pageState.nowSelectCity;
    chartData = aqiSourceData[city];

    // 调用图表渲染函数
    renderChart();
}

/**
* select发生变化时的处理函数
*/
var citySelectChange = function(value) {
    // 设置对应数据
    pageState.nowSelectCity = value;
    chartData = aqiSourceData[value];

    // 调用图表渲染函数
    renderChart();
}

/**
* 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
*/
var initGraTimeForm = function() {
    var date = $('#form-gra-time').getElementsByTagName('input');

    for (var i = 0; i < date.length; i++) {
        var self = date[i];

        // 设定选中的日期粒度
        if (self.getAttribute('value') == pageState.nowGraTime) {
            self.setAttribute('checked', 'checked');
        }

        self.addEventListener('click', function(e) {
            // 获取选中的日期粒度
            var value = this.value;

            graTimeChange(value);
        });
    }
}

/**
* 初始化城市Select下拉选择框中的选项
*/
var initCitySelector = function() {
    // 读取aqiSourceData中的城市，然后在id为city-select的下拉列表中设定选项
    var select = $('#city-select');
    for (var temp in aqiSourceData) {
        select.insertAdjacentHTML('beforeend', `<option>${temp}</option>`);
    }

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.addEventListener('change', function(e) {
        // 获取变化后的城市名
        var value = this.value;

        citySelectChange(value);
    });
}

/**
* 初始化图表需要的数据格式
*/
var initAqiChartData = function() {
    // 处理好的数据存到 chartData 中
    chartData = aqiSourceData[pageState.nowSelectCity];
    renderChart();
}

/**
* 初始化函数
*/
var init = function() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();
