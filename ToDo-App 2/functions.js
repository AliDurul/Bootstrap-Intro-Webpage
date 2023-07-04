//Read existing data from localStorage
const geteDataTodos = function(){
    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON !== null ?  JSON.parse(todosJSON) :  []
    } catch (error) {
        return []
    }

}

//Save todos to localStorage
const saveTodos = function(todos){
    localStorage.setItem('todos',JSON.stringify(todos))
}

// Render app;ication based on filters
const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) 
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })
    // return how many uncompleted todos
    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed 
    })
    // clear the screen
    document.querySelector('#todos').innerHTML = ''
    // the message shows how many todo uncompleted
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))
    //FOREACH
    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

//Remove todo from the localStorage
const removeTodos = function(id){
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === id
    })
    if (todoIndex > -1){
        todos.splice(todoIndex,1)
    }
}

//Toggle the completed value for a given todo
const toggleTodo = function(id){
    const todo = todos.find(function(todo){
        return todo.id === id
    })
    if(todo!==undefined){
        todo.completed = !todo.completed
    }
}

//Get the DOM elements for an individual note
const generateTodoDOM = function(todo){
    const todoel = document.createElement('div')
    const checkbox = document.createElement('input')
    const p = document.createElement('span')
    const removeButton = document.createElement('button')

    //setup the checkbox button 
    checkbox.setAttribute('type','checkbox')
    checkbox.checked = todo.completed
    todoel.appendChild(checkbox) 
    checkbox.addEventListener('change',function(){
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
        
    })

    
    //setup the todo text
    p.textContent = todo.text
    todoel.appendChild(p)
    
    //setup the remove button 
    removeButton.textContent = 'x'
    todoel.appendChild(removeButton)
    removeButton.addEventListener('click', function(){
        removeTodos(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })

    return todoel
}

//Get the DOM elements for list summary
const generateSummaryDOM = function(incompleteTodos){
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}  



//Generate the DOM structure for a note
