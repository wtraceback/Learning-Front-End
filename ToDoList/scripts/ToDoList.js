var $ = function(selector) {
    return document.querySelector(selector);
}

// 给 input 输入框按回车键时添加事件
var bindEventInputEnter = function() {
    var todoInput = $('#id-todo-input');

    todoInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            // 失去焦点
            event.target.blur();
            // 阻止默认行为的发生
            event.preventDefault();

            operateInputValue();
        }
    })
}

// 给 add button 绑定添加事件
var bindEventAdd = function() {
    var addButton = $('#id-todo-add-butn');

    // click事件包含了按钮的回车事件
    addButton.addEventListener('click', function(){
        operateInputValue();
    })
}

var operateInputValue = function() {
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
        judgeTodo();
        insertTodo(todo);
    }

    // 添加完成后清空输入框内的数据
    $('#id-todo-input').value = '';
}

var bindEventEnter = function() {
    var todoContainer = $('#id-todo-list');

    todoContainer.addEventListener('keydown', function(event){
        var target = event.target;

        // 编辑完了后点击了回车键
        if(event.key === 'Enter') {
            // 失去焦点
            target.blur();
            // 阻止默认行为的发生, 即不插入回车
            event.preventDefault();

            // 把元素在 todoList 中更新
            var index = indexOfElement(target.parentElement);
            todoList[index].task = target.innerHTML;

            saveTodos();
        }
    })
}

var bindEventButton = function() {
    var todoContainer = $('#id-todo-list');

    todoContainer.addEventListener('click', function(event){
        var target = event.target;

        if(target.classList.contains('todo-done')) {
            var todoDiv = target.parentElement.parentElement;
            var index = indexOfElement(todoDiv);

            // 给 todo div 开关一个状态 class
            toggleClass(todoDiv, 'done');
            toggleText(target, target.innerText);
            toggleStatus(index, target.innerText);

            saveTodos();
        } else if (target.classList.contains('todo-delete')) {
            var todoDiv = target.parentElement.parentElement;
            var index = indexOfElement(todoDiv);

            // 把元素从 页面 以及 todoList 中 remove 掉
            todoDiv.remove();
            todoList.splice(index, 1);

            saveTodos();
            judgeTodo();
        } else if (target.classList.contains('todo-edit')) {
            var cell = target.parentElement.parentElement;
            var span = cell.children[1];

            span.setAttribute('contenteditable', 'true');
            span.focus();
        }
    })
}

var bindEventBlur = function() {
    var todoContainer = $('#id-todo-list');

    // 编辑完了后点击了页面的其他地方，使其编辑处失去焦点
    todoContainer.addEventListener('blur', function(event){
        var target = event.target;

        if (target.classList.contains('todo-task')) {
            // 让 span 不可编辑
            target.setAttribute('contenteditable', 'false');

            // 把元素在 todoList 中更新
            var index = indexOfElement(target.parentElement);
            todoList[index].task = target.innerHTML;

            saveTodos();
        }
    }, true)
}

var bindEvents = function() {
    // todo input 按回车时保存
    bindEventInputEnter();
    // 添加 todo
    bindEventAdd();
    // 任务栏的文本框输入 todo 按回车保存
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

var saveTodos = function() {
    var s = JSON.stringify(todoList);
    localStorage.todoList = s;
}

var loadTodos = function() {
    var s = localStorage.todoList;
    return JSON.parse(s);
}

var judgeTodo = function() {
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

    todoList[index].done = t[text];
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
    judgeTodo();
}

var todoList = [];

var init = function() {
    // 绑定事件
    bindEvents();

    // 程序加载后, 加载 todoList 并且添加到页面中
    initTodos();
}

init();
