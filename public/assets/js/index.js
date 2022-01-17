
var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
}

//activeNote is used to keep track of the note in the textarea input field
var activeNote = {};

//A function for getting all notes from the db file
var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

//A function for saving a note to the db file
var saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};
//If there is an activeNote- display the button, otherwise hide until input is received
var displayActiveNote = function() {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

//Gathers the note data from the inputs and saves it to the db to allow view to update
var handleNoteSave = function() {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  saveNote(newNote).then(function(data) {
    getAnddisplayNotes();
    displayActiveNote();
  });
};


//Sets the activeNote and displays it to the page
var handleNoteView = function() {
  activeNote = $(this).data();
  displayActiveNote();
};

//Sets the activeNote to a empty object and allows the user to enter a new note upon request
var handleNewNoteView = function() {
  activeNote = {};
  displayActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleDisplaySaveBtn = function() {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

var displayNoteList = function(notes) {
  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var $li = $("<li class='list-group-item'>").data(note);
    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

//fetchs notes from the db and displays them to the sidebar
var getAnddisplayNotes = function() {
  return getNotes().then(function(data) {
    displayNoteList(data);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleDisplaySaveBtn);
$noteText.on("keyup", handledDsplaySaveBtn);

// Gets and displays the initial list of notes
getAnddisplayNotes();

// Gets notes from the db and uses the event listeners to display on each event
var getAnddisplayNotes = () => getNotes().then(displayNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleDisplaySaveBtn);
  noteText.addEventListener('keyup', handleDisplaySaveBtn);
}

getAnddisplayNotes();
