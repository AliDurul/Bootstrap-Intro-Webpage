'use strict';


const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const dateElement = document.querySelector("#last-edited");
const removeElement = document.querySelector("#remove-note");

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(function (note) {
  return note.id === noteId;
});

if (note == undefined) {
  location.assign("./index.html");
}

// Setting up the elements
titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = generateLasEdited(note.updatedAt)

titleElement.addEventListener("input", function (e) {
  note.title = e.target.value;
  note.updatedAt =  moment().valueOf();
dateElement.textContent = generateLasEdited(note.updatedAt)

  saveNotes(notes);
});

bodyElement.addEventListener("input", function (e) {
  note.body = e.target.value;
  note.updatedAt =  moment().valueOf();
dateElement.textContent = generateLasEdited(note.updatedAt)

  saveNotes(notes);
});

removeElement.addEventListener("click", function () {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("./index.html");
});

window.addEventListener("storage", function (e) {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    note = notes.find(function (note) {
      return note.id === noteId;
    });

    if (note === undefined) {
      location.assign("./index.html"); 
    }

    titleElement.value = note.title;
    bodyElement.value = note.body;
dateElement.textContent = generateLasEdited(note.updatedAt)

  }
});
