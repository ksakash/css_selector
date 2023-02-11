const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

function readSelectorFile() {
    var filename = '/home/ksakash/Downloads/selectors.json';
    var dict = require(filename);
    return dict;
}

app.get("/selectors", function(req, res) {
    let selector_dict = readSelectorFile();
    res.json(selector_dict).end();
});


app.use("/public", express.static("./public"));

app.listen(3000);
console.log("listening on http://localhost:3000");
