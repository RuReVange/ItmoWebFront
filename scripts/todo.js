document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('task');
    const todoList = document.getElementById('todo-list');
    const saveButton = document.getElementById('save-tasks');
    const loadButton = document.getElementById('load-tasks');

    function addTask(taskText) {
        const listItem = document.createElement('li');
        listItem.classList.add('todo__item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('todo__checkbox');

        const taskLabel = document.createElement('span');
        taskLabel.textContent = taskText;
        taskLabel.classList.add('todo__text');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('todo__delete');
        deleteButton.addEventListener('click', () => listItem.remove());

        listItem.appendChild(checkbox);
        listItem.appendChild(taskLabel);
        listItem.appendChild(deleteButton);

        todoList.appendChild(listItem);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    saveButton.addEventListener('click', () => {
        const tasks = [];
        document.querySelectorAll('.todo__item').forEach((item) => {
            const taskText = item.querySelector('.todo__text').textContent;
            const isCompleted = item.querySelector('.todo__checkbox').checked;
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
        alert('Tasks saved!');
    });

    loadButton.addEventListener('click', () => {
        const tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
        todoList.innerHTML = '';
        tasks.forEach((task) => {
            addTask(task.text);
            const lastItem = todoList.lastChild;
            lastItem.querySelector('.todo__checkbox').checked = task.completed;
        });
        alert('Tasks loaded!');
    });
});
