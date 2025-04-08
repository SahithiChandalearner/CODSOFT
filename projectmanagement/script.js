const projectList = document.getElementById('projects');
const taskList = document.getElementById('tasks');
const currentProjectNameDisplay = document.getElementById('current-project-name');

const createProjectModal = document.getElementById('create-project-modal');
const createTaskModal = document.getElementById('create-task-modal');
const createProjectForm = document.getElementById('create-project-form');
const createTaskForm = document.getElementById('create-task-form');

let projects = [];
let currentProjectId = null;
let tasks = [];

function renderProjects() {
    projectList.innerHTML = '';
    projects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project.name;
        li.addEventListener('click', () => selectProject(project.id, project.name));
        projectList.appendChild(li);
    });
}

function renderTasks() {
    taskList.innerHTML = '';
    if (currentProjectId) {
        const projectTasks = tasks.filter(task => task.projectId === currentProjectId);
        projectTasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="task-info">
                    <h3>${task.name}</h3>
                    <p>Deadline: ${task.deadline || 'Not set'}</p>
                    <p>Assignee: ${task.assignee || 'Unassigned'}</p>
                    <p>Progress: <span id="progress-${task.id}">0%</span></p>
                </div>
                <div class="task-actions">
                    <button onclick="incrementProgress('${task.id}')">Increment Progress</button>
                    <button onclick="deleteTask('${task.id}')">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
        const currentProject = projects.find(p => p.id === currentProjectId);
        currentProjectNameDisplay.textContent = currentProject ? currentProject.name : '';
    } else {
        currentProjectNameDisplay.textContent = '';
    }
}

function openCreateProjectModal() {
    createProjectModal.style.display = 'block';
}

function closeCreateProjectModal() {
    createProjectModal.style.display = 'none';
}

function openCreateTaskModal() {
    if (currentProjectId) {
        createTaskModal.style.display = 'block';
    } else {
        alert('Please select a project first.');
    }
}

function closeCreateTaskModal() {
    createTaskModal.style.display = 'none';
}

createProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const projectName = document.getElementById('project-name').value;
    if (projectName) {
        const newProject = { id: Date.now(), name: projectName };
        projects.push(newProject);
        renderProjects();
        closeCreateProjectModal();
        document.getElementById('project-name').value = '';
    }
});

createTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-name').value;
    const deadline = document.getElementById('deadline').value;
    const assignee = document.getElementById('assignee').value;
    if (taskName && currentProjectId) {
        const newTask = { id: Date.now(), projectId: currentProjectId, name: taskName, deadline, assignee, progress: 0 };
        tasks.push(newTask);
        renderTasks();
        closeCreateTaskModal();
        document.getElementById('task-name').value = '';
        document.getElementById('deadline').value = '';
        document.getElementById('assignee').value = '';
    } else if (!currentProjectId) {
        alert('Please select a project first.');
    }
});

function selectProject(projectId, projectName) {
    currentProjectId = projectId;
    renderTasks();
}

function incrementProgress(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1 && tasks[taskIndex].progress < 100) {
        tasks[taskIndex].progress += 10;
        document.getElementById(`progress-${taskId}`).textContent = `${tasks[taskIndex].progress}%`;
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target === createProjectModal) {
        closeCreateProjectModal();
    }
    if (event.target === createTaskModal) {
        closeCreateTaskModal();
    }
};

// Initial rendering
renderProjects();