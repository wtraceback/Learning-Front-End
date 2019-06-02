(function() {
    var $ = function(selector) {
        return document.querySelector(selector);
    }

    var todo_list = [];

    var saveTodoList = function() {
        var result = JSON.stringify(todo_list);

        localStorage.todo = result;
    }

    var loadTodoList = function() {
        var str = localStorage.todo;

        return JSON.parse(str);
    }

    var listItemTemplate = function(matter) {
        var t = `<div class="todo-item">
            <button class="done">Done</button>
            <p class="todo-item-text">${matter}</p>
            <button class="delete">Delete</button>
        </div>`;

        return t;
    }

    var deleteToDoItem = function(element) {
        var index = indexOfElement(element);
        todo_list.splice(index, 1);
        saveTodoList();
        element.parentElement.remove();
    }

    var insertToDoItem = function(value) {
        var item = listItemTemplate(value);

        $('.todolist').insertAdjacentHTML('beforeend', item);
        $('#id-todo-input').value = '';
        $('#id-todo-input').focus();
    }

    var indexOfElement = function(element) {
        var item = element.parentElement;
        var children_list = item.parentElement.children;

        for (var i = 0; i < children_list.length; i++) {
            console.log('for')
            if (item === children_list[i]) {
                return i;
            }
        }
    }

    var bindEvents = function() {
        // 添加按钮的触发
        $('.todo-add').addEventListener('click', function() {
            var value = $('#id-todo-input').value.trim();

            if (value === '') {
                alert('内容不能为空');
                $('#id-todo-input').focus()
            }

            insertToDoItem(value);
            todo_list.push(value);
            saveTodoList();
        });

        // todolist 的事件委托
        $('.todolist').addEventListener('click', function(event) {
            console.log(event)
            console.log(event.target.classList)
            if (event.target.classList.contains('delete')) {
                deleteToDoItem(event.target);
            }

            if (event.target.classList.contains('done')) {
                var index = indexOfElement(event.target);
                // TODO
            }
        })

        // clear 清除所有 todolist
        $('.clear').addEventListener('click', function() {
            localStorage.removeItem('todolist');
        });
    }

    var __main = function() {
        bindEvents();

        todo_list = loadTodoList();
        for (var i = 0; i < todo_list.length; i++) {
            insertToDoItem(todo_list[i]);
        }

        $('#id-todo-input').focus();
    }

    __main();
})();
