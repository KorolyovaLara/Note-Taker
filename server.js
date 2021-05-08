const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//require("./routes/apiRoutes")(router);
require("./routes/htmlRoutes")(app);

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
