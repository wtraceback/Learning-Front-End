var $ = function(selector) {
    return document.querySelector(selector);
}

// 返回正确格式的输入数据
var valueOfInput = function() {
    var value = $('#aqi-input').value.replace(/\s/g, "");
    //  匹配非负整数
    var pattern = /^[1-9]\d*|0$/;

    $('#aqi-input').value = '';
    if (!pattern.test(value)) {
        alert("请输入正确的正整数类型的数据。。。");
        return;
    }

    return value;
}

// 在对应的位置插入新元素
var insertNewElement = function(location, val) {
    var wrap = $('.wrap-list');
    var t = `<div class="new">${val}</div>`;

    wrap.insertAdjacentHTML(location, t);
}

// 左侧加入
var bindEventLeftIn = function() {
     var leftIn = $('.left-in');

     leftIn.addEventListener('click', function() {
         var value = valueOfInput();

         if (value != undefined) {
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

        if (value != undefined) {
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
}

var list = [];

var init = function() {
    bindEvents();
}

init();
