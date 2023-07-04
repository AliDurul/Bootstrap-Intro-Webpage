let todos = geteDataTodos()

const filters = {
    searchText: '' ,
    hideCompleted:false
}

renderTodos(todos, filters)

// search text
document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})


// add new object in to todo array
document.querySelector('#todo-form').addEventListener('submit', function(e){
    e.preventDefault()
    todos.push({
        id:uuidv4(),
        text: e.target.elements.addTodo.value,
        completed:false
    })
    saveTodos(todos) //add items to local storage
    renderTodos(todos, filters)
    e.target.elements.addTodo.value = ''
})

//checkbox 
document.querySelector('#hideCompleted').addEventListener('change',function(e){
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})

