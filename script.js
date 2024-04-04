document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const tasksList = document.getElementById('tasksList');

    
    loadTasks();

    addTaskBtn.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            addTask(task, false);
            taskInput.value = ''; 
            saveTasks();
        }
    });

    tasksList.addEventListener('click', (e) => {
       
        if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove();
            saveTasks();
        }
    });

    
    function addTask(taskText, completed) {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (completed) {
            li.classList.add('completed');
        }

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        li.appendChild(taskSpan);

        
        taskSpan.contentEditable = false;

       
        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Update';
        updateBtn.className = 'update-btn';
        updateBtn.onclick = function() {
            if (updateBtn.textContent === 'Update') {
                taskSpan.contentEditable = true;
                taskSpan.focus();
                updateBtn.textContent = 'Save'; 
            } else {
                taskSpan.contentEditable = false;
                updateBtn.textContent = 'Update'; 
                saveTasks(); 
            }
        };
        li.appendChild(updateBtn);

        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        li.appendChild(deleteBtn);

        tasksList.appendChild(li);
    }

   
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            const text = taskItem.querySelector('span').textContent;
            const completed = taskItem.classList.contains('completed');
            tasks.push({ text, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

   
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.completed));
    }
});
