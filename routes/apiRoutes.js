// Dependencies
const database = require("../db/db.json");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");

// Routing
module.exports = (app) => {
  // Should read the db.json file and return all saved notes as JSON
  app.get("/api/notes", (req, res) => {
    console.log("== Getting Notes ==");
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      let notes = JSON.parse(data);
      res.json(notes);
    });
  });
  //Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
  app.post("/api/notes", (req, res) => {
    // notes req.body
    let newNote = req.body;

    // read the notes from your db.js using fs readFile
    // JSON.parse
    let updateNoteArray = JSON.parse(fs.readFile("./db/db.json"));

    // validity check
    if (!newNote.title || !newNote.text) {
      return res.status(400).end();
    }

    // create new unique id for the new note
    newNote.id = uniqid();
    updateNoteArray.push(newNote);

    // fs writeFile to write the new note into db.json JSON.stringify
    fs.writeFileSync(
      "./db/db.json",
      JSON.stringify(updateNoteArray),
      "utf8",
      (err, data) => {
        // return true or false, if its false you throw an error
        if (err) throw err;
        console.log("New note successfully added!");
      }
    );

    // return new note
    res.json(newNote);
  });

  app.delete("/api/notes/:id", (req, res) => {
    // get notes from jsonfile using fs readFile and put in an array
    let updateNoteArray = JSON.parse(fs.readFile("./db/db.json"));

    // get ID from request
    let noteIndex = updateNoteArray.findIndex(
      // loop through the notes to find the correct ID
      (note) => note.id === req.params.id
    );

    // return error code if ID not found
    if (noteIndex < 0) {
      return res.status(404).end();
    }

    // matching ID remove the note from the array
    let deletedNote = updateNoteArray[noteIndex];

    // slice or splice to remove an element from array
    updateNoteArray.splice(noteIndex, 1);

    // write the array back to db.json
    fs.writeFileSync(
      "db/db.json",
      JSON.stringify(updateNoteArray),
      "utf8",
      (err, data) => {
        if (err) throw err;
        console.log("Success!");
      }
    );

    res.status(200).send(deletedNote);
  });
};
