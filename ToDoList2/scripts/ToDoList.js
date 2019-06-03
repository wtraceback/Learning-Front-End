(function() {
    var $ = function(selector) {
        return document.querySelector(selector);
    }

    // localStorage.todolist = '[{task: "task", time: "time", done: ture/false}]'
    var todo_list = [];
    var todo_num = 0;
    var done_num = 0;

    var saveTodoList = function() {
        var result = JSON.stringify(todo_list);

        localStorage.todolist = result;
    }

    var loadTodoList = function() {
        var str = localStorage.todolist;

        var err = [undefined, null];
        if (err.includes(str)) {
            return [];
        }

        return JSON.parse(str);
    }

    var listItemTemplate = function(matter, time) {
        var t = `<div class="todo-item">
            <button class="done">Done</button>
            <p class="todo-item-text">${matter}</p>
            <button class="delete">Delete</button>
        </div>`;

        return t;
    }

    var indexOfElement = function(element) {
        var item = element.parentElement;
        var children_list = item.parentElement.children;

        for (var i = 0; i < children_list.length; i++) {
            if (item === children_list[i]) {
                return i;
            }
        }
    }

    var deleteToDoItem = function(element) {
        var index = indexOfElement(element);
        todo_list.splice(index, 1);
        saveTodoList();
        element.parentElement.remove();
    }

    var insertToDoItem = function(value, time) {
        var item = listItemTemplate(value, time);

        $('.todolist').insertAdjacentHTML('beforeend', item);
    }

    var insertDoneItem = function(value, time) {
        var item = listItemTemplate(value, time);

        $('.donelist').insertAdjacentHTML('beforeend', item);
    }

    var stringOfDateTime = function() {
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

    var renderToDoItem = function() {
        $('.todolist').innerHTML = '';
        $('.donelist').innerHTML = '';
        [todo_num, done_num] = [0, 0];
        for (var i = 0; i < todo_list.length; i++) {
            var temp = todo_list[i];
            if (temp.done === true) {
                insertDoneItem(temp.task, temp.time);
                ++done_num;
            } else {
                insertToDoItem(temp.task, temp.time);
                ++todo_num;
            }
        }

        $('.todo-num').innerText = todo_num;
        $('.done-num').innerText = done_num;
        $('#id-todo-input').value = '';
        $('#id-todo-input').focus();
    }

    var bindEvents = function() {
        // 添加按钮的触发
        $('.todo-add').addEventListener('click', function() {
            var value = $('#id-todo-input').value.trim();

            if (value === '') {
                alert('内容不能为空');
                $('#id-todo-input').focus()
            }

            for (var i = 0; i < todo_list.length; i++) {
                if(value === todo_list[i].task) {
                    alert('任务已存在！！');
                    return;
                }
            }

            var temp = {
                task: value,
                time: stringOfDateTime(),
                done: false,
            }

            todo_list.push(temp);
            renderToDoItem();
            saveTodoList();
        });

        // todo 的事件委托
        $('.todolist').addEventListener('click', function(event) {
            // 删除按钮
            if (event.target.classList.contains('delete')) {
                --todo_num;
                deleteToDoItem(event.target);
                $('.todo-num').innerText = todo_num;
            }

            // 完成按钮
            if (event.target.classList.contains('done')) {
                var index = indexOfElement(event.target);
                todo_list[index].done = true;
                --todo_num;
                ++done_num;
                renderToDoItem();
                saveTodoList();
            }
        })

        // done 的事件委托
        $('.donelist').addEventListener('click', function(event) {
            // 删除按钮
            if (event.target.classList.contains('delete')) {
                deleteToDoItem(event.target);
                --done_num;
                $('.done-num').innerText = done_num;
            }

            // 完成按钮
            if (event.target.classList.contains('done')) {
                var index = indexOfElement(event.target);
                todo_list[index].done = false;
                --done_num;
                ++todo_num;
                renderToDoItem();
                saveTodoList();
            }
        })

        // clear 清除所有 todolist
        $('.clear').addEventListener('click', function() {
            localStorage.removeItem('todolist');
            todo_list = [];
            renderToDoItem();
        });
    }

    var __main = function() {
        bindEvents();

        // 将缓存中的 todolist 加载出来
        todo_list = loadTodoList();
        renderToDoItem();
    }

    __main();
})();
