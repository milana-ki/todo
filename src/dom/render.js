function renderTodo(todo, onDelete, onChange) {
    const todoElement = document.createElement('div');
    todoElement.classList.add('todo');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    const todoTitle = document.createElement('h4');
    todoTitle.textContent = todo.title;

    const description = document.createElement('p');
    description.textContent = todo.description;

    const dueDate = document.createElement('p');
    dueDate.textContent = `Due: ${todo.dueDate}`;

    const priority = document.createElement('p');
    priority.textContent = `Priority: ${todo.priority}`;

    const notes = document.createElement('p');
    notes.textContent = `Notes: ${todo.notes}`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        onChange();
    });

    deleteButton.addEventListener('click', () => {
        onDelete(todo);
        todoElement.remove();
    });

    editButton.addEventListener('click', () => {
        const editForm = renderTodoForm(
            (title, description, dueDate, priority, notes) => {
                todo.title = title;
                todo.description = description;
                todo.dueDate = dueDate;
                todo.priority = priority;
                todo.notes = notes;

                onChange();

                editForm.replaceWith(
                    renderTodo(todo, onDelete, onChange)
                );
            }
        );

        editForm.querySelector('input').value = todo.title;

        editForm.querySelector('textarea').value =
            todo.description;

        editForm.querySelector('input[type="date"]').value =
            todo.dueDate;

        editForm.querySelector('select').value =
            todo.priority;

        editForm.querySelectorAll('textarea')[1].value =
            todo.notes;

        todoElement.replaceWith(editForm);
    });

    todoElement.append(
        checkbox,
        todoTitle,
        description,
        dueDate,
        priority,
        notes,
        editButton,
        deleteButton
    );

    return todoElement;
}


function renderProject(
    project,
    onTodoCreate,
    onTodoDelete,
    onTodoChange
) {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project');

    const projectName = document.createElement('h2');
    projectName.textContent = project.name;

    const addTodoButton = document.createElement('button');
    addTodoButton.textContent = 'Add Todo';

    projectElement.append(
        projectName,
        addTodoButton
    );

    addTodoButton.addEventListener('click', () => {

        if (projectElement.querySelector('.todo-form')) {
            return;
        }

        const todoForm = renderTodoForm(
            (
                title,
                description,
                dueDate,
                priority,
                notes
            ) => {
                const todo = onTodoCreate(
                    title,
                    description,
                    dueDate,
                    priority,
                    notes
                );

                projectElement.append(
                    renderTodo(
                        todo,
                        onTodoDelete,
                        onTodoChange
                    )
                );

                todoForm.remove();
            }
        );

        todoForm.classList.add('todo-form');

        projectElement.append(todoForm);
    });

    project.todos.forEach((todo) => {
        projectElement.append(
            renderTodo(
                todo,
                onTodoDelete,
                onTodoChange
            )
        );
    });

    return projectElement;
}
function renderTodoForm(onSubmit) {
    const todoForm = document.createElement('form');

    const title = document.createElement('input');
    title.type = 'text';
    title.placeholder = 'Title';
    title.required = true;

    const description = document.createElement('textarea');
    description.placeholder = 'Description';

    const date = document.createElement('input');
    date.type = 'date';
    date.required = true;

    const priority = document.createElement('select');

    const lowPriority = document.createElement('option');
    lowPriority.value = 'low';
    lowPriority.textContent = 'Low';

    const mediumPriority = document.createElement('option');
    mediumPriority.value = 'medium';
    mediumPriority.textContent = 'Medium';

    const highPriority = document.createElement('option');
    highPriority.value = 'high';
    highPriority.textContent = 'High';

    priority.append(
        lowPriority,
        mediumPriority,
        highPriority
    );

    const notes = document.createElement('textarea');
    notes.placeholder = 'Notes';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Save';

    todoForm.append(
        title,
        description,
        date,
        priority,
        notes,
        submitButton
    );

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        onSubmit(
            title.value,
            description.value,
            date.value,
            priority.value,
            notes.value
        );
    });

    return todoForm;
}


export {
    renderTodo,
    renderProject,
    renderTodoForm
};