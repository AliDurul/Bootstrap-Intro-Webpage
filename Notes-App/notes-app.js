'use strict';


let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy:'byEdited'
}

renderNotes(notes, filters)
//Creates a note
document.querySelector('#create-note').addEventListener('click', function (e) {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt:timestamp ,
        updatedAt:timestamp
    })
    saveNotes(notes)
    location.assign(`./edit.html#${id}`)
})
//Search the certain note
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})
//Filter the notes 
document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)

})
//Upduate the page at same time with clone
window.addEventListener('storage', (e) => {
    if(e.key=== 'notes'){
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters)
    }
})

