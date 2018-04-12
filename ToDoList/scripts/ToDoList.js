var $ = function(selector) {
    return document.querySelector(selector);
}

// 给 add button 绑定添加事件
var bindEventAdd = function() {
    var addButton = $('#id-todo-add-butn');
    addButton.addEventListener('click', function(){
        // 获得输入的数据
        var todoInput = $('#id-todo-input');
        var task = todoInput.value;

        // 生成 todo 对象
        var todo = {
            'task': task,
            'time': currentTime(),
        }

        todoList.push(todo);
        saveTodos();
        insertTodo(todo);
    })
}

var bindEventEnter = function() {
    var todoContainer = $('#id-todo-list');
    todoContainer.addEventListener('keydown', function(event){
        var target = event.target;
        if(event.key === 'Enter') {
            // 失去焦点
            target.blur();
            // 阻止默认行为的发生, 也就是不插入回车
            event.preventDefault();

            // 更新 todo
            var index = indexOfElement(target.parentElement);

            // 把元素在 todoList 中更新
            todoList[index].task = target.innerHTML;
            // todoList.splice(index, 1)
            saveTodos();

        }
    })
}

var bindEventButton = function() {
    // 通过 event.target 的 class 来检查点击的是什么
    var todoContainer = $('#id-todo-list');
    todoContainer.addEventListener('click', function(event){
        var target = event.target;
        if(target.classList.contains('todo-done')) {
            // 给 todo div 开关一个状态 class
            var todoDiv = target.parentElement;
            toggleClass(todoDiv, 'done');
        } else if (target.classList.contains('todo-delete')) {
            var todoDiv = target.parentElement;
            var index = indexOfElement(target.parentElement);

            todoDiv.remove();
            // 把元素从 todoList 中 remove 掉
            // delete todoList[index]
            todoList.splice(index, 1);
            saveTodos();
        } else if (target.classList.contains('todo-edit')) {
            var cell = target.parentElement;
            var span = cell.children[3];
            span.setAttribute('contenteditable', 'true');
            // span.contentEditable = true
            span.focus();
        }
    })
}

var bindEventBlur = function() {
    var todoContainer = $('#id-todo-list');
    todoContainer.addEventListener('blur', function(event){
        var target = event.target;
        if (target.classList.contains('todo-label')) {
            // 让 span 不可编辑
            target.setAttribute('contenteditable', 'false');
            // 更新 todo
            var index = indexOfElement(target.parentElement);

            // 把元素在 todoList 中更新
            todoList[index].task = target.innerHTML;
            // todoList.splice(index, 1)
            saveTodos();
        }
    }, true)
}

var bindEvents = function() {
    // 添加 todo
    bindEventAdd();
    // 文本框输入 todo 按回车保存
    bindEventEnter();
    // 完成按钮和删除按钮
    bindEventButton();
    // 文本框失去焦点后保存 todo
    bindEventBlur();
}


var insertTodo = function(todo) {
    // 添加到 container 中
    var todoContainer = $('#id-todo-list');
    var t = templateTodo(todo);
    // 这个方法用来添加元素更加方便, 不需要 createElement
    todoContainer.insertAdjacentHTML('beforeend', t);
}

var templateTodo = function(todo) {
    var t = `
        <div class='todo-cell'>
            <button class='todo-done'>完成</button>
            <button class='todo-delete'>删除</button>
            <button class='todo-edit'>编辑</button>
            <span class='todo-label' contenteditable='false'>${todo.task}</span>
            <span>${todo.time}</span>
        </div>
    `;

    return t;
}

// 保存 todoList
var saveTodos = function() {
    var s = JSON.stringify(todoList);
    localStorage.todoList = s;
}

var loadTodos = function() {
    var s = localStorage.todoList;
    return JSON.parse(s);
}

// 返回自己在父元素中的下标
var indexOfElement = function(element) {
    var parent = element.parentElement;
    for (var i = 0; i < parent.children.length; i++) {
        var e = parent.children[i];
        if (e === element) {
            return i;
        }
    }
}

// 这个函数用来开关一个元素的某个 class
var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}

var currentTime = function() {
    var date = new Date();

    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;

    return `${y}/${m}/${d} ${h}:${minutes}:${seconds}`;
}


var initTodos = function() {
    todoList = loadTodos();
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i];
        insertTodo(todo);
    }
}

var todoList = [];

var __main = function() {
    // 绑定事件
    bindEvents();

    // 程序加载后, 加载 todoList 并且添加到页面中
    initTodos();
}

__main();
