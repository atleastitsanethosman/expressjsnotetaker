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
    console.log(notesData)  //consider deleting in cleanup.
    res.send(notesData)
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
    res.send({sucess: true, msg: 'note saved'});
  });

  // Code for deleting note as selected.
  app.post('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);

  });
};

// functions to read and write db.json file to reuse.
const saveNote = (data) => {
  const stringifyData =  JSON.stringify(data)
  fs.writeFileSync('./db/db.json', stringifyData)
};

const getNote = () => {
  const notesString = fs.readFileSync('./db/db.json')
    return JSON.parse(notesString);
};


// app.get('/api/notes', (req, res) => {
//   fs.readFile('./db/db.json','utf-8',(err, data) => {
//     if (err) {
//       console.error(err)
//     };
//       res.send(data)
//     })
//   }
// );

// app.post('/api/notes', (req, res) => {
//   let notesDb = [];
//   console.log(typeof(notesDb));
//   fs.readFile('./db/db.json','utf-8',(err, data) => {
//     if (err) {
//       console.error(err);
//     };
//     notesDb = JSON.parse(data);
//     console.log(notesDb);
//     console.log(typeof(notesDb));
//     // adding unique id with nanoid packaga
//     req.body.id = nanoid();
//     console.log(req.body)
//     notesDb.push(req.body);
//     console.log(notesDb);
//     return;
//   });
//   fs.writeFileSync('./db/db.json', JSON.stringify(notesDb), (err) => {
//     if (err) {
//       console.error(err)
//       return
//     };
//     console.log('note saved')
//   });
//   res.send({success: true, msg: 'Note Saved'})
// });