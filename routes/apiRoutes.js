// using fs package to read and write to the .JSON file.
// nanoid package generates unique ids.

const fs = require('fs');
const { nanoid } = require('nanoid');

// ROUTING

module.exports = (app) => {
  // functions for read and write at bottom of page.
  // API GET Request
  // route to get notes by reading the file and send to webpage.
  app.get('/api/notes', (req, res) => {
    const notesData = getNote()
    res.json(notesData)
    });

  // API POST Requests
  // handles saving the notes when the user gives feedback from webpage.

  app.post('/api/notes', (req, res) => {
    //getting existing notes.
    const notesData = getNote();
    //get new note data from request.
    const newNote = req.body;
    //add id with nanoid package.
    newNote.id = nanoid();
    //append new note to existing.
    notesData.push(newNote);
    //save to db.json file.
    saveNote(notesData);
    res.json({sucess: true, msg: 'note saved'});
  });

  // Code for deleting note as selected.
  app.delete('/api/notes/:id', (req, res) => {
    //pull note ID from URL request
    let deleteId = req.params.id;
    //pull notes from file.
    const notesData = getNote();
    //review each note to see if it matches note ID from delete request, if not moves to new array newNotes and rewrites db.json.
    let newNotes = []
    notesData.forEach(element => {
      if (element.id !== deleteId) {
        newNotes.push(element);
      }
    });
    saveNote(newNotes);
    res.json('note deleted');
  });
};

// functions to read and write db.json file to reuse.
const saveNote = (data) => {
  const notesData =  JSON.stringify(data)
  fs.writeFileSync('./db/db.json', notesData)
};

const getNote = () => {
  const notesString = fs.readFileSync('./db/db.json')
    return JSON.parse(notesString);
};