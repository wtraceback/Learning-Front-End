var $ = function(selector) {
    return document.querySelector(selector);
}

var bindEventInputEnter = function() {
    var todoInput = $('#id-todo-input');

    todoInput.addEventListener('keydown', function(event) {
        var target = event.target;
        if (event.key === 'Enter') {
            console.log("input enter");
            // 失去焦点
            target.blur();
            // 阻止默认行为的发生, 也就是不插入回车
            event.preventDefault();
            operationInputValue();
        }
    })
}

// 给 add button 绑定添加事件
var bindEventAdd = function() {
    var addButton = $('#id-todo-add-butn');

    // click事件包含了按钮的回车事件
    addButton.addEventListener('click', function(){
        operationInputValue();
    })
}

var operationInputValue = function() {
    // 获得输入的数据
    var todoInput = $('#id-todo-input');
    var task = todoInput.value.trim();

    if (task == '') {
        alert('内容不能为空');
    } else {
        // 生成 todo 对象
        var todo = {
            'task': task,
            'time': currentTime(),
            'done': false,
        }

        todoList.push(todo);
        saveTodos();
        judgeTodos();
        insertTodo(todo);
    }

    // 添加完成后清空输入框内的数据
    $('#id-todo-input').value = '';
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
            var todoDiv = target.parentElement.parentElement;
            var index = indexOfElement(todoDiv);

            toggleClass(todoDiv, 'done');
            toggleText(target, target.innerText);
            toggleStatus(index, target.innerText);
            saveTodos();
        } else if (target.classList.contains('todo-delete')) {
            var todoDiv = target.parentElement.parentElement;
            var index = indexOfElement(todoDiv);

            todoDiv.remove();
            // 把元素从 todoList 中 remove 掉
            // delete todoList[index]
            todoList.splice(index, 1);
            saveTodos();
            judgeTodos();
        } else if (target.classList.contains('todo-edit')) {
            var cell = target.parentElement.parentElement;
            var span = cell.children[1];
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
        if (target.classList.contains('todo-task')) {
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
    // 添加 todo 的 enter 按钮
    bindEventInputEnter();
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
    var text = ['Restore', 'Done'];

    var t = `
        <li class="todo-cell${todo.done ? ' done' : ''}">
            <div class='todo-cell-butn'>
                <button class='todo-done'>${todo.done ? text[0] : text[1]}</button>
                <button class='todo-delete'>Delete</button>
                <button class='todo-edit'>Modify</button>
            </div>

            <span class='todo-task' contenteditable='false'>${todo.task}</span>
            <span class='todo-time'>Created at ${todo.time}</span>
        </li>
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

var judgeTodos = function() {
    todoList = loadTodos();
    var classValue = 'todo-nothing';

    if (todoList.length == 0) {
        var ul = $('#id-todo-list');
        var t = `
            <p class=${classValue}>看到它如此的空荡荡，你不想添加点什么吗？</p>
        `

        ul.insertAdjacentHTML('beforebegin', t);
    } else if ($('.' + classValue)) {
        $('.' + classValue).remove();
    }
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

var toggleText = function(element, text) {
    var t = {
        'Done': 'Restore',
        'Restore': 'Done',
    }

    element.innerText = t[text];
}

var toggleStatus = function(index, text) {
    var t = {
        'Done': false,
        'Restore': true,
    }

    todoList[index]['done'] = t[text];
}

var currentTime = function() {
    var date = new Date();

    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var minutes = date.getMinutes();

    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${y}-${m}-${d} ${h}:${minutes}`;
}


var initTodos = function() {
    todoList = loadTodos();

    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i];
        insertTodo(todo);
    }

    // 检测当前的 todo 项是否为空
    judgeTodos();
}

var todoList = [];

var __main = function() {
    // 绑定事件
    bindEvents();

    // 程序加载后, 加载 todoList 并且添加到页面中
    initTodos();
}

__main();
