const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.status(200).send("Hello, this is Raid Tools"));
app.use("/raid", require("./routes/raid.js"));

const listener = app.listen(process.env.PORT, () => console.log(`Listening to ${listener.address().port}`));