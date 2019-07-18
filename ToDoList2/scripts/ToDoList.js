(function() {
    var $ = function(selector) {
        return document.querySelector(selector);
    }

    var handleInputValue = function() {
        // 获得输入的数据
        var todoInput = $('#id-todo-input');
        var task = todoInput.value.trim();

        if (task == '') {
            alert('内容不能为空');
        } else {
            // 生成 todo 对象
            var todo = {
                'task': task,
                'time': stringOfCurrentTime(),
                'done': false,
            }

            todo_list.unshift(todo);
            saveTodos();
            judgeTodo();
            insertTodo(todo);
        }

        // 添加完成后清空输入框内的数据
        $('#id-todo-input').value = '';
        $('#id-todo-input').focus();
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

    var stringOfCurrentTime = function() {
        var date = new Date();

        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        h = h < 10 ? '0' + h : h;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;

        return `${y}-${m}-${d} ${h}:${min}:${sec}`;
    }

    var templateTodo = function(todo) {
        var t = `
            <div class="todo-item${todo.done ? ' todo-done': ''}">
                <div class="done${todo.done ? ' complete': ''}"></div><!--
                --><p class="todo-task" contenteditable="plaintext-only">${todo.task}</p><!--
                --><button class="delete">delete</button><!--
                --><div class="date">${todo.time}<div>
            </div>
        `;

        return t;
    }

    var insertTodo = function(todo) {
        // 添加到 container 中
        var todoContainer = $('.todolist');
        var t = templateTodo(todo);

        todoContainer.insertAdjacentHTML('afterbegin', t);
    }

    var judgeTodo = function() {
        var nothing = 'todo-nothing';

        if (todo_list.length == 0) {
            $('.todolist').insertAdjacentHTML('beforebegin', `<h2 class=${nothing}>看到它如此的空荡荡，你不想添加点什么吗？</h2>`);
            $('.todo-title').classList.add('todo-title-hide');
        } else if($('.' + nothing)) {
            $('.' + nothing).remove();
            $('.todo-title').classList.remove('todo-title-hide');
        }
    }

    var saveTodos = function() {
        var s = JSON.stringify(todo_list);

        localStorage.todolist = s;
    }

    var rerenderList = function() {
        $('.todolist').innerHTML = '';
        for (var i = todo_list.length - 1; i >= 0; i--) {
            var todo = todo_list[i];
            insertTodo(todo);
        }

        // 检测当前的 todo 项是否为空
        judgeTodo();
        $('#id-todo-input').value = '';
        $('#id-todo-input').focus();
    }

    // 判断是否为 json
    var isJson = function(str) {
        if (typeof str === 'string') {
            try {
                var j = JSON.parse(str);
                if (typeof j === 'object' && j) {
                    return true;
                }
            } catch (e) {
                return false;
            }
        }

        return false;
    }

    var loadTodos = function() {
        var str = localStorage.todolist;

        if (isJson(str)) {
            return JSON.parse(str);
        } else {
            return [];
        }

    }

    // 给 add button 绑定添加事件
    var bindEventAdd = function() {
        $('.todo-add').addEventListener('click', function(){
            handleInputValue();
        })
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

                handleInputValue();
            }
        })
    }

    var bindEventTextEnter = function() {
        var todoContainer = $('.todolist');

        todoContainer.addEventListener('keydown', function(event){
            var target = event.target;

            // 编辑完了后点击了回车键
            if(event.key === 'Enter' && target.classList.contains('todo-task')) {
                // 失去焦点
                target.blur();
                // 阻止默认行为的发生, 即不插入回车
                event.preventDefault();

                // 把元素在 todo_list 中更新
                var index = indexOfElement(target.parentElement);
                todo_list[index].task = target.innerHTML;

                saveTodos();
            }
        })
    }

    var bindEventDoneAndDeleteButton = function() {
        var todoContainer = $('.todolist');

        todoContainer.addEventListener('click', function(event){
            var self = event.target;
            var parent = self.parentElement;

            if(self.classList.contains('done')) {
                var index = indexOfElement(parent);

                // 修改 done 按钮的样式
                self.classList.toggle('complete');
                parent.classList.toggle('todo-done');

                if (parent.classList.contains('todo-done')) {
                    todo_list[index].done = true;
                    todo_list[index].time = stringOfCurrentTime();
                    var item = todo_list.splice(index, 1);
                    todo_list.push(item[0]);
                } else {
                    todo_list[index].done = false;
                    var item = todo_list.splice(index, 1);
                    todo_list.unshift(item[0]);
                }

                saveTodos();
                rerenderList();
            } else if (self.classList.contains('delete')) {
                var index = indexOfElement(parent);

                // 把元素从 页面 以及 todo_list 中 remove 掉
                parent.remove();
                todo_list.splice(index, 1);

                saveTodos();
                judgeTodo();
            }
        })
    }

    var bindEventTextBlur = function() {
        var todoContainer = $('.todolist');

        // 编辑完了后点击了页面的其他地方，使其编辑处失去焦点
        todoContainer.addEventListener('blur', function(event){
            var target = event.target;

            if (target.classList.contains('todo-task')) {
                // 把元素在 todo_list 中更新
                var index = indexOfElement(target.parentElement);
                todo_list[index].task = target.innerHTML;

                saveTodos();
            }
        }, true)
    }

    var initTodos = function() {
        todo_list = loadTodos();
        rerenderList();
    }

    var bindEvents = function() {
        // 添加 todo
        bindEventAdd();

        // todo input 按回车时保存
        bindEventInputEnter();

        // 任务栏的文本框输入 todo 按回车保存
        bindEventTextEnter();

        // 完成按钮和删除按钮
        bindEventDoneAndDeleteButton();

        // 文本框失去焦点后保存 todo
        bindEventTextBlur();
    }

    var __main = function() {
        // 绑定事件
        bindEvents();

        // 程序加载后, 加载 todo_list 并且添加到页面中
        initTodos();
    }

    // [{task: "task", time: "time", done: ture/false}]
    var todo_list = [];
    __main();
})();
