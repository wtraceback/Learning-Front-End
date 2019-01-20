(function() {
    var aqiData = {};

    var $ = function(selector) {
        return document.querySelector(selector);
    }

    // 从用户输入中获取数据，向 aqiData 中增加一条数据
    var addAqiData = function() {
        var city = $('#aqi-city-input').value.trim();
        var quality = $('#aqi-value-input').value.trim();

        var cityPattern = /^[a-zA-Z\u4e00-\u9fa5]+$/;
        if (!cityPattern.test(city)) {
            alert('输入的城市名必须为汉字或英文！');
            return;
        }

        var qualityPattern = /^-?\d+$/;
        if (!qualityPattern.test(quality)) {
            alert('输入的空气质量值必须为整数！');
            return;
        }

        // 成功时将数据加入对象中并清空输入框
        aqiData[city] = quality;
        $('#aqi-city-input').value = "";
        $('#aqi-value-input').value = "";
    }

    // 渲染 aqi-table 表格
    var renderAqiList = function() {
        var table = $('#aqi-table');
        table.innerHTML = '';

        if (JSON.stringify(aqiData) !== '{}') {
            table.insertAdjacentHTML('beforeend', `<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>`);

            for (var temp in aqiData) {
                table.insertAdjacentHTML('beforeend', `<tr><td>${temp}</td><td>${aqiData[temp]}</td><td><button>删除</button></td></tr>`)
            }
        }
    }

    /**
     * 点击 add-btn 时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     */
    var addBtnHandle = function() {
        addAqiData();
        renderAqiList();
    }

    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    var delBtnHandle = function(self) {
        var city = self.parentNode.parentNode.children[0].innerText;
        delete aqiData[city];

        renderAqiList();
    }

    var __main = function() {
        $('#add-btn').addEventListener('click', function() {
            addBtnHandle();
        });

        $('#aqi-table').addEventListener('click', function(e) {
            if (e.target.nodeName == "BUTTON" && e.target.innerText == '删除') {
                delBtnHandle(e.target);
            }
        });
    }

    __main();

    // 未将数据存入 localStorage 中，每次刷新都得重新添加
})();
