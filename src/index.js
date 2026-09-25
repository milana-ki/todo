import './style.css';

import { createTodo } from './modules/todo';
import { addTodoToProject, createProject } from './modules/project';
import { renderProject } from './dom/render';
import { projects, saveProjects } from './modules/storage';


const content = document.querySelector('#content');

const sidebar = document.createElement('aside');
sidebar.classList.add('sidebar');

const main = document.createElement('main');
main.classList.add('main');

content.append(sidebar, main);


const title = document.createElement('h1');
title.textContent = 'Todo';

const projectsTitle = document.createElement('h2');
projectsTitle.textContent = 'Projects';

const newProjectButton = document.createElement('button');
newProjectButton.textContent = '+ New project';

newProjectButton.addEventListener('click', () => {
    const projectName = prompt('Project name');

    if (!projectName) {
        return;
    }

    if (projectName.length > 30) {
        alert('Project name must be 30 characters or less.');
        return;
    }

    const newProject = createProject(projectName);

    projects.push(newProject);

    saveProjects();

    renderProjectList();

    showProject(newProject);
});

const projectsList = document.createElement('div');
projectsList.classList.add('projects-list');

sidebar.append(
    title,
    newProjectButton,
    projectsTitle,
    projectsList
);


const mainTitle = document.createElement('h2');
mainTitle.textContent = 'Projects';

main.append(mainTitle);

function showProject(project) {
    main.innerHTML = '';
    
    const mainTitle = document.createElement('h2');
    mainTitle.textContent = project.name;

    main.append(mainTitle);

    const projectElement = renderProject(
        project,
        (
            title,
            description,
            dueDate,
            priority,
            notes
        ) => {
            const todo = createTodo(
                title,
                description,
                dueDate,
                priority,
                notes
            );

            addTodoToProject(project, todo);

            saveProjects();

            return todo;
        },
        (todo) => {
            const index = project.todos.indexOf(todo);

            if (index !== -1) {
                project.todos.splice(index, 1);
                saveProjects();
            }
        },
        ()=>{
            saveProjects();
        }
    );

    projectElement.classList.add('project');

    main.append(projectElement);
}

showProject(projects[0]);

function showAllProjects() {
    main.innerHTML = '';

    const mainTitle = document.createElement('h2');
    mainTitle.textContent = 'All Projects';

    main.append(mainTitle);

    projects.forEach((project) => {
        const projectElement = renderProject(
            project,
            (
                title,
                description,
                dueDate,
                priority,
                notes
            ) => {
                const todo = createTodo(
                    title,
                    description,
                    dueDate,
                    priority,
                    notes
                );

                addTodoToProject(project, todo);
                saveProjects();

                return todo;
            },
            (todo) => {
                const index = project.todos.indexOf(todo);

                if (index !== -1) {
                    project.todos.splice(index, 1);
                    saveProjects();
                }
            },
            () => {
                saveProjects();
            }
        );

        main.append(projectElement);
    });
}

function renderProjectList() {
    projectsList.innerHTML = '';

    const allProjectsButton = document.createElement('button');

    allProjectsButton.classList.add('project-link');
    allProjectsButton.textContent = 'All projects';

    allProjectsButton.addEventListener('click', () => {
        showAllProjects();
    });

    projectsList.append(allProjectsButton);

    projects.forEach((project) => {
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-link');

        const projectButton = document.createElement('button');
        projectButton.textContent = project.name;
        projectButton.title = project.name;

        projectButton.addEventListener('click', () => {
            showProject(project);
        });

        projectContainer.append(projectButton);

        if (project.name !== 'General') {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';

            deleteButton.addEventListener('click', () => {
                const index = projects.indexOf(project);

                if (index !== -1) {
                    projects.splice(index, 1);

                    saveProjects();
                    renderProjectList();

                    showProject(projects[0]);
                }
            });

            projectContainer.append(deleteButton);
        }

        projectsList.append(projectContainer);
    });
}

renderProjectList();

console.log(project);