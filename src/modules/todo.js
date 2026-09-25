function createTodo(title, description, dueDate, priority, notes) {
    return {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        notes: notes,
        completed: false
    };
}

export {createTodo}