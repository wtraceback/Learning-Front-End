var $ = function(selector) {
    return document.querySelector(selector);
}

/**
* aqiData，存储用户输入的空气指数数据
* 示例格式：
* aqiData = {
*    "北京": 90,
*    "上海": 40
* };
*/
var aqiData = {};

/**
* 从用户输入中获取数据，向aqiData中增加一条数据
* 然后渲染aqi-list列表，增加新增的数据
*/
function addAqiData() {
    var pattern = /^[\u4e00-\u9fa5a-zA-Z]+$/;
    var city = $("#aqi-city-input").value.replace(/\s/g, "");
    if (!pattern.test(city)) {
        alert("城市名称必须为中英文字符哦");
        return;
    }

    var patt = /^[0-9]+$/;
    var quality = parseInt($("#aqi-value-input").value.replace(/\s/g, ""));
    if (!patt.test(quality)) {
        alert("空气质量指数必须为整数哦");
        return;
    }

    aqiData[city] = quality;
}

/**
* 渲染aqi-table表格
*/
function renderAqiList() {
    var table = $("#aqi-table");
    table.innerHTML = "";

    if (JSON.stringify(aqiData) !== '{}') {
        table.insertAdjacentHTML('afterbegin', `<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>`);
        for (var i in aqiData) {
            table.insertAdjacentHTML('beforeend', `<tr><td>${i}</td><td>${aqiData[i]}</td><td><button>删除</button></td></tr>`)
        }
    }
}

/**
* 点击add-btn时的处理逻辑
* 获取用户输入，更新数据，并进行页面呈现的更新
*/
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
* 点击各个删除按钮的时候的处理逻辑
* 获取哪个城市数据被删，删除数据，更新表格显示
*/
function delBtnHandle(event) {
    var self = event.target;

    if (self.nodeName == "BUTTON" && self.innerText == "删除") {
        self.parentNode.parentNode.remove();

        var value = self.parentNode.parentNode.children[0].innerText;
        delete aqiData[value];

        renderAqiList();
    }
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    $("#add-btn").onclick = addBtnHandle;

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    $("#aqi-table").onclick = delBtnHandle;
}

init();
