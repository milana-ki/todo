import { createProject } from "./project.js";

const savedProjects = localStorage.getItem("todoProjects");

let projects;

if (savedProjects) {
    try {
        projects = JSON.parse(savedProjects);
    } catch {
        projects = [createProject("General")];
    }
} else {
    projects = [createProject("General")];
}

function saveProjects() {
    localStorage.setItem(
        "todoProjects",
        JSON.stringify(projects)
    );
}

export { projects, saveProjects };