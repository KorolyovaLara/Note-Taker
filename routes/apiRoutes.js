const db = require("../db/db.json");
module.exports = (app) => {
  app.get("/api/notes", (req, res) => res.json(notes));
  app.post("/api/notes", (req, res) => {
    // notes req.body
    // read the notes from your db.js using fs readfile
    //JSON.parse
    // create new unique id for the new note
    //fs writefile to write the new note into db.json JSON.strinfigy
    // return true or false, if its false you throw an error
  });
  app.delete("/api/clear-all", (req, res) => {
    //get id from request
    //get notes from jsonfile using fs readfile and put in an array
    // loop through the notes to mfind the correct id
    // matching id remove the note from the array
    //slice or splice to remove an element from array
    //write the array back to db.json
  });
};
