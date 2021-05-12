// Dependencies
const path = require("path");

// Routing
module.exports = (app) => {
  // Should return the index.html file
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  // Should return the notes.html file.
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
};
