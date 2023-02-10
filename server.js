const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

function readSelectorFile() {
    var filename = './data/selectors.json';
    var dict = require(filename);
    return dict;
}

app.get("/selectors", function(req, res) {
    // console.log("selector request");
    let selector_dict = readSelectorFile();
    // console.log(selector_dict);
    res.json(selector_dict).end();
});


app.use("/public", express.static("./public"));

app.listen(3000);
console.log("listening on http://localhost:3000");
