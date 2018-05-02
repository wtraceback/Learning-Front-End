var $ = function(selector) {
    return document.querySelector(selector);
}

// 返回正确格式的输入数据
var valueOfInput = function() {
    var value = $('#aqi-input').value.replace(/\s/g, "");
    //  匹配非负整数
    var pattern = /^(?:[1-9]\d|100)$/;

    $('#aqi-input').value = '';
    if (!pattern.test(value)) {
        alert("请输入10~100的数字。。。");
        return;
    }

    return value;
}

// 在对应的位置插入新元素
var insertNewElement = function(location, val) {
    var wrap = $('.wrap-list');
    var t = `<div class="new" style="height: ${val}px"></div>`;

    wrap.insertAdjacentHTML(location, t);
}

var checkListBoundaries = function() {
    var len = 60;

    if (list.length == 60) {
        alert("数组长度已达到上限！");
        return false;
    }

    return true;
}

// 左侧加入
var bindEventLeftIn = function() {
     var leftIn = $('.left-in');

     leftIn.addEventListener('click', function() {
         var value = valueOfInput();
         var out = checkListBoundaries();

         if (value != undefined && out) {
             list.unshift(value);
             insertNewElement('afterbegin', value);
         }
     });
}

// 右侧加入
var bindEventRightIn = function() {
    var rightIn = $('.right-in');

    rightIn.addEventListener('click', function() {
        var value = valueOfInput();
        var out = checkListBoundaries();

        if (value != undefined && out) {
            list.push(value);
            insertNewElement('beforeend', value);
        }
    });
}

// 左侧出
var bindEventLeftOut = function() {
    var leftOut = $('.left-out');

    leftOut.addEventListener('click', function() {
        if (list.length != 0) {
            var wrap = $('.wrap-list').children;

            wrap[0].remove();
            var val = list.shift();
            alert(val);
        }

    })
}

// 右侧出
var bindEventRightOut = function() {
    var rightOut = $('.right-out');

    rightOut.addEventListener('click', function() {
        var len = list.length;

        if (len != 0) {
            var wrap = $('.wrap-list').children;

            wrap[len - 1].remove();
            var val = list.pop();
            alert(val);
        }
    })
}

// 返回自己在父元素中的下标
var indexOfElement = function(element) {
    var parent = element.parentElement;

    for (var i = 0; i < parent.children.length; i++) {
        var e = parent.children[i];

        if (e == element) {
            return i;
        }
    }
}

// 处理加入的元素的点击事件（事件委托）
var bindEventHandles = function() {
    var wrap = $('.wrap-list');

    wrap.addEventListener('click', function(e) {
        if (e.target.classList.contains('new')) {
            var index = indexOfElement(e.target);

            e.target.remove();
            list.splice(index, 1);
        }
    })
}

var swap = function(index1, index2) {
    var temp = list[index1];
    list[index1] = list[index2];
    list[index2] = temp;
}

var bubbleSort = function() {
    var len = list.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (list[j] > list[j + 1]) {
                swap(j, j + 1);
            }
        }
    }
}

var bindEventSort = function() {
    $('.bubble-sort').addEventListener('click', function() {
        bubbleSort();

        var wrap = $(".wrap-list");
        wrap.innerHTML = "";
        for (var i = 0; i < list.length; i++) {
            insertNewElement('beforeend', list[i]);
        }
    });
}

var bindEvents = function() {
    // 左侧加入的事件函数
    bindEventLeftIn();
    // 右侧加入的事件函数
    bindEventRightIn();
    // 左侧删除的事件函数
    bindEventLeftOut();
    // 右侧删除的事件函数
    bindEventRightOut();
    // 点击目标元素然后删除对应元素的事件函数
    bindEventHandles();
    // 排序按钮的事件函数
    bindEventSort();
}

var list = [];

var init = function() {
    bindEvents();
}

init();
